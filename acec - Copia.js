var JSONPrice;
var ACTIVE_SLIDER_PRICE = 0;
var USER_DATA = {};
var boxSlideOptions;

$(document).ready(function() {

  setClassUdas();
  
  setClassUdaPrice();

    $(".logout").live('click', function(event) {
        logout();
    });
});


function startLazyLoad() {
    $(".lazyImg").lazyload({
        effect: "fadeIn",
        skip_invisible: false
    });
    $("img.lazyImg").attr("class", "lazyOk");
}


function setClassUdas() {
  var udaFilter = $('.component-uda a[data-uda-source]');
  var udaLength = $(udaFilter).length;
  var udaColorFilter = /cor-/;
  var udaSizeFilter = /tamanho-/;
  for (i=0;i<udaLength;i++){
    var udaCurrent = udaFilter.eq(i).attr('data-uda-source');
    if(udaCurrent.match(udaColorFilter) == "cor-"){
      udaFilter.eq(i).parent().parent().addClass("udaCor");
    };
    if(udaCurrent.match(udaSizeFilter) == "tamanho-"){
      udaFilter.eq(i).parent().parent().addClass("udaTamanho");
    };
  }
}

function setClassUdaPrice() {
  var udaFilter = $('.component-uda input[data-uda-source]');
  var udaLength = $(udaFilter).length;
  var udaPriceFilter = /faixa-/;
  for (i=0;i<udaLength;i++){
    var udaCurrent = udaFilter.eq(i).attr('data-uda-source');
    if(udaCurrent.match(udaPriceFilter) == "faixa-"){
      udaFilter.eq(i).parent().parent().addClass("udaPreco");
    };
  }
}

var ACEC = {
  departament: {
    
    /* Lista os produtos por departamento */
    loadProductsOfDepartament: function(departament, _page, _order, _dir) {
    
      $('.module_showcase ul').attr('style', 'opacity: 0.2; filter: alpha(opacity=20);');
      
      $('#productsOfDepartament .paginacao-categoria a').attr('onclick', 'return false');
                    
      $.get('/produtos-por-departamento/' + departament, { page: _page, order: _order, dir: _dir}, function(data) {
        
        $('.module_showcase').html(data);
        
        $('html, body').animate({scrollTop: $('.module_showcase').offset().top - 135 }, 800); 
      });
    }
  } ,
  
  product: {
  
    /* Objeto utilizado somente para os produtos em aba */
    navlat : {
      /* funcao que habilita o evento click para a gravacao do cookie. */
      setEvents : function () {
        
        $('.navlat').bind('click', function() {




          /* preenche o objecto para gravacao no cookie */
          ACEC.object.navlat.nav = ACEC.object.current.nav;
          ACEC.object.navlat.items = ACEC.object.current.items;
          ACEC.object.navlat.page = ACEC.object.current.page;
          ACEC.object.navlat.query = ACEC.object.current.query;
          ACEC.object.navlat.order = ACEC.object.current.order;
          ACEC.object.navlat.dir = ACEC.object.current.dir;
          
          ACEC.product.navlat.setToCookie(ACEC.object.navlat);
        });
      },
      /* funcao que verifica qual home sera chamada utilizando a informacao nav */
      execute : function() {
        /* recupera os dados do cookie */
        ACEC.object.navlat = ACEC.functions.cookie.get('CAT_NAVLAT');
        
        /* Se o objeto estiver nulo, cancelar o processo */
        if (ACEC.object.navlat === null)
          return;
        
        if (ACEC.object.navlat.nav == 'cat' || ACEC.object.navlat.nav == 'cats') {
        
          ACEC.product.navlat.getProductsOfCat(ACEC.object.current.productId, ACEC.object.current.catf, ACEC.object.current.cat, ACEC.object.current.cats, ACEC.object.navlat.page, ACEC.object.navlat.order, ACEC.object.navlat.dir);
        } else if (ACEC.object.navlat.nav == 'items') {
        
          ACEC.product.navlat.getProductsOfItems(ACEC.object.current.productId, ACEC.object.navlat.items);
        } else if (ACEC.object.navlat.nav == 'search') {
          
          ACEC.product.navlat.getProductsOfSearch(ACEC.object.current.productId, ACEC.object.navlat.query, ACEC.object.navlat.page, ACEC.object.navlat.order, ACEC.object.navlat.dir);
        }
      },
      /* funcao para incluir o objeto no cookie */
      setToCookie : function (object) {
        
        ACEC.functions.cookie.set('CAT_NAVLAT', object);
      },
    
      /* Lista os produtos da navegacao lateral pela categoria */
      getProductsOfCat: function(p_id, p_catf, p_cat, p_cats, p_page, p_order, p_dir) {
        /* verifica se precisa incluir o parametro cats, dependendo do nivel de categoria navegada */
        var parameters = null;
        
        if (ACEC.object.navlat.nav == 'cats')
          parameters = { id : p_id, catf : p_catf, cat : p_cat, cats : p_cats, page: p_page, order: p_order, dir: p_dir };
        else
          parameters = { id : p_id, catf : p_catf, cat : p_cat, page: p_page, order: p_order, dir: p_dir };
        
        /* efetua a chamada na home 122 */
        $.get('/api/produto/aba/cat', parameters, function(data) {
          
          $('#products-navlat').html(data);
        });
      }, 
      
      /* Lista os produtos da navegacao lateral pela busca */
      getProductsOfSearch: function(p_id, p_query, p_page, p_order, p_dir) {
        /* efetua a chamada na home 123 */
        $.get('/api/produto/aba/busca', { id : p_id, query: p_query, page: p_page, order: p_order, dir: p_dir  }, function(data) {
          
          $('#products-navlat').html(data);
        });
      }, 
      
      /* Lista os produtos da navegacao lateral por itens */
      getProductsOfItems: function(p_id, p_itens) {
        /* efetua a chamada na home 124 */
        $.get('/api/produto/aba/items', { id : p_id, itens: p_itens }, function(data) {
          
          $('#products-navlat').html(data);
        });
      }
    }
  }, 
  /* obejtos do componente ACEC */
  object : {
    /* obejto utilizado somente para a navegacao em abas */
    navlat : {
      
      productId : null,
      nav : null,
      items : null,
      page : 1,
      query : null,
      order : null,
      dir : null
    },
    /* objeto utilizado nas paginas, util para qualquer funcionalidade */
    current : {
      
      producId : null,
      catf : null,
      cat : null,
      cats : null,
      nav : null,
      items : null,
      page : null,
      query : null,
      order : null,
      dir : null,
      typePageView : null,
      chosenColor : null
    },
    
    udas : {
      isPriceRange : false
    }
  },
  /* funcoes do componente ACEC */
  functions: {
    /* objeto cookie */
    cookie : {
      /* grava um cookie */
      set : function (name, value) {
      
        var date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
      
        var objetoStr = JSON.stringify(value);
        $.cookie(name, objetoStr, { expires: date, path: '/', domain: acecIndexInformation.cookieDomain });
      }, 
      /* recupera um cookie */
      get : function (name) {
        
        return $.parseJSON($.cookie(name));
      }
    }
  },
  
  filter : {

    init: function () {

        $('.udaName ul li a').bind('click', function () {
            ACEC.filter.post($(this).attr('data-uda-source'));
        });

        ACEC.filter.create();
    },

    create: function () {

        $(document).ready(function () {

            if ($('#udaFilters').val() != undefined) {
                $($('#udaFilters').val().split('|')).each(function (i, item) {
                    $('.udaName ul li a.box').each(function (j, jItem) {

                        if (item == $(jItem).attr('data-uda-source')) {
                            $(".boxFiltrados").css("display", "block");
                            $(".comboSelecionados").append("<li> " + " <a class=\"link box\"  data-uda-source=" + $(jItem).attr('data-uda-source') + " href=\"javascript:;\"/>" + "<a data-uda-source=" + $(jItem).attr('data-uda-source') + " href=" + "javascript:;" + ">" + $(jItem).attr('value') + " </li>");
                            //$(jItem).addClass('selected').html('X');
                            $(jItem).addClass('selected');
                        }
                    });
                });
                /*
                * se uda de preco estiver habilitada e parametro de uda de preco for 'range'
                * busca o valor maximo de preco disponivel na tela e seta como valor maximo do range
                * o valor minimo por padrão é zero
                */
                if ($('.udaPreco').val() != undefined && $('#slider-range').attr('class') == 'range') {
                    var priceStart = $('#priceRangeMin').val() != '' ? parseInt($('#priceRangeMin').val()) : 0;
                    var priceEnd = $('#priceRangeMax').val() != '' ? parseInt($('#priceRangeMax').val()) : 0;
                    if (priceEnd == 0) {
                        $('.udaPreco a').each(function (i, price) {
                            if ($(price).attr('data-uda-source').indexOf('acima') != -1 && priceEnd == 0) {
                                var splitArray = $(price).attr('data-uda-source').split("R$");
                                priceEnd = parseInt(splitArray[1]);
                            }
                        });
                    }
                    $("#slider-range").slider({ range: true, min: 0, max: priceEnd, values: [priceStart, priceEnd],
                        slide: function (event, ui) {
                            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                        },
                        stop: function () {
                            ACEC.filter.post();
                        }
                    });
                    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
                    if (priceEnd != 0) {
                        ACEC.object.udas.isPriceRange = true;
                        $('.udaPreco').hide();
                        $('.priceRange').show();
                    } else {
                        ACEC.object.udas.isPriceRange = false;
                        $('.udaPreco').show();
                        $('.priceRange').hide();
                    }
                }
            }
            jQuery("#selecionados a.link.box").click(function () {
                ACEC.filter.post($(this).attr('data-uda-source'));
            });

            ACEC.filter.verifyAlterUdaList();
        });
    },
    

    /*Alterado o medoto post para funcionar com o post filtro de categorias*/
    post: function (udaSource) {

        var url = $('#udaLink').val();
        var filters = $('#udaFilters').val();
        var parameters = '';
        var arrFilters = null;
        var existUda = false;
        var newParameters = '';
        //commit Leandro 29/01/2014 11:21
        var arrParams = null;
        var existParameter = false;

        arrFilters = filters.split('|');

        if (filters != '') {
            $.each(arrFilters, function (i, item) {

                if (item != udaSource) {
                    if (parameters != '')
                        parameters += '|';
                    parameters += item;
                } else {
                    existUda = true;
                }
            });

            if (udaSource.indexOf('tamanho') == -1) {
                if (parameters.indexOf(udaSource) < 0 && !existUda && udaSource != undefined) {
                    if (parameters != '')
                        parameters += '|';
                    parameters += udaSource;
                }
            }

            newParameters = ACEC.filter.sort(parameters);

        } else if (udaSource != undefined) {
            if (udaSource.indexOf('tamanho') == -1)
                newParameters = udaSource;
        }
        if (newParameters != '' && newParameters != undefined) {
            url = url.replace('{filter}', newParameters);
        } else {
            url = url.replace('{filter}', '');
        }
        if (newParameters == '' || newParameters == undefined) {
            url = url.replace('/filter/', '');
        }

        $('#udaFilters').val(newParameters);

        window.location.href = url;
    },
    
    sort: function(parameters){
      
      var arrParameters = parameters.split('|');
      var arrGroup = new Array();
      var groupExist = false;
      var gruoupName = '';
      var parametersSorted = '';
      
      $.each(arrParameters, function(i, item) {
      
        $('.udaName ul li a.link').each(function(j, jItem){
          groupExist = false;
          if(item == $(jItem).attr('data-uda-source')){ 
          
            gruoupName = ($(jItem).attr('data-field-name'));
            
            $.each(arrGroup, function(k, kItem){
              if(kItem == gruoupName)
                groupExist = true;
            });
            if(groupExist == false)
              arrGroup[arrGroup.length] = gruoupName;
          }
        });
        
        $('.udaName ul li input').each(function(j, jItem){
          groupExist = false;
          if(item == $(jItem).attr('data-uda-source')){ 
          
            gruoupName = ($(jItem).attr('data-field-name'));
            
            $.each(arrGroup, function(k, kItem){
              if(kItem == gruoupName)
                groupExist = true;
            });
            if(groupExist == false)
              arrGroup[arrGroup.length] = gruoupName;
          }
        });
      });
      
      $.each(arrGroup, function(i, item){
        $.each(arrParameters, function(j, jItem){
          $('.udaName ul li a.link').each(function(k, kItem){
            if(jItem == $(kItem).attr('data-uda-source')){
              
              found = true;
              gruoupName = ($(kItem).attr('data-field-name'));
              
              if(gruoupName == item){
                
                if(parametersSorted != '')
                  parametersSorted += '|';
                parametersSorted += jItem;
              }
            }
          });
        });
        $.each(arrParameters, function(j, jItem){
          $('.udaName ul li input').each(function(k, kItem){
            if(jItem == $(kItem).attr('data-uda-source')){
              
              found = true;
              gruoupName = ($(kItem).attr('data-field-name'));
              
              if(gruoupName == item){
                
                if(parametersSorted != '')
                  parametersSorted += '|';
                parametersSorted += jItem;
              }
            }
          });
        });
      });
      
      return parametersSorted;
    },
    
    verifyAlterUdaList: function() {
    
      var filters = $('#udaFilters').val();
      var arrFilters = null;
      
      if (filters !== undefined) {
        arrFilters = filters.split('|');

        var udaGroup = '';
        var udaGroupCount = 0;

        $(arrFilters).each(function(i, item) {

          $('.udaName .name').each(function(j, item_2) {
          
            if (item == $(item_2).attr('data-uda-source')) {
              
              if (udaGroup == '') {
                udaGroup = $(item_2).attr('data-field-name');
                udaGroupCount++;
              } else if (udaGroup != $(item_2).attr('data-field-name')) {
                udaGroup = $(item_2).attr('data-field-name');
                udaGroupCount++;
              }
            }
          });
        });
        
        if (udaGroupCount == 1) {
        
          $('.aux [data-field-name='+ udaGroup +']').each(function(i, item) {
            
             $('.udaName [data-uda-source='+ $(item).attr('data-uda-source') +'].name').find('span').html('('+$(item).attr('data-uda-count')+')');
             
          });
        } 
      }
      
      ACEC.filter.setLinkUnavailable();
    },
    
    setLinkUnavailable: function() {
    
      $('.udaName .name span').each(function(i, item) {
      
        if ($(item).html() == '(0)') {
        
          $(item).parent().parent().addClass('link-false').find('a').unbind('click');
        }
      });
    },
    
    redirectNotSkuList: function() {
      
      if (typeof countSkuList !== 'undefined' && countSkuList == '') {
        var url = $('#udaLink').val();
        url = url.replace('/filter/{filter}', ''); 
        window.location.href = url;

      }
    }
  }
}

/**
  * Executa operacoes a serem realizadas no load das paginas e apos ajax.
  */
function loadOnReadyAndAjax(event) {
  tabs();
}

function tabs() {
  var tabindex = 1;
  $('a').each(function() {
    var $input = $(this);
    $input.attr("tabindex", "-1");
  });
  
  $('input,select,a.btnStandard').each(function() {
    if (this.type != "hidden") {
      var $input = $(this);
      $input.attr("tabindex", tabindex);
      tabindex++;
      
      var next = '*[tabindex=' + tabindex + ']';
      $(this).bind("keyup", function(e) {
        if (this.value != null) {
          if (this.value.length == this.maxLength) {
            $(next).focus();
          }
        }
      });
    }
  });
}

function acecAddRedirectCookie() {
    if (acecIndexInformation) {
        var cookieName = "REDIRECT_AFTER_LOGIN";
        var cookieValue = "true";
        var cookieDomain = acecIndexInformation.cookieDomain;
        var cookiePath = "/";
        var options = { domain: cookieDomain, path: cookiePath };
        $.cookie(cookieName, cookieValue, options);
    }
}

function acecRedirect(url) {
    if (url && url.length > 0) {
        window.location.href = url;
    }
}

function showLoader(objId) {
    var obj = '#loader-' + objId;
    eval('$("' + obj + '").css("visibility", "")');
}

function hideLoader() {
    window.setTimeout('$(".JQajaxloader").css("visibility", "hidden");', 400);
}

function doLoadingPayment() {
    $(".endBuy").hide();
    $(".btnDisabled").show();
}
    
function doLoadingRegister(obj) {
    eval('$("' + obj + '").hide()');
}

function getUserData(){
  // se estiver no catalogo, chama via ajax, ja que os cookies do cart nao podem ser lidos
  if (window.location.hostname.substr(0, 3) == "www") {
    var ckoutURL = getUserDataServletURL();
    callUserDataServlet(ckoutURL, "callbackCkout");
  }
  else{
    cartInfo();
  }
}

// pega os itens da sacola retornados pelo ckout
function callbackCkout(data){
  USER_DATA = data;
  var sservURL = getUserDataServletURL().replace("ckout", "sserv");
  callUserDataServlet(sservURL, "callbackSserv");
}

// pega o nome de quem esta logado retornado pelo sserv
function callbackSserv(data){
  USER_DATA.customer = data.customer;
  cartInfo();
}

function getUserDataServletURL(){
  return acecIndexInformation.userDataServlet.replace(/^(.*\/ckout).*/, "$1/userDataServlet").replace("http://", "//");
}

function callUserDataServlet(url, callback) {
  var store;
  // catalogo tem a variavel STORE_ID
  // ckout/sserv leem do cookie "st"
  if (typeof(STORE_ID) != "undefined") {
    store = STORE_ID; 
  } else {
    store = $.cookie('st');
    store = (store != null ? store : '');
  }
  $.ajax({
    url:    url + "?cb=" + callback,
      dataType: "jsonp",
      data:   {"st": store}
  });
}

function cartInfo() {
  var store = $.cookie('st');
  if(store == null){
    store = utils._GET('st');
  }
  var cookieName = 'CART_INFO' + (store != null ? store : '');
  var qtt = readCookieCartQtd();
  var totalValue = readCookieCartTotalValue();
  var loginName = readCustomerLogin();
  if (qtt == 1 ) {
    $(".cartItems").html(qtt+' item ');  
  } else {
    if (qtt < 1 ) {
      qtt = 0;
    }
    $(".cartItems").html(qtt+' itens ');
  }
  
  if (totalValue > 0) {
    $(".valor").html('R$ ' + utils.formatNumber(totalValue));
  } else {
    $(".valor").html('R$ 0,00');
  }
  
  if (loginName != null && loginName != "") {
    $(".userName").html(loginName);
    $("#info .visitante").show();
    $("#signUpLoginLinks").hide();
    $("#exitLink").show();
  } else {
    $(".userName").html("Visitante");
    $("#info .visitante").show();
    $("#exitLink").hide();
    $("#signUpLoginLinks").show();
  }
}

function readCookieCartTotalValue() {
  if (USER_DATA.total) {
    return USER_DATA.total;
  } else {
    var store = $.cookie('st');
    if(store == null){
      store = utils._GET('st');
    }
    var cookie = $.getCookie('CART_INFO' + (store != null ? store : ''));
    if (cookie && cookie[0]) {
        return cookie[0].get('vlTotal');
    }
    return '0';
  }
}

function readCookieCartQtd() {
  if (USER_DATA.qt) {
    return USER_DATA.qt;
  } else {
    var store = $.cookie('st');
    if(store == null){
      store = utils._GET('st');
    }
    var cookie = $.getCookie('CART_INFO' + (store != null ? store : ''));
    if (cookie && cookie[0]) {
      return cookie[0].get('qtTotal');
    }
    return '0';
  }
}

function readCustomerLogin () {
  if (USER_DATA.customer){
    return USER_DATA.customer;
  } else {
    var store = $.cookie('st');
    if(store == null){
      store = utils._GET('st');
    }
    var dadosCookie = $.cookie('CUSTOMER_INFO' + (store != null ? store : ''));
    if (dadosCookie != null) {
      var indBegin= dadosCookie.indexOf('shortName');
      var indEnd = dadosCookie.indexOf('|');
      var customer = dadosCookie.substring(indBegin+10,indEnd);
      return customer;
    } 
    return null;
  }
}

function addProductToList(produtoP, cookieObj, domain) {
  var produto = {
                id: produtoP.id,
                url: produtoP.url,
                desc: produtoP.desc,
                productUrl: produtoP.productUrl
  }
  
  var produtoRecomendado1 = {
    id: produtoP.rec_1_id,
    url: produtoP.rec_1_url,
    desc: produtoP.rec_1_nome,
    img: produtoP.rec_1_img,
    price: produtoP.rec_1_preco,
    origin: produtoP.id
  }
  
  var produtoRecomendado2 = {
          id: produtoP.rec_2_id,
          url: produtoP.rec_2_url,
          desc: produtoP.rec_2_nome,
          img: produtoP.rec_2_img,
          price: produtoP.rec_2_preco,
          origin: produtoP.id
  }
  
  addProdutosRecomendados(produtoRecomendado1, produtoRecomendado2, domain);
  
  for (idx=0; idx<cookieObj.length; idx++) {
    var currentObj = cookieObj[idx];
    if (currentObj.id == produto.id) {
      cookieObj.splice(idx,1);
    }
  }
  
  if (cookieObj.length == 9) {
    cookieObj.shift();
  }
  
  cookieObj[cookieObj.length] = produto;
}

function addProdutosRecomendados(pRec1, pRec2, domain) {
  //nome do cookie
  var COOKIE_NAME = 'CAT_REC_PRODUCTS';

  //objeto de produtos recomendados que estao na barra
  //caso nao exista, cria um array vazio
  var recProducts = cookieToObject(COOKIE_NAME);
  if (recProducts == null) {
    recProducts = new Array();
  }

  //primeiro item do array se existir vai para a segunda posicao
  //se nao existir, e o primeiro item, nao move o objeto entao
  if (recProducts[0] != null) {
    recProducts[1] = recProducts[0];
  }

  //define qual sera o novo produto recomendado a entrar na primeira posicao do array
  //deve ser o produto mais barato da categoria do ultimo produto visto
  //caso o produto visualizado (origin) seja o produto mais barato da categoria dele
  //mostramos o segundo mais barato da categoria
  
  if(recProducts[0] == recProducts[1] && pRec1.id == pRec1.origin){
    recProducts[0] = pRec2;
    recProducts[1] = '';
  } else {
    recProducts[0] = pRec1;    
    recProducts[1] = pRec2;    
  }
  
  objectToCookie(COOKIE_NAME, recProducts, domain);
}

function addLevelToList(level, cookieLevel) {
  for (idx=0; idx<cookieLevel.length; idx++) {
    var currentObj = cookieLevel[idx];
    if (level.cat == currentObj.cat && level.catf == currentObj.catf) {
      cookieLevel.splice(idx,1);
    }
  }

  if (cookieLevel.length == 7) {
    cookieLevel.shift();
  }
  
  cookieLevel[cookieLevel.length] = level;
}

function objectToCookie(nome, objeto, domain) {
  var date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  
  var objetoStr = JSON.stringify(objeto);
  $.cookie(nome, objetoStr, { expires: date, path: '/', domain: domain.cookieDomain});
}

function cookieToObject(nome) {
  return eval(eval($.cookie(nome)));
}

function eraseLastProducts(){
  deleteCookie('LAST_PRODUCTS', acecIndexInformation.cookieDomain);
  populateLast();
}

function populateLast() {

  var cookieObj = cookieToObject('LAST_PRODUCTS');
  
  //caso ambos os cookies sejam nulls ele esconde a barra inteira
  if(cookieObj == null) {
  
    $("#cookieFooter:last").hide();      
    $("#last-products:last").hide();      
    
    } else {
    
          var item = 0;
           if (cookieObj.length > 0 ) {
                
                 $("#cookieFooter:last").show();
                $('.slider').append('<a href="javascript:void(0);" class="arrow forward" id="vaiUltimos"></a>');
                $('.slider').append('<a href="javascript:void(0);" id="voltaUltimos" class="arrow back"></a>');

                var classLastProdSlide;
                
                   for(var i = cookieObj.length - 1; i >= 0; i--) {
                  if (i == cookieObj.length - 1) {
                    classLastProdSlide = 'first';
                  } else if (i == 0) {
                    classLastProdSlide = 'last';
                  } else {
                    classLastProdSlide = '';
                  }
                  $('.lastProductsSlide ul').append('<li class="' + classLastProdSlide + '" data-ga-click=\'{"category": "catalog", "action": "Click Ultimos Produtos Vistos", "label": "ProdId: ' + cookieObj[i].id + '"}\'><a title="' + cookieObj[i].desc + '" href="' + cookieObj[i].productUrl + '"><img alt="' + cookieObj[i].desc + '" src="' + utils.urlImage(cookieObj[i].url) + '"></a><strong><a title="' + cookieObj[i].desc + '" href="' + cookieObj[i].productUrl + '">' + cookieObj[i].desc + '</a></strong></li>');
                  item++;
                  if(item>5){ return false;}
                }
        }
                else 
                {
              $("#cookieFooter:last").hide();        
              $("#last-products:last").hide();        
        }
      
        }
    
}

function imageMenu(el, toAppend) {
    var el = el || $(".menu-image");

    if(el.length > 0)
    {
        var parentWidth = el.parents(".submenu-box").width();
        var image = el.find("img");
        var link = el.find("> a").attr("href");
        var title = "<h3><i class='ico-ilustracao-direito-titulo'></i> " + $(image).attr("alt") + " <i class='ico-ilustracao-esquerdo-titulo'></i></h3>";
        var wrap = $("<div />", { 'class': "menu-image-box" });
        wrap
            .append(title)
            .append(image);

        $(".menu-image-box").die("click");    
        $(".menu-image-box").live("click", function(){
            window.location.href = link;
        });

        var boxWidth = ($(".menu-image-box").outerWidth() > 0) ? parentWidth + $(".menu-image-box").outerWidth() : parentWidth + 190;

        el.parents(".submenu-box").width(boxWidth);

        el.remove();
        
        $(wrap).appendTo(toAppend);
        $(".menu-image-box").fadeIn(300);
  }
}

function topMenuCurrent() {

    var path = location.pathname;
  var subpath = path.split('/');
  subpath[1] = "/" + subpath[1];
    
    if(path == "/") return false;

    $("#topMenu").find("> ul > li > a").each(function(){
        if(subpath[1] == $(this).attr("href") || $(this).attr("href").indexOf(path) != -1)
        {
            $(this).parent('li').addClass("current");
        }

    });
}

function openPage(url, id, dependencies) {

    var dependencies = dependencies || [];

    $.get(url, function(response){
        var elemento = $("#" + id);

        if (elemento.length > 0 && crosselling.skuCrosselling.length > 0) {
            elemento.html(response);
            events_productStart();
            var cross = crosselling.skuCrosselling[0].skucrosselling;
            var acess = crosselling.skuCrosselling[0].skuacessories;
            if (cross == "") {
                if (acess != "") {
                  $("#slider-tab").removeClass("slider-tab-default").addClass("slider-tab-acess");
                  $("#vertSliderAcessorios").show();
                  $("#vertSliderRecomendado").hide();
                } else if (id == 'crossvalue') {
          showOrHideCrossSelling();
        }
            } 
            else {
              if (id == 'crossvalue') {
                $(".colorBoxQuickView").colorbox({width:"681px", height:"645px", opacity:0.5, iframe:true});
                showOrHideCrossSelling();
              }
            }
        }

        if($.isArray(dependencies) && dependencies.length > 0)
        {
            utils.loadScripts(acecIndexInformation.imageUrl, dependencies);
        }
        else
        {
            console.error("Erro ao carregar as dependências.");
        }
        
    });
}

//COLORBOX
  function closeColorBox(time) {
    var time = time || "";

    if(time != "")
    {
        setTimeout(function(){
            $.colorbox.close();
        }, time);
        
    }
    else{
        $.colorbox.close();
    }

    
  }

  function bindColorboxEvent() {
    $(".inlinePop").colorbox({width:"300px", height:"200px", inline:true});
  }

  function showErrorColorBox() {
    if ($("#listaErrosLightBox").size() > 0) {
      hideLoader();
      window.setTimeout('$.colorbox({width:"300px", height:"200px", inline:true, href:"#listaErrosLightBox", open:true, title: "Atenção", onClosed:function(){$("#listaErrosLightBox").html("")}});',1);
    }
  }

  function openColorBoxCorreios(pos) {
    $.colorbox({title: "Selecione um meio de envio", width:"320px", height:"250px", href:"#showPopSelectFreightBox" + pos, open:true, inline:true, onClosed:function(){$("#showPopSelectFreightBox" + pos).html('')}});
  }

  function openColorBox(modalName, params) {
    if (typeof(params) == "undefined") {
      params = "";
    }
    switch (modalName) {
      case "mail_reminder_begin":
        params= "document_number.xhtml?" + params + "&operationType=mail_reminder";
        window.location.href = params;
      break;

      case "mail_reminder_end":      
        params ="mail_reminder.xhtml?" + params;
        window.location.href = params;
      break;
      case "mail_change_begin":
        params = "document_number.xhtml?" + params+ "&operationType=mail_change";
        window.location.href = params;
      break;

      case "mail_change_end":
        params= "mail_change.xhtml?" + params;
        window.location.href = params;
      break;

      case "password_reminder":
        params="popup/password_reminder.xhtml?" + params;
        $.colorbox({href:params});
      break;
    }
  };
//FIM COLORBOX

$(document).ready(function() {
    loadOnReadyAndAjax();
    try 
    {
        if(typeof A4J != 'undefined'){
          A4J.AJAX.AddListener( { onafterajax: loadOnReadyAndAjax } );
        }
    } 
    catch (e) 
    {
    }
   ACEC.filter.init();
    //COLORBOX
    $(".htmlPop").colorbox({width:"650px", height:"650px"});
    $(".iframePop").colorbox({width:"650px", height:"560px", iframe:true});
    $("#showEsqueciSenha").colorbox({width:"650px", height:"350px", iframe:true});
    $("#showEsqueciEmail").colorbox({width:"650px", height:"300px", iframe:true});
    $(".schedulePop").colorbox({width:"650px", height:"940px", iframe:true});
    $("#showSearchNotFound").colorbox({width:"650px", height:"380px", iframe:true});
    $("#Recommend").colorbox({width:"650px", height:"420px", iframe:true});
    
    

    bindColorboxEvent();
});


function checkSubmitLink(event, linkId) {
  if (event.keyCode == 13) {
    $('a[id$=' + linkId + ']').click();
  }
}

function number(event) {
  var key = getKey(event);
  if (isPrintable(key)) {
    return /\d/.test(String.fromCharCode(key));
  }
  return true;
} 

function alphaNum(event){
  var c = String.fromCharCode(getKey(event));
  return /[^!-+:-@[-`{-~¹²³£¢¬¨§]/.test(c);  
}

function moneyFormat(event){
    var key = getKey(event);
    if (isPrintable(key)) {
      return /[(\d\,)$]/.test(String.fromCharCode(key));
    }
  }
  
function moneyValidate(field){
  v = field.value;
  v.match(/^\d+([,]\d{1,2})?$/) ? v=v : v="";
  field.value=v;
  return true;
}

function timeFormat(event){
  var key = getKey(event);
  if (isPrintable(key)) {
    return /[(\d\:)$]/.test(String.fromCharCode(key));
  }
}

function timeValidate(field){
  v=field.value;
  v=v.replace(/\D/g,""); 
  v=v.replace(/(\d)(\d{2}$)/,"$1:$2");
  field.value=v;
  return true;
}
function isPrintable(key) {
  return (key >= 32 && key < 127 || key >= 161);
}

function getKey(e) {
  return window.event ? window.event.keyCode
       : e            ? e.which
       :                0;
}

function showLoader(objId) {
  var obj = '#loader-' + objId;
  eval('$("' + obj + '").css("visibility", "")');
}

function hideLoader() {
  window.setTimeout('$(".JQajaxloader").css("visibility", "hidden");', 400);
}

function doLoadingPayment() {
  $(".endBuy").hide();
  $(".btnDisabled").show();
}
    
function doLoadingRegister(obj) {
  eval('$("' + obj + '").hide()');
}

function formatDate(field) {
  field.value = filterField(field);
  vr = field.value;
  size = vr.length;

  if ( size > 2 && size < 5 ) {
    field.value = vr.substr( 0, size - 2  ) + '/' + vr.substr( size - 2, size );
  }
  if ( size >= 5 && size <= 10 ) {
    field.value = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 ) + '/' + vr.substr( 4, 4 ); 
  }
}

function filterField(field) {
  var s = "";
  var cp = "";
  vr = field.value;
  for (i = 0; i < vr.length ; i++) {  
    if (vr.substring(i,i + 1) != "/" 
      && vr.substring(i,i + 1) != "-" 
      && vr.substring(i,i + 1) != "."  
      && vr.substring(i,i + 1) != "," ) {
      s = s + vr.substring(i,i + 1);
    }
  }
  field.value = s;
  return cp = field.value;
}

function checkSubmitLink(event, linkId) {
  if (event.keyCode == 13) {
    $('a[id$=' + linkId + ']').click();
  }
}

function zeroesCpfCnpj(field) {
  zeroes = "00000000000000";
  len = field.value.length;
  val = field.value;
  
  if (len>1 && len<11)
    val = zeroes.substring(0, 11 - len) + val;
  else if((len>11 && len<14))
    val = zeroes.substring(0, 14 - len) + val;
  
  field.value = val;
  return true;
}

function formatDocument(field) {
  v = field.value;
  v = v.replace(/\D/g,"");
  field.value = v;
  return true;
}

function acecRedirect(url) {
  if (url && url.length > 0) {
    window.location.href = url;
  }
}
function formatPhone(field){
  v=field.value;
  v=v.replace(/\D/g,""); 
  v=v.replace(/(\d)(\d{4}$)/,"$1-$2");
  field.value=v;
  return true;
}

function formatNineDigPhone(field){
  valueActual = field.value;
  valueActual = valueActual.replace(/\D/g,"");
  valueActual = valueActual.replace(/(\d{2,5})(\d{4}$)/,"$1-$2");
  field.value = valueActual;
  return true;
}

function readCustomerLoginreadCustomerLogin () {
  if (USER_DATA.customer){
    return USER_DATA.customer;
  } else {
    var store = $.cookie('st');
    if(store == null){
      store =utils._GET('st');
    }
    var dadosCookie = $.cookie('CUSTOMER_INFO' + (store != null ? store : ''));
    if (dadosCookie != null) {
      var indBegin= dadosCookie.indexOf('shortName');
      var indEnd = dadosCookie.indexOf('|');
      var customer = dadosCookie.substring(indBegin+10,indEnd);
      return customer;
    } 
    return null;
  }
}

function loginInfo() {
    var loginName = readCustomerLogin();
  
    if (loginName != null && loginName != "") {
        var domain = acecIndexInformation.cartDomainUrl ;
        var cartDomain = '';
  
        if( domain.indexOf('/ckout/addItems.xhtml')!= -1){
            cartDomain =  domain.replace('/ckout/addItems.xhtml','/sserv/');
        }
        else
        {
            cartDomain = domain.replace('ckout/','sserv/');
        }

        $("#login").children().not(".logged").hide();
        $("#login").append('<div class="logged" hidden> Olá, <a href="'+acecIndexInformation.sservDomainUrl+'"><span class="userName">' + loginName + '</span></a>, seja bem-vindo(a)! <span class="log-links"><a href="javascript:void(0)" class="logout">sair</a></span></div>');
        $(".logged").fadeIn(400);
    }  
    else {
        $(".logged").hide();
        $("#login").children().not(".logged").fadeIn();
    }
}
function logout() {
    
  if(acecIndexInformation.sservDomainUrl == null)
  {
  var domain = acecIndexInformation.cartDomainUrl ; 
  var domainURL = domain.replace('ckout/addItems.xhtml','sserv/');
  $.ajax({
    type: "GET",
    url: domainURL + 'LoginServlet?action=logout',
    cache: false,
    dataType: 'jsonp',
    async: false,
    success: function() {
      var store = $.cookie('st');
      var position = store.indexOf('_',0);
      
      if (position != null && position > 0) {
        store = store.substring(0, position);
      }
      
      var nomeCookie = ('CUSTOMER_INFO' + (store != null ? store : ''));
      $.cookie(nomeCookie, null,{domain:acecIndexInformation.cookieDomain});

      $(".logged").hide();
      $("#login").children().not(".logged").fadeIn();
      
      window.location.href = acecIndexInformation.catalogDomain;
    }
  });
  }else{
  $.ajax({
    type: "GET",
    url: acecIndexInformation.sservDomainUrl + 'LoginServlet?action=logout',
    cache: false,
    dataType: 'jsonp',
    async: false,
    success: function() {
    
      var store = $.cookie('st');
      var position = store.indexOf('_',0);
      
      if (position != null && position > 0) {
        store = store.substring(0, position);
      }
      
      var nomeCookie = ('CUSTOMER_INFO' + (store != null ? store : ''));
      $.cookie(nomeCookie, null,{domain:acecIndexInformation.cookieDomain});

      $(".logged").hide();
      $("#login").children().not(".logged").fadeIn();
      
      location.href = acecIndexInformation.catalogDomain;
    }
  });
  
  }
}

function backToTop(){
    $("BODY").append("<div hidden class='fixed back-top ico-back-top'> <p>Voltar ao topo.</p> </div>");

    $(window).scroll(function(){

        if($(this).scrollTop() >= $(".showCase").offset().top - 145)
        {
            if($(".back-top").is(":hidden"))
            {
                 $(".back-top").fadeIn(300);
            }
           
        }
        else
        {
            if($(".back-top").is(":visible"))
            {
                 $(".back-top").fadeOut(300);
            }
        }
    });
}

function closeBoxAndUpdate() {
    window.setTimeout("getUserData();", 500);
    window.setTimeout("cartInfo();", 1000);
    $.fn.colorbox.close();
}
