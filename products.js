var jqZoomOptions = {
    zoomType: 'reverse',
    lens:true,
    preloadImages: false,
    alwaysOn:false,
    zoomWidth: 470,
    zoomHeight:408,
    xOffset: 0,
    title:false
};

$(document).ready(function() {
  events_productStart();
  tabStart(); // abas conteudo especial
  bindMoreComments(); // mostra mais avaliacoes/comentarios
  customListCatalog.init(); // listas
  notifyMeSwitch(); // avise-me
  readMore(); // Expandir - reduzir descricao
});

$(window).load(function(){
    zoomInit(jqZoomOptions);
    $(".zoomPad img").before("<span class='product-mask'></span>");
});

function readMore(){
	var limitHeight = 47;
	var recoilBtnName = "recolher descrição";

	var descriptionText = $('.product-description').height();
	
	if(descriptionText > limitHeight){
		$('.read-more').show();
  } else{
        $('.read-more').hide();
  }
  $(".product-description").css('height', '44' + 'px');

	$('.read-more a').click(function(){
		if($(this).hasClass('active')){
			$(this).html("Leia +").removeClass('active');
			$('.product-description').animate({height: '44' + "px"}, 500);	
		} else {
			$(this).html(recoilBtnName).addClass('active');	
			$('.product-description').animate({height: (descriptionText) + "px"}, 500);
		}
	});
}

function events_productStart() {

  //tabs
  $(".viewBoxMedia").load($(".boxPhoto .viewBoxHeader ul li.active a").attr("href"));
  $(".boxPhoto .viewBoxHeader ul li").bind("click", function(ev){
    $(".boxPhoto .viewBoxHeader ul li").removeClass("active");
    $(this).addClass("active");
    var a = $(this).find("a");
    $(".viewBoxMedia").load(a.attr("href"));
  });
  $(".boxPhoto .viewBoxHeader ul li.video").bind("click", function(ev){
    $(".boxPhoto .viewBoxThumbs").hide();
    $('#boxFoto').hide(); // esconde secao de fotos
    $('#boxVideo').show(); // mostra secao do video
  });
  $(".boxPhoto .viewBoxHeader ul li.foto").bind("click", function(ev){
    $(".boxPhoto .viewBoxThumbs").show();
    $('#boxFoto').show(); // mostra secao de fotos
    $('#boxVideo').hide(); // esconde secao do video
  });
  
  //thumbs
  $(".boxPhoto .viewBoxThumbs ul li a").bind("click", function(ev){
    $(".viewBoxMedia img").attr("src", $(this).attr("href"));
    
    // get number of current li clicked and update photopopup url
    var position = -1;
    var clicked = $(this);
    $(this).closest("ul").find("a").each(function(i, item){
      if ($(item).attr("href") === clicked.attr("href")) {
        position = i + 1;
        return; // break just inner function
      }
    });
    if (position > -1) {
      var parentLink = $(".viewBoxMedia img").closest("a.iframePop");
      if (parentLink.size() > 0) parentLink.attr("href", parentLink.attr("href").replace(/id=\d+/, "id=" + position)); // update photopopup url
    }
    
  });
  
  //ParcelBtn padding (alinha a ancora de parcela de acordo com a quantidade dos caracteres do preco, somando a largura do preco + padding do preco + padding do parcelamento + borda)
	var parcelPadding = $('.infoOne .value-box').width();
	//$('.product .boxInfo .box-opcoes-parcelamento').css('padding-left',(parcelPadding+12+12+1)+'px');
}

function setWhobought(selectedSku) {
  //home 19 passa array de skus, as demais (16,25) apenas um id
  if( typeof(selectedSku) == "string"){
    selectedSku = [selectedSku];
  }
  var hasValue = false;
  var skus= "";
  for(j=0;j<selectedSku.length;j++){
    for(i=whobought.skuWhoBought.length-1;i>=0;i--){
      var sku = whobought.skuWhoBought[i];
      if (sku.id == selectedSku[j]){
        if (sku.skuwhobought != '' ) {
          hasValue = true;
          skus += sku.skuwhobought;
        }
      }
    }
  }
  if (hasValue){
    openPage('/home/whobought/21?skus='+ skus, 'productPurchased');
    return;
  }
  $("#productPurchased").html('');
}

function setSkuCrosselling(selectedSku, itemId) {
  //home 19 passa array de skus, as demais (16,25) apenas um id
  if( typeof(selectedSku) == "string"){
    selectedSku = [selectedSku];
  }
  var cross = "";
  var acess = "";
  var hasValue = false;
  
  for(j=0;j<selectedSku.length;j++){
    for (i = crosselling.skuCrosselling.length-1; i >= 0; i--) {
      var sku = crosselling.skuCrosselling[i];
      if (sku.id == selectedSku[j]){
        if (sku.skucrosselling != '') {
          cross += sku.skucrosselling;
          hasValue = true;
        }
        if (sku.skuacessories != '') {
          acess += sku.skuacessories;
          hasValue = true;
        }
      }
    }
  }
  if (hasValue) {
    //remove skus repetidos
    if (cross != ""){
      //var temp = cross.trim().split(" ");
      
      
      var temp = cross.split(" ");
      var cross = "";
      $.each(temp, function(key, value) {
        if (cross.indexOf(value) == -1) {
          cross += value + " ";
        }
      });
    }
    
    if (acess != ""){
      //var temp = acess.trim().split(" ");
      
      
      var temp = acess.split(" ");
      var acess = "";
      $.each(temp, function(key, value) {
        if (acess.indexOf(value) == -1) {
          acess += value + " ";
        }
      });
    }

    openPage('/home/cross/17?itemId=' + itemId + '&skus=X ' + cross/*.trim()*/ + '&crossskus=X ' + acess/*.trim()*/ + '&mainSku=' + selectedSku[j], 'crossvalue');
    return;
  }
  $("#crossvalue").html('');
}

function setBuyButton(skuId){
  $("input[name='addsku']").attr("value","{" + skuId + ",,}");
  $("input[name='skus']").attr("value",skuId);
}

// abas conteudo especial
function tabStart(){
  $("div.boxSpec ul.tabs li a").attr("onclick", "return false");
  $("div.boxSpec ul.tabs li").bind("click", function(ev){
  $("div.boxSpec ul.tabs li").removeClass("active");
  $(this).addClass("active");
  var target = $(this).children("a").attr("rel");
  $(".tabContent").removeClass("active");
  $("#" + target + ".tabContent").addClass("active");
  if ($(this).parents(".boxSpec").hasClass("scrollableTabs")){
    setTimeout("scrollActiveTab()", 100);
  }
  });
  $("div.boxSpec ul.tabs li.active").click();
  }

// mostra mais avaliacoes/comentarios
function bindMoreComments(){
  $('a.readAll').bind("click", function(ev){
    if (!$('ul.moreComments').hasClass("block")){
      $('ul.moreComments').addClass("block");
    } else {
      $('ul.moreComments').removeClass("block");
    }
  });
}
function CustomListCatalog(){

   _this = this;

   // public functions
   this.init = function(){
      this._manageButtons();
      this._addEvents();
      this._retryAdd();
   }
   this.isGuestContext = function(){
     return _this._getCookieValue("CSTM_LST", "id") != null;
   }
   this.isAdminContext = function(){
     return _this._getCookieValue("CSTM_LST_ADMIN", "listType") != null;
   }

   // private functions
   this._getCookieValue = function(cookieName, field){
     var cookie = $.getCookie(cookieName);
     if (cookie && cookie[0]) {
       return cookie[0].get(field);
     }
     return false;
   }
   this._retryAdd = function(){
      var url = window.location.href;
      if (url.indexOf("retryURL=") > 0) {
         _this._sendAdd(url.replace(/.*retryURL=/,""));
      }
   }

   this._manageButtons = function(){
      if ($("#customListBuy").size() == 0) return;
      var showAll = true;
      var cookie = $.getCookie("CSTM_LST_ADM");
      if (cookie && cookie[0]) {
         var type = cookie[0].get("listType");
         if (type) {
            $("#customListBuy ul li").hide();
            var lis = $("#customListBuy ul li." + type.toLowerCase());
            if (lis.size() > 0) {
               lis.show();
               showAll = false;
            }
         }
      }
      if (showAll) {
         $("#customListBuy ul li").show();
      }
   }
   
   this._addEvents = function(){
     $("#add-list").live("change",function(){
       var urlTemplate = $("#urlTemplate").val();
       var listName = $("#add-list option:selected").attr("data-url");
       var skus = $("[name=addsku]").val();
       var listType = $("#add-list option:selected").val();

       if (skus) {
         //transforma "{123,foo,bar}{456,xx,sda}" em "/123-1/456-1"
         skus = skus.replace(/{(\d+),.*?,.*?}/g, "/$1-1");
       }
       if (urlTemplate && listName){
         if (_this._isValidCustomList(skus)) {
           url = urlTemplate.replace("$SKUS", skus);
           url = url.replace("$LIST_NAME", listName);
           if(_this._isAllowedProceed(listType))
             _this._sendAdd(url);
         }
       }
     });
   }

   this._sendAdd = function (url){
      $.ajax({
         url: url + ".json",
         dataType: "jsonp", 
         success: function (data){
            // se requisicao ok, mas nao esta logado, redireciona
            if (data.code && data.code == 401) {
               window.location.href = url;
            } else {
               var results = [];
               results = $.merge(results, data.successes);
               results = $.merge(results, data.errors);
               _this._modal(results);
            }
         },
         error: function(data) {
     this._modal("Ocorreu algum erro ao adicionar item na lista. Por favor, tente novamente.");
         }
      });            
   }

   this._isValidCustomList = function (skus){
      if (!skus) {
         this._modal("Antes de adicionar na lista, favor selecionar o tipo de produto.");
         $("#add-list").val("-1");
         return false;
      }
      return true;
   }
   
   this._isAllowedProceed = function (listType){
     var currListTp = _this._getCookieValue("CSTM_LST_ADMIN", "listType");
       if(currListTp != false){
         if(listType != currListTp){
           var opt = confirm("A lista selecionada difere da lista previamente logada. Deseja continuar?");
           if(!opt){
             $("#add-list").val("-1");
             return false;
           }
         }
     }
     return true;
   }

   this._modal = function (msg) {
     if (msg.length > 0) {
         /*
     $(msgList).each(function(i, msg){
            alert(title + "\n " + msg);
         });
         //*/
     $("#listaErrosLightBox").append("<li>" + msg + "</li>");
         showErrorColorBox();
         //*/
      }
   }
   
}
var customListCatalog = new CustomListCatalog(); // singleton global

// metodo que exibe/oculta informacoes de garantia extendida, por enquanto nao utilizado;
// quando usar, adaptar o codigo para xhtml atual;
function setHasExtendedWarranty(skuId, checkoutUrl, extendedWarrantyUrl, source, hasWarranty, skus){
  var allowWarranty = !customListCatalog.isGuestContext();
  if (source == "KIT" && hasWarranty == "Y" && allowWarranty) {
    $("div[class=garantia]").show();
    $("form[id=frmBuy]").attr("action",extendedWarrantyUrl);
    $("input[name='skus']").attr("value",skus);
    $("input[name='kit']").attr("value",skuId);
  } else {
    for(i=skusDados.skus.length-1;i>=0;i--){
      if(skusDados.skus[i].id == skuId){
        if(skusDados.skus[i].garantia == "false" || !allowWarranty){
          $("div[class=garantia]").hide();
          //Set buy button
          $("form[id=frmBuy]").attr("action",checkoutUrl);
        } else {
          $("div[class=garantia]").show();
          $("form[id=frmBuy]").attr("action",extendedWarrantyUrl);
          $("input[name='skus']").attr("value",skuId);
        }
        break;
      }
    }
  }
}

function notifyMeSwitch () {
  $(".btnNotify").bind("click",function(){
    showNotifyForm();
  });
  
  $(".btnAviseBack").bind("click",function(){
    hideNotifyForm();
  });
  
  $("#exibirAviseForm").click(function(){
	$(this).parent().hide();
	$(".unavailable-box").fadeIn();
  });
}

function showNotifyForm() {
  $(".notifyMe").removeClass("off");
  $(".notifyMe").addClass("on");
  $(".infoOne").css("display", "none");
  $(".infoTwo").css("display", "none");
  $(".infoThree").css("display", "none");
}

function hideNotifyForm() {
  $(".notifyMe").removeClass("on");
  $(".notifyMe").addClass("off");
  $(".infoOne").css("display", "block");
  $(".infoTwo").css("display", "block");
  $(".infoThree").css("display", "block");
}

function requestShortURL(longURL, success) {
  var API = 'http://json-tinyurl.appspot.com/?url=', URL = API + encodeURIComponent(longURL) + '&amp;callback=?';
  var tinyUrl = longURL;
  $.getJSON(URL, function(data) {
    tinyUrl = (data.tinyurl);
  success (tinyUrl);
  });
}

function sendSocialNw(url, content, size) {
  requestShortURL(url, function(shortened){
    window.open (content+shortened,'child', size);
  });
}

function doCrossSellingSubmit(mainSkuId, crossSkuId){
  var crossSkus = '{' + mainSkuId + ',1,}{' + crossSkuId + ',1,}';
  setBuyButton(crossSkus);
  $("#frmBuy").submit();
}
	
   $("#doSearchLabel").live("keypress",function(event) {
		//13 maps to the enter key			
		if (event.keyCode == 13) {
			var termo = Trim($(".productsSearch input.text").val());			
       		if(termo != "") {   
           		searchHighlight();
			   	changeTab(termo) 
			}
		}
		else{
			$(".productTabs .tabContent").removeHighlight().val();
		}
	});
	
   //search ficha tecnica de produtos (abas)
   $("#doSearch").live("click", function (ev) {
	   var termo = Trim($(".productsSearch input.text").val())
       if ( termo != "") {		   
           searchHighlight();		   
		   changeTab(termo) 
       }	   
       return;
   });
	jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 });
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};


function checkQtd(){

  validadeProductQtd();

  if(typeof($('#qtdValue').val()) == "undefined" || $('#qtdValue').val() == null)
  {
    return 1;
  }
  else
  {
    return $('#qtdValue').val();
  }

}

function validadeProductQtd(el)
{
  var el = el || $('#qtdValue');

  el.on("keyup",function(ev){
    utils.number(ev);
  });
}

function restartZoom(selector)
{
    selector.unbind();
    selector.jqzoom( jqZoomOptions );
}

function zoomInit(zoomOptions, options) {

    var defaults = {
        zoomEl: ".jqzoom",
        thumb: ".foto > a"
    };
    var settings = $.extend(defaults,options);

    $( settings.zoomEl ).each(function(i, val) {
        $(this).jqzoom( zoomOptions );
    });

    changeZoomImgThumbs();
}

function changeZoomImgThumbs() {

  $(".thumbs a").on("click",function(e){
    e.preventDefault();

    thumonex = $(".thumbs").find("a").index(this);

    if( $(".product-video-box").is(":visible") )
    {
        $(".product-video-box").fadeOut(300, function(){
            $(this).remove();
        });
    }

    $(".zoomWrapperImage").find("img").attr("src", "");

    var data = $(this).data("gal");

    $(".thumbs").find("a").removeClass("current");
    $(this).addClass("current");

    $(".zoomWrapperImage").find("img").attr("src",data.largeimage);

  });
}
