$(document).ready(function(){
  limitCharsStart();
  ratingStart();
  likeDislikeStart();
  setProductFromUrl();
  setLearningFromUrl();
});

function limitChars(textarea, number){
  var restantes = number-(textarea.value.length);
  var restam = (restantes > 1 ? "Restam " : "Resta ");
  var caracteres = (restantes > 1 ? " caracteres" : " caracter");
  if (restantes > 0){
    $("#charlimitinfo").html(restam + restantes + caracteres);
  } else {
    textarea.value = textarea.value.substr(0,number);
    $("#charlimitinfo").html("Nenhum caracter restante");
  }
}

function limitCharsStart(){
  
  $("textarea#comment").keydown(function(){
    limitChars(this, 300);
  });
  $("textarea#comment").keyup(function(){
    limitChars(this, 300);
  });
  $("textarea#comment").focus(function(){
    limitChars(this, 300);
  });
  $("textarea#comment").blur(function(){
    limitChars(this, 300);
  });
  if ($("textarea#comment").size() > 0) {
    limitChars($("textarea#comment")[0], 300);
  }
  
}

function ratingStart(){
  $('.star-rating-final li a').click(function(ev){
    var currentRating = $(this).parents(".star-rating-final").children(".current-rating");
    var size = $(this).css("width");
    size = parseInt(size.substr(0,size.indexOf("px")));
    currentRating.css("width", size + "px");  
    setRating($(this).parents(".star-rating-final").attr("rating"),$(this).text());
  });
}

var RECALCULATE_LIKES = true;
function likeDislikeStart(){
  // if dont have cookieToObject function, this page dont have like/dislike buttons
  if (typeof(cookieToObject) == "undefined") return;
  // bind event
  $("#likeDislikeWrapper").find("[data-like-value]").live("click", function(){
    var id = $(this).attr("data-rating-id");
    var value = $(this).attr("data-like-value");
    var clicked = $(this);
    var notClicked;
    if (value == "L") {
      notClicked = $(this).parent().find("[data-like-value=D]"); 
    } else {
      notClicked = $(this).parent().find("[data-like-value=L]");
    }
    sendAjaxLikeDislike(id, value, clicked, notClicked);
  });
  
  // apply layout on already voted elements
  var ratingHistory = cookieToObject('_ldr');
  if (ratingHistory != null) {
    var allVoteButtons = $("#likeDislikeWrapper").find("[data-like-value]");
    var id, value, quantL, quantD, html;
    $(allVoteButtons).each(function(i, item){
      id = $(item).attr("data-rating-id");
      value = $(item).attr("data-like-value");
      // if is in cookie, apply style
      if(ratingHistory[0][id] == value){
        $(item).addClass("voted");
        if (RECALCULATE_LIKES) recalculateLikeDislike(item, 1);
      }
    }); 
  }
}

/**
 * envia like/dislike e atribui classe no botao clicado 
 */
function sendAjaxLikeDislike(id, value, clicked, notClicked){
  var ratingHistory = cookieToObject('_ldr');
  if (ratingHistory == null){
    ratingHistory = [{}]; // generates a list of a single element which is a map
  }
  var oldValue = ratingHistory[0][id];
  if (oldValue == value){
    return; // user already send like/dislike to this
  } else{
    ratingHistory[0][id] = value;
  }
  
  var url = '/api/svc/rating/update'
  var L = (value == "L") ? 1 : 0;
  var D = (value == "D") ? 1 : 0;
  
  // if user is using "undo", decrease old value
  if (value == "L" && oldValue == "D") D = -1;
  if (value == "D" && oldValue == "L") L = -1;
  
  // if no change will be done to the server, dont even send ajax
  if(L == 0 && D == 0) {
    return;
  } 
  
  // send ajax
  var data = {"id": id, "l":L, "d":D}
  $.ajax({
       type: 'POST',
       contentType: 'application/json',
       async: true,
       url: url,
       data: JSON.stringify(data),
       cache: false,
       success: function(msg) {
      var response = JSON.parse(msg);
        if (response.status == "OK") {
          objectToCookie("_ldr", ratingHistory, acecIndexInformation);
          clicked.addClass("voted");
          notClicked.removeClass("voted");
          if (RECALCULATE_LIKES) {
            recalculateLikeDislike(clicked, 1);
            recalculateLikeDislike(notClicked, 0);
          }
        } else {
          alert('Nao foi possivel registrar sua opiniao.');
        }
       },
       error: function(xhr) {
         alert('Nao foi possivel registrar sua opiniao.');
       }      
  });
}

/*
 * atualiza quantidade nos botoes de like/dislike
 */
function recalculateLikeDislike(item, toAdd) {
  var quant = $(item).attr("data-like-quant");
  var html = $(item).html();
  quant = parseInt(quant) + toAdd; 
  html = html.replace(/^(.+)\(.*/, "$1 (" + quant + ")");   // regex: mantem o texto original e altera a quantidade
  $(item).html(html);  
}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }

function validate(){
  var hasError = false; 
  
  $('.alertMsg').css('display','none');

  if($('#rating1').val() == ""){
    $('#erroRating1').css('display','block');
    hasError = true;
  }
  if(!hasError && $('#rating2').val() == ""){
    $('#erroRating2').css('display','block');
    hasError = true;
  }
  if(!hasError && $('#rating3').val() == ""){
    $('#erroRating3').css('display','block');
    hasError = true;
  }
  if(!hasError && $('#rating4').val() == ""){
    $('#erroRating4').css('display','block');
    hasError = true;
  }
  if (!hasError && $('#nome').attr('value').trim().length <= 0){
    $('#erroNome').css('display','block');
    hasError = true;
  }
  if (!hasError && $('#email').attr('value').trim().length <= 0){
    $('#erroEmail').css('display','block');
    hasError = true;
  }
  if (!hasError && !isValidEmail($('#email').attr('value'))){
    $('#erroEmailInvalido').css('display','block');
    hasError = true;
  }
  if (!hasError && $('#comment').attr('value').trim().length <= 0){
    $('#erroComment').css('display','block');
    hasError = true;
  }
  
  // if no error, send ajax with form values
  if (!hasError) {
    var data = {
        "type":       "1",
        "id":         $('#product').val(),
        "customer":   {
          "name":   $('#nome').val(),
          "email":  $('#email').val()
        },
        "rating":     [
           $('#rating1').val(),
           $('#rating2').val(),
           $('#rating3').val(),
           $('#rating4').val()
         ],
        "commentary": {
          "body":     $('#comment').val()
        },
        "optIn": $("#personalForm\\:optIn:checked").size() == 0 ? 'N' : 'Y'
    };    
    
    // send a syncronous ajax....if return true, got some problem
    if (sendAjaxRating(data)) {
      $("body").html("<div class='container-pop'>Houve algum erro ao enviar sua avaliação.</div>");
    } else {
      window.location.href  = "/loadHome?homeId=31&artid=22";
    }
    
  }
  
  // always return false....this form will never submit.....this was replaced by an ajax call
  return false;
}

//return if has error
function sendAjaxRating(data){
  // send ajax
  var hasError = false;
  $.ajax({
    type: 'POST',
    async: false,
    contentType: 'application/json',
    url: '/api/svc/rating/insert', // apache redirects (WARNING: remove sb=acme in other stores!!!)
    data: JSON.stringify(data),
    cache: true,
    success: function(msg) {
      if (msg == null || msg == "") {
        hasError = true; // works only with async=false
      } else {
        var response = JSON.parse(msg);
        if (response.status != "OK") {
          hasError = true; // works only with async=false
        }
      }
    },
    error: function() {
      hasError = true; // works only with async=false
    }      
  }); 
  return hasError; 
}

function validateLearning(){
  String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }

  $('.msgErro').css('display','none');

  if ($('#nome').attr('value').trim().length <= 0){
    $('#erroNome').css('display','inline');
    return false;
  }
  if ($('#email').attr('value').trim().length <= 0){
    $('#erroEmail').css('display','inline');
    return false;
  }
  if (!isValidEmail($('#email').attr('value'))){
    $('#erroEmailInvalido').css('display','inline');
    return false;
  }
  if ($('#comment').attr('value').trim().length <= 0){
    $('#erroComment').css('display','inline');
    return false;
  }
  return true;
}

function validateForm(){
  String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }
  flag = 0;
  $('.bottomCornerCamposModalPop').css('height','18px');
  if ($('#nome').val().trim().length <= 0){
    $('#erro').css('display','none');
    $('#geral').css('display','inline');
    $('#erroGeral').css('display','inline');
    $('#nome').css('background','#FFDAC0');
    $('#nome').css('border','1px solid #F8BC98');
    
  }else{
    $('#nome').css('background','');
    $('#nome').css('border','1px solid #D3D3D3');
    flag++;
  }
  if ($('#email').val().trim().length <= 0){
    $('#erro').css('display','none');
    $('#geral').css('display','inline');
    $('#erroGeral').css('display','inline');
    $('#email').css('background','#FFDAC0');
    $('#email').css('border','1px solid #F8BC98');
  }else{
    $('#email').css('background','');
    $('#email').css('border','1px solid #D3D3D3');
    flag++;
  }
  
  if ($('#assunto').val() === ""){
    $('#erro').css('display','none');
    $('#geral').css('display','inline');
    $('#erroGeral').css('display','inline');
    $('#assunto').css('background','#FFDAC0');
    $('#assunto').css('border','1px solid #F8BC98');
  }else{
    $('#assunto').css('background','');
    $('#assunto').css('border','1px solid #D3D3D3');
    flag++;
  }
  if ($('#comment').val().trim().length <= 0){
    $('#erro').css('display','none');
    $('#geral').css('display','inline');
    $('#erroGeral').css('display','inline');
    $('#comment').css('background','#FFDAC0');
    $('#comment').css('border','1px solid #F8BC98');
  }else{
    $('#comment').css('background','');
    $('#comment').css('border','1px solid #D3D3D3');
    flag++;
  }  
  
  if (!isValidEmail($('#email').val()) && flag == 4){
    $('#erro').css('display','inline');
    $('#erroEmailInvalido').css('display','inline');
    $('#email').css('background','#FFDAC0');
    $('#email').css('border','1px solid #F8BC98');
  }else if(flag == 4){
    $('#email').css('background','');
    $('#email').css('border','1px solid #D3D3D3');
    flag++;
  }
  if(flag==5){
    $('#geral').css('display','none');
    return true;
  }else{
    return false;  
  }
  
}

function setLearningFromUrl(){
  var regex = new RegExp("[\\?&]learning=([^&#]*)");
       var results = regex.exec( document.URL );
  var id = "";
    if( results != null ){
         id = results[1];
  }
  $("#learning").attr("value",id);
}


function setProductFromUrl(){
  var regex = new RegExp("[\\?&]product=([^&#]*)");
       var results = regex.exec( document.URL );
  var id = "";
    if( results != null ){
         id = results[1];
  }
  $("#product").attr("value",id);
}


function setRating(type,ratingScore){
  var uiComp = "rating" + type;
  $("#" + uiComp).attr("value",ratingScore);
}

function isValidEmail(email){
  // RFC 2822 simplified - without brackets and double quotes
  var regexRFC2822 = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  return email.match(regexRFC2822);
}