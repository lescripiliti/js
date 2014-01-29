$(document).ready(function() {
  $.eraseCookie("FEATURE_COMPARE","");
});

function imgLoaderStart(){
//#patch1
var srcJs = $("script[src*='js/cookie.utils.js']").attr('src');
imgLoader.src = srcJs.substring(0,srcJs.indexOf('js/cookie.utils.js')) + 'images/loadingAnimation.gif'; // preload image
} 

var lowerBar = {
    CART_INFO : 'CART_INFO',
    FEATURE_COMPARE : 'FEATURE_COMPARE',
    CROSS_SELLING : 'CROSS_SELLING',
    GUIDE : 'GUIDE',
    CUSTOMER_INFO : 'CUSTOMER_INFO',
    
  fillFeatureCompare : function() {
    var catf = lowerBar.getCatF();
    var cat = lowerBar.getCat();
    var cats = lowerBar.getCatS();
  
    var dadosCookie = $.getCookie(lowerBar.FEATURE_COMPARE);
    if (dadosCookie != null && dadosCookie.length > 0 && cat != null
        && catf != null) {
      var params = '';
      var products = [];
      var numProd = 0;
      for ( var i = 0, len = dadosCookie.length; i < len; i++) {
        var catHash = dadosCookie[i].get('hash');
        var hashes = catHash.split(';');
  
        if (hashes[0].replace('/', '') != catf
            || hashes[1].replace('/', '') != cat
            || hashes[2].replace('/', '') != cats) {
          //continue; // Comentado para rodar localmente
        }
        numProd++;
        params += dadosCookie[i].get('productId') + (i < len - 1 ? ' ' : '');
        products[i] = '<div class="img imgCompare" id="imgCompare'
            + dadosCookie[i].get('sku')
            + '"><img src="'
            + dadosCookie[i].get('img')
            + '" alt="" /><span class="close"><a class="hide removeCompare" href="javascript:;" id="close'
            + dadosCookie[i].get('sku')
            + '">fechar</a></span></div>';
      }
      if (numProd > 1) {
        $('.compareProdList').html(products.join(''));
        $('.removeCompare').unbind('click');
        $('.removeCompare')
            .bind(
                'click',
                function(ev) {
                  var currentCookie = $
                      .getCookie(lowerBar.FEATURE_COMPARE);
            $("div.alertProducts").hide();
            
                  var updatedCookie = [];
                  var ucIdx = 0;
                  var skuToRemove = this.id.substring(5);
          
                  if($('#chk' + skuToRemove)!=null) {
                    $('#chk' + skuToRemove).removeAttr('checked');
                  }
  
                  for ( var i = 0, len = currentCookie.length; i < len; i++) {
                    if (currentCookie[i].get('sku') == skuToRemove)
                      continue;
                    updatedCookie[ucIdx++] = currentCookie[i];
                  }
                  if (updatedCookie.length <= 0) {
                    $('.compareTab').hide();
                    $('.boxCompare').hide()
                    lowerBar.closeBar();
                    $.eraseCookie(lowerBar.FEATURE_COMPARE);
                  } else {
              if (updatedCookie.length <= 1){
                $('.compareTab').hide();
                $('.boxCompare').hide()
                        lowerBar.closeBar();
              }
                      $.sessionCookie(
                          lowerBar.FEATURE_COMPARE,
                          updatedCookie);
                      }
                  $('#imgCompare' + skuToRemove).remove();
  
                });
        $('.compareTab').show();
        $('#cancelCompareBtn').unbind('click');
        $('#cancelCompareBtn').bind('click', function(ev) {
          lowerBar.closeBar();
      $('div.alertProducts').hide();
          $( "input[id^=chk]" ).removeAttr('checked');
          $.eraseCookie(lowerBar.FEATURE_COMPARE);
          lowerBar.fillFeatureCompare();
        });
    $('#compareBtn').show();
        $('#compareBtn').unbind('click');
        $('#compareBtn').bind('click', function(ev) {
            var qmarkPosition = this.href.indexOf("?");
            var prefix = this.href.substring(0, qmarkPosition);
            if (prefix.substring(prefix.length) != "/") {
              prefix = prefix.substring(0, prefix
                  .lastIndexOf("/"));
            }
            this.href = prefix + $("#compUrl").val() + params;
          });
        imgLoaderStart();
      } else {
        if(numProd == 0) {
          $.eraseCookie(lowerBar.FEATURE_COMPARE);
        }
    
        $('.compareTab').hide();
        $('.boxCompare').hide()
        if ($('.compareTab').hasClass('active')) {
          lowerBar.closeBar();
        }
      }
    } else {
      $.eraseCookie(lowerBar.FEATURE_COMPARE);
      $('.compareTab').hide();
      $('.boxCompare').hide()
    }
    
  },
  openCompare : function() {
    lowerBar.openBar('li.compareTab');
  },
  openBar : function(tab) {

    var target_click = tab;

    var animate_duration = 10;

     if (!$(target_click).hasClass("active"))
         {
              var target = $(target_click).children("a").attr("title");
              $(".tabContent ").removeClass("tabContenthover");
              $("#" + target + ".tabContent").addClass("tabContenthover ");
              $("#" + target + ".tabContent").show();
              $("#" + target + ".tabContent> div").addClass("active");
              $("#" + target + ".tabContent > div").parents(".subNav").addClass("show");
              $('.boxCompare').show();
              $('#qvTabs-4').show();
              $("div.myAcc ul.nav li").removeClass("active");
              $(target_click).addClass("active");
              if (!$('.boxCompare').hasClass('showUp'))
             {
                  $('div.subNav').addClass("show");
                  
                  $('.boxCompare').animate({
                      bottom: '54'
                  }, animate_duration, function () {
                      $('.boxCompare').addClass("showUp");
                  });
              }
          }
     $('.boxCompare').show();
     $('#qvTabs-4').show();
  },
  
  closeBar : function() {
    var animate_duration = 1000;
        $("div[id^=qvTabs-].tabContent").hide();
        var target_parents = $("div[id^=qvTabs-].tabContent").parents(".subNav");
        var target_parents_div = $("div[id^=qvTabs-].tabContent > div ").parents(".subNav");
        if ($('.boxCompare').hasClass('showUp'))
        {
            $('.boxCompare').animate({
                bottom: '0px'
            }, animate_duration, function () {
                $('.boxCompare').removeClass("showUp");
                target_parents.removeClass("show");
                target_parents_div.removeClass("show");
                $('ul.nav li').removeClass("active");
            });

        }

  },
  
  getCatF : function() {
    var catf = lowerBar.getUrlParams()['catf'];
    if (catf != null) {
      catf = replaceAll(catf,'#', '');
      catf = replaceAll(catf,'+', ' ');
      catf = replaceAll(catf,'%20', ' ');
      return catf;
    }
    return '';
  },
  getCatS : function() {
    var cats = lowerBar.getUrlParams()['cats'];
    if (cats != null) {
      cats = replaceAll(cats,'#', '');
      cats = replaceAll(cats,'+', ' ');
      cats = replaceAll(cats,'%20', ' ');
      cats = clearAttributes(cats);
      return cats;
    }
    return '';
  },
  getUrlParams : function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(
        window.location.href.indexOf('//') + 2).split('/');
    vars.push('catf');
    vars['catf'] = hashes[1];
    vars.push('cat');
    vars['cat'] = hashes[2];
    vars.push('cats');
    vars['cats'] = hashes[3];
    return vars;
  },
  getCat : function() {
    var cat = lowerBar.getUrlParams()['cat'];
    if (cat != null) {
      cat = replaceAll(cat,'#', '');
      cat = replaceAll(cat,'+', ' ');
      cat = replaceAll(cat,'%20', ' ');
      cat = clearAttributes(cat);
      return cat;
    }
    return '';
  }
};
//quantidade maxima de objetos para guardar
var MAX_COOKIE_SIZE = 4;



//quando a combo esta selecionada adiciona no cache
function rmFromCookieCompare(cookieObject, catHash, sku) {

    if (cookieObject != null) {
        for (idx=0; idx<cookieObject.length; idx++) {
            var cookieLineCompare = cookieObject[idx];
            if ((cookieLineCompare.get("sku") == sku) && (cookieLineCompare.get("hash") == catHash)) {
                cookieObject.splice(idx, 1);
            }
        }
    } else {

        //se o cookie tiver null, cria um com o array vazio
        cookieObject = new Array();
    }
    $.sessionCookie("FEATURE_COMPARE", cookieObject);
    return cookieObject;
}

//quando a combo nao esta selecionada, vai remover do cache
function addToCookieCompare(chkBox, cookieObject, catHash, sku, productId, img) {

    //pega o array do cookie, se nao existir cria array
    if (cookieObject == null) {
        cookieObject = new Array();
    }

    //recupera o primeiro item do array para
    //verificar se esta ainda na mesma categoria
    if (cookieObject.length > 0) {

        var firstEntry = cookieObject[0];
        if (firstEntry.get("hash") != catHash) {

            //Se estiver em outra categoria,
            //zera o cookie e comeca novamente
            cookieObject = new Array();
        }
    }

    //verifica o tamanho do array no cookie
    //se ja tem 4, avisa o usuario que nao pode
    if (cookieObject.length == MAX_COOKIE_SIZE) {

      chkBox.checked = false;

        //alert('maximo de 4 produtos no cookie atingido.');
      $("div.alertProducts").show();
       $("#listaErrosLightBox").append("<li>Comparacao de produtos</li>");
         $("#listaErrosLightBox").append("<li>Voce pode comparar no maximo 4 produtos</li>");
         AlertStart();

    } else {

        var compare = new CookieLine();
        compare.put("hash", catHash);
        compare.put("sku",  sku);
    compare.put("productId",  productId);
        compare.put("img",  img);

        cookieObject[cookieObject.length] = compare;
        $.sessionCookie("FEATURE_COMPARE", cookieObject);
    }

    return cookieObject;
}

//metodo chamado pela pagina para adicionar o cookie
function addProductCompare(chkBox, catf, cat, cats, sku, productId, img) {

  var add = chkBox.checked;

    //hash das categorias
    var catHash = catf+";"+cat+";"+cats;
    var cookieObject = $.getCookie("FEATURE_COMPARE");

    if (add) {
        cookieObject = addToCookieCompare(chkBox,cookieObject, catHash, sku, productId, img);
    } else {
        cookieObject = rmFromCookieCompare(cookieObject, catHash, sku);
    }

    //atualiza a barra com as novas informacoes do cookie
    lowerBar.fillFeatureCompare();

    //quando for o segundo item ADICIONADO
    //abre a barra
    if((cookieObject.length >= 2)) {
        lowerBar.openCompare();
  }
  if(cookieObject.length < MAX_COOKIE_SIZE){
    $("div.alertProducts").hide();
  }
}

function replaceAll(string, token, newtoken) {
  while (string.indexOf(token) != -1) {
    string = string.replace(token, newtoken);
  }
  return string;
}

function clearAttributes (string){
  if (string.indexOf("?") != -1){
  var catsTemp = string.split('?');
  return catsTemp[0];
  }else return string;
}