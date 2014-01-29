function postForm(skuId, name, email) {
  $.post('/catalog/productservice',
  {
    skuId : skuId,
    name  : name,
    email : email
  });
}

function clearFields() {
  $("#avise #name").val("");
  $("#avise #email").val("");
}

function showProductDescription() {
  hideNotifyForm();
}

function showSentEmailMessage() {
  if (isSaleAvailable()) {
    showProductDescription();
  } else {
    showNotifyForm();
  }
  
  $("#listaErrosLightBox").append("<li> Recebemos o seu e-mail.</li>");
  $("#listaErrosLightBox").append("<li> Voc&#234; ser&#225; avisado, por e-mail, sobre a disponibilidade do produto.</li>");
  
  // chama a funcao que mostrar no lightbox
  showErrorColorBox();
  return;
}

function isSaleAvailable() {
  return $("#isSaleAvailable").val() == "true";
}

function clearMessage() {
  $("#aviseme ul #message").text("");
}

$(document).ready(function() {
  var skuId = null;
  
  $(".jQueryAviseMe").bind("click", function(event) {
    var $target = $(event.target);
  });
  
  $("#aviseme").validate({
    onfocusout: false,
    onkeyup: false,
    onsubmit: false,
    onclick: false,
    rules : {
      name: "required",
      email: {
        required: true,
        email: true
      }
    },
    showErrors: function(errorMap, errorList) {
      if ($("#name").val() == "") {
        // adicionas os li a lista de erros
        $("#listaErrosLightBox").append("<li> Erro de Preenchimento </li>");  
        $("#listaErrosLightBox").append("<li> Por favor, informe seu nome</li>");
        
        if($("#email").val() == ""){
          $("#listaErrosLightBox").append("<li> Por favor, informe seu Email</li>");
        }
        
        // chama a funcao que mostrar os erro no lightbox
        showErrorColorBox();    
        
        return;  
      }
      
      if ($("#email").val() == "") {
        // adicionas os li a lista de erros
        $("#listaErrosLightBox").append("<li> Erro de Preenchimento </li>");
        if($("#name").val() == ""){
          $("#listaErrosLightBox").append("<li> Por favor, informe seu nome</li>");
        }
        $("#listaErrosLightBox").append("<li> Por favor, informe seu Email</li>");
        
        // chama a funcao que mostrar os erro no lightbox
        showErrorColorBox();    
        
        return;  
      }

      if(errorList.length > 0){
        // adicionas os li a lista de erros
        $("#listaErrosLightBox").append("<li> Erro de Preenchimento </li>");
        $("#listaErrosLightBox").append("<li> O email deve ter o formato nome@dominio.com </li>");
        
        // chama a funcao que mostrar os erro no lightbox
        showErrorColorBox();
        
        return;
      }
    }
  });
  
  $("#avisado").click(function() {
    clearMessage();
    if( $("#aviseme").valid() ) {
      skuId =  $("#avisemeSkuId").val();
      var name  = $("#name").val();
      var email = $("#email").val();
      
      postForm(skuId, name, email);
      clearFields();
      showSentEmailMessage();
    } else {
      showNotifyForm();
    }
  });
});
