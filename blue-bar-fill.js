String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,"");}
$(document).ready(function() {
  lowerBar.fill();
  $('#vFind').submit(function() {
    var cep = $('input[name="cep"]').val();
    var cepSf = $('input[name="cepSf"]').val();
    window.location = $(this).attr('action')+'cep/'+cep+cepSf;
    return false;
  });
  $('#vFind2').submit(function() {
    var state = $('#storeStateLabel').text().trim();
    var city = $('#storeCityLabel').text().trim();
    var neigh = $('#storeNeighLabel').text().trim();
    var url = $(this).attr('action');
    if(state != 'Selecione Estado') {
      url += '/' + state;
      if(city != 'Selecione Cidade' && city != '-') {
        url += '/' + city;
        if(neigh != 'Selecione Bairro' && neigh != '-') { url += '/' + neigh;}
      }
    }
    window.location = url;
    return false;
  });
  BlueBarStart();
  $('div.myAcc').show();
  lowerBar.openGuide();
});

var lowerBar = {
  CART_INFO : 'CART_INFO',
  FEATURE_COMPARE : 'FEATURE_COMPARE',
  CROSS_SELLING : 'CROSS_SELLING',
  GUIDE : 'GUIDE',
  CUSTOMER_INFO : 'CUSTOMER_INFO',
  fill : function() {
    lowerBar.fillGuide();
    lowerBar.fillUserInfo();
    lowerBar.fillCartInfo();
    lowerBar.fillFeatureCompare();
    lowerBar.fillCrossSelling();
    lowerBar.fillFindAStore();
  },
  fillUserInfo : function() {
    var dadosCookie = $.getCookie(lowerBar.CUSTOMER_INFO);
    if (dadosCookie != null) {
      var blocoPrincipal = dadosCookie[0];
      var name = blocoPrincipal.get('shortName');
      $('#barUser').text(name);
      // Buttons
      $('#myAccount').unbind('click');
      $('#myAccount').bind('click', function(ev) {
        window.location = this.href;
      });
      $('#barLogout').unbind('click');
      $('#barLogout').bind(
          'click',
          function(ev) {
            $('#barEmail').val('');
            $('#barPass').val('');

            $.getJSON(this.href + '?action=logout&callback=?',
                function(data) {
                  if ('ok' == data.status) {
                    lowerBar.fillUserInfo();
                  } else {
                       $("#listaErrosLightBox").append('<li>Logout</li>');
                         $("#listaErrosLightBox").append('<li> ' + data.msg + ' </li>');
                         AlertStart();
              }
            });
            return false;
          });
      lowerBar.closeBar();
      $('.noUserTab').hide();
      $('.userTab').show();
    } else {
      $('#vRegister')
          .submit(
              function() {
                if ($('#vRegister').valid()) {
                  var email = $('#vRegister :input[name="email"]').val();
                  var doc = $('#vRegister :input[name="documentNr"]').val().replace('.', '').replace('.', '').replace('-', '');
                  var postalCode = $('#vRegister :input[name="postalCode"]').val();
                  var postalCodeSf = $('#vRegister :input[name="postalCodeSf"]').val();
                  var registerServlet = $('#barLogin').val();
                  $.getJSON(registerServlet+ '?action=register&email='+ email + '&doc='+ doc+ '&callback=?',
                          function(data) {
                            if ('ok' == data.status) {
                              var url = $('#vRegister')
                                  .attr(
                                      'action');
                              if (doc.length > 11) {
                                url = $(
                                    '#companyUrl')
                                    .val();
                              }
                              window.location = url
                                  + '?email='
                                  + email
                                  + '&documentNr='
                                  + doc
                                  + '&postalCode='
                                  + postalCode
                                  + '&postalCodeSf='
                                  + postalCodeSf;

                            } else {

                              $(
                                  '#listaErrosLightBox')
                                  .append(
                                      '<li> Cadastre-se </li>');
                              $(
                                  '#listaErrosLightBox')
                                  .append(
                                      '<li> ' + data.msg + ' </li>');
                              AlertStart();
                            }
                          });

                  return false;

                }
              });
      $('#barLoginBtn').unbind('click');
      $('#barLoginBtn')
          .bind(
              'click',
              function(ev) {
                if ($('#vLogin').valid()) {
                  var crUrl = $('#barCrUrl').val();
                  var loginUrl = $('#barLogin').val();
                  $.post(
                          crUrl,
                          {
                            user : $('#barEmail')
                                .val(),
                            pass : $('#barPass')
                                .val()
                          },
                          function(data) {
                            $.getJSON(loginUrl
                                        + '?action=login&msg='
                                        + data.msg
                                        + '&callback=?',
                                    function(
                                        dataJson) {
                                      if ('ok' == dataJson.status) {
                                        lowerBar
                                            .fillUserInfo();
                                      } else {
                                        $('#barEmail').val('');
                                        $('#barPass').val('');
                                        $(
                                            '#listaErrosLightBox')
                                            .append(
                                                '<li> Login </li>');
                                        $(
                                            '#listaErrosLightBox')
                                            .append(
                                                '<li> ' + dataJson.msg + ' </li>');
                                        AlertStart();
                                      }
                                    });

                          }, 'json');
                }
              });

      $('.userTab').hide();
      $('.noUserTab').show();
    }
  },
  fillCartInfo : function() {
    var dadosCookie = $.getCookie(lowerBar.CART_INFO);
    if (dadosCookie != null && dadosCookie[0] != null) {
      var blocoPrincipal = dadosCookie[0];
      var qtTotal = blocoPrincipal.get('qtTotal');
      if(qtTotal>0) {

      if ( $.browser.msie ) {
        if($.browser.version == 6.0){
          $(".cartFull").css("right","-23px");

        }
      }
        if($('.finish').hasClass('empty')) {
          $('.finish').removeClass('empty');
        }
        $('.totalItems').text(
            qtTotal + ' ite' + ((qtTotal == 1) ? 'm' : 'ns'));
        $('.totalValor').text(
            'R$ ' + lowerBar
                .formatNumber(blocoPrincipal.get('vlTotal')));
        var products = [];
        for ( var i = 1, len = dadosCookie.length; i < len; i++) {
          products[i] = '<p class="name">' + dadosCookie[i].get('nm') + '</p>';
          var qtdProd = dadosCookie[i].get('qt');
          var valor;
          if(dadosCookie[i].get('ig')=='true'){
            valor = ' Brinde ';
          }else{
            valor = ' R$ ' + lowerBar.formatNumber(dadosCookie[i].get('vl'));
          }
          products[i] += '<p class="unitPrice">' + qtdProd + ' unidade'
              + ((qtdProd > 1) ? 's' : '') + ' <span>'
              + valor
              + ' </span></p>';
        }
        $('.prodList').html(products.join(''));
      } else {
        if(!$('.finish').hasClass('empty')) {
          $('.finish').addClass('empty');
        }
        if(!$('.cart').hasClass('empty')) {
          $('.cart').addClass('empty');
        }
      }
    } else {
      if(!$('.finish').hasClass('empty')) {
        $('.finish').addClass('empty');
      }
      if(!$('.cart').hasClass('empty')) {
        $('.cart').addClass('empty');
      }
    }
  },
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
                    lowerBar.closeBar();
                    $.eraseCookie(lowerBar.FEATURE_COMPARE);
                  } else {
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
          $( "input[id^=chk]" ).removeAttr('checked');
          $.eraseCookie(lowerBar.FEATURE_COMPARE);
          lowerBar.fillFeatureCompare();
        });
        $('#compareBtn').unbind('click');
        $('#compareBtn').bind('click', function(ev) {
            prefix = $("#compUrl").val();
            this.href = prefix + params;
          });
        ThickboxStart();
      } else {
        if(numProd == 0) {
          $.eraseCookie(lowerBar.FEATURE_COMPARE);
        }
        $('.compareTab').hide();
        if ($('.compareTab').hasClass('active')) {
          lowerBar.closeBar();
        }
      }
    } else {
      $.eraseCookie(lowerBar.FEATURE_COMPARE);
      $('.compareTab').hide();
    }
  },
  fillGuide : function() {
    if ($('#guide_bread_content').size() > 0) {
      var cookieObj = cookieToObject('GUIDE_PRODUCTS');
      var cookieLevel = cookieToObject('GUIDE_CATEGORIES');
      if(cookieObj != null || cookieLevel != null) {
        // executa apenas caso existam ultimos produtos visualizados
        if (cookieObj != null) {
          for(var product=cookieObj.length-1; product >= 0; product--) {
            if (cookieObj[product] != null) {
              var name = cookieObj[product].desc;
              var url = cookieObj[product].productUrl;
              var picture = cookieObj[product].url;
              if (name!=null && url !=null && picture!=null) {
                var prodValue = '<div class="floatLeft active">'
                   + '<span class="view floatLeft">Você estava vendo:</span>'
                   + '<a title="'+name+'" href="'+url+'" class="link floatLeft">'
                   + '<img src="'+picture+'" class="floatLeft">'
                   + '<span class="floatLeft">'+name+'</span>'
                   + '</a>'
                   + '</div>';
                btValue = '<a href="'+url+'" class="btn"><button type="submit">Voltar ao produto</button></a>';
                $('#guide_bread_content').html(prodValue);
                $('#guide_btn_content').html(btValue);
                return;
              }
            }
          }
          return;
        }
        //executa apenas caso existam ultimos levels visitados
        if(cookieLevel != null) {
          for(var level=cookieLevel.length-1; level >= 0; level--) {
            if (cookieLevel[level] != null) {
              var catValue = "";
              var btValue = "";
              var link = cookieLevel[level].catf_full;
              var linkF = cookieLevel[level].catf_full+"/"+cookieLevel[level].cat;
              var cats = cookieLevel[level].cats;
              if (cats!=null && cats !='') {
                var linkS = cookieLevel[level].catf_full+"/"+cookieLevel[level].cat+"/"+cookieLevel[level].cats;
                catValue = "<span class='view floatLeft'>Você estava vendo:</span>"
                  + "<ul class='breadLinks floatLeft'><li><a href='"+link+"'>"+cookieLevel[level].catfName+"</a> &gt; </li>"
                  + "<li>"+cookieLevel[level].catName+" &gt; </li>"
                  + "<li><a href='"+linkS+"'>"+cookieLevel[level].catsName+"</a></li></ul>";
                btValue = '<a href="'+linkS+'" class="btn"><button type="submit">Voltar à categoria</button></a>';
              } else {
                catValue = "<span class='view floatLeft'>Você estava vendo:</span>"
                  + "<ul class='breadLinks floatLeft'><li><a href='"+link+"'>"+cookieLevel[level].catfName+"</a> &gt; </li>"
                  + "<li><a href='"+linkF+"'>"+cookieLevel[level].catName+"</a> </li></ul>";
                btValue = '<a href="'+linkF+'" class="btn"><button type="submit">Voltar à categoria</button></a>';
              }
              $('#guide_bread_content').html(catValue);
              $('#guide_btn_content').html(btValue);
              return;

            }
          }
        }
      }
    }
  },
  fillCrossSelling : function() {
    var dadosCookie = $.getCookie(lowerBar.CROSS_SELLING);
    var lineCrossProd = -1;
    if (dadosCookie != null) {
      lineCrossProd = getLineIdxByKey(dadosCookie, 'crossSku');
    }
    var isCrossSelling = (($( "a[id^=compraAccess-]" )!=null && $( "a[id^=compraAccess-]" ).length >0) || ($( "a[id^=compraRec-]" )!=null && $( "a[id^=compraRec-]" ).length >0) || ($( "a[id^=compra-]" )!= null && $( "a[id^=compra-]" ).length > 0));

    if (isCrossSelling && dadosCookie != null && dadosCookie.length > 0 && lineCrossProd > 0) {
      // manter esta order: primeiro o sku principal, depois os skus de cross-selling
      var params = '?';

      var products = [];
      for ( var i = 0, len = dadosCookie.length; i < len; i++) {
        if (i == 0) {
          params += 'addsku=';
        }
        products[i] = '';
        if (i < lineCrossProd) {
          params += '{' + dadosCookie[i].get('mainSku') + ',1,}';
          products[i] += '<div class="img"><img src="' + dadosCookie[i]
              .get('mainImg') + '" alt="" /></div>';
          products[i] += '<div class="moreBig">+</div>';
        } else {
          var crossSku = dadosCookie[i].get('crossSku');
          params += '{' + crossSku + ',1,}';
          if (i > lineCrossProd) {
            products[i] += '<div class="moreSmall imgCross' + crossSku + '">+</div>';
          }
          products[i] += '<div class="img imgCross'
              + crossSku
              + '"><img src="'
              + dadosCookie[i].get('crossImg')
              + '" alt="" /><span class="close"><a class="hide removeCross" href="javascript:;" id="close'
              + crossSku + '">fechar</a></span></div>';

        }
      }
      $('.crossProdList').html(products.join(''));
      $('.removeCross').unbind('click');
      $('.removeCross').bind('click', function(ev) {
        var currentCookie = $.getCookie(lowerBar.CROSS_SELLING);
        var updatedCookie = [];
        var ucIdx = 0;
        var skuToRemove = this.id.substring(5);
        var totalCross = 0;
        for ( var i = 0, len = currentCookie.length; i < len; i++) {
          if (currentCookie[i].get('crossSku') != null) {
            if (currentCookie[i].get('crossSku') == skuToRemove)
              continue;
            totalCross++;
          }
          updatedCookie[ucIdx++] = currentCookie[i];
        }

        if (totalCross <= 0) {
          $('.crossTab').hide();
          lowerBar.closeBar();
          $.eraseCookie(lowerBar.CROSS_SELLING);
        } else {
          $.sessionCookie(lowerBar.CROSS_SELLING, updatedCookie);
        }
        lowerBar.fillCrossSelling();
        if($('#compra-' + skuToRemove)!=null) {
            var comprarJuntoClassName = "comprarjunto";
            var removerClassName = "remover";
            $('#compra-' + skuToRemove).removeClass( removerClassName );
            $('#compra-' + skuToRemove).addClass( comprarJuntoClassName );
        }
        if($( 'a[id^=compraRec-]' )!=null) {
          for(var i=0;i<$( 'a[id^=compraRec-]' ).length;i++) {
              var crossSku = $( 'input[id=skuRecSelected-'+i+']' ).val().split('|')[0];
              crossSku = crossSku.substring(crossSku.indexOf('=')+1);
              if(crossSku == skuToRemove) {
                if($('#compraRec-' + i)!=null) {
                  var comprarJuntoClassName = "comprarjunto";
                  var removerClassName = "remover";
                  $('#compraRec-' + i).removeClass( removerClassName );
                  $('#compraRec-' + i).addClass( comprarJuntoClassName );
              }
                break;
              }

          }
        }
        if($( 'a[id^=compraAccess-]' )!=null) {
          for(var i=0;i<$( 'a[id^=compraAccess-]' ).length;i++) {
              var crossSku = $( 'input[id=skuAccessSelected-'+i+']' ).val().split('|')[0];
              crossSku = crossSku.substring(crossSku.indexOf('=')+1);
              if(crossSku == skuToRemove) {
                if($('#compraAccess-' + i)!=null) {
                  var comprarJuntoClassName = "comprarjunto";
                  var removerClassName = "remover";
                  $('#compraAccess-' + i).removeClass( removerClassName );
                  $('#compraAccess-' + i).addClass( comprarJuntoClassName );
              }
                break;
              }

          }
        }


      });
      $('.crossTab').show();
      $('#crossBtn').unbind('click');
      $('#crossBtn').bind('click', function(ev) {
        $.eraseCookie(lowerBar.CROSS_SELLING);
        window.location = $(this).attr('url') + params;
        return false;
      });

      $('#cancelCrossBtn').unbind('click');
      $('#cancelCrossBtn').bind('click', function(ev) {
        lowerBar.closeBar();
      });

    } else {
      $.eraseCookie(lowerBar.CROSS_SELLING);
      $('.crossTab').hide();
      if ($('.crossTab').hasClass('active')) {
        lowerBar.closeBar();
      }
    }
  },

  fillFindAStore : function() {
    lowerBar.fillFindAStoreState();
  },

  fillFindAStoreState : function() {
    $('input[name="cep"]').val('');
    $('#storeStateLabel').text('Selecione Estado');
    $('#storeState').val('');
    $('#storeCityLabel').text('Selecione Cidade');
    $('#storeCity').val('');
    $('#storeNeighLabel').text('Selecione Bairro');
    $('#storeNeigh').val('');
  },

  fillFindAStoreCity : function(state) {
    $('#storeCityLabel').text('Selecione Cidade');
    $('#storeCity').val('');
    $('#storeNeighLabel').text('Selecione Bairro');
    $('#storeNeigh').val('');
  },

  fillFindAStoreNeigh : function(city, state) {
    $('#storeNeighLabel').text('Selecione Bairro');
    $('#storeNeigh').val('');
  },

  closeBar : function() {
    var animate_duration = 1000;
        $("div[id^=qvTabs-].tabContent").hide();
        var target_parents = $("div[id^=qvTabs-].tabContent").parents(".subNav");
        var target_parents_div = $("div[id^=qvTabs-].tabContent > div ").parents(".subNav");
        if ($('#blueBar').hasClass('showUp'))
        {
            $('#blueBar').animate({
                bottom: '0px'
            }, animate_duration, function () {
                $('#blueBar').removeClass("showUp");
                target_parents.removeClass("show");
                target_parents_div.removeClass("show");
                $('ul.nav li').removeClass("active");
            });

        }

  },

  openBar : function(tab) {

    var target_click = tab;

    var animate_duration = 1000;

     if (!$(target_click).hasClass("active"))
         {
              var target = $(target_click).children("a").attr("title");
              $(".tabContent ").removeClass("tabContenthover");
              $("#" + target + ".tabContent").addClass("tabContenthover ");
              $("#" + target + ".tabContent").show();
              $("#" + target + ".tabContent>div").addClass("active");
              $("#" + target + ".tabContent > div").parents(".subNav").addClass("show");
              $("div.myAcc ul.nav li").removeClass("active");
              $(target_click).addClass("active");
              if (!$('#blueBar').hasClass('showUp'))
             {
                  $('div.subNav').addClass("show");

                  $('#blueBar').animate({
                      bottom: '54'
                  }, animate_duration, function () {
                      $('#blueBar').addClass("showUp");
                  });
              }
          }
  },
  openGuide : function() {
    if ($('#guide_bread_content').size() > 0) {
      var cookieObj = cookieToObject('GUIDE_PRODUCTS');
      var cookieLevel = cookieToObject('GUIDE_CATEGORIES');
      var cookieGuide = cookieToObject('GUIDE_CLICK');
      if ((cookieObj == null && cookieLevel == null ) || (cookieGuide != null && cookieGuide =='-1')) {
        lowerBar.closeBar();
      } else {
        lowerBar.openBar('li.guideTab');
      }
    }
  },
  openCompare : function() {
    lowerBar.openBar('li.compareTab');
  },
  openCross : function() {
    lowerBar.openBar('li.crossTab');
  },
  formatNumber : function(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
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
  }
};
function guideClicked() {
  var target_click = 'li.guideTab';
  if ($('#blueBar').hasClass('showUp')){
    objectToCookie("GUIDE_CLICK", '-1', acecIndexInformation);
  } else {
    objectToCookie("GUIDE_CLICK", '1', acecIndexInformation);
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