$(document).ready(function() {
  
  getUserData();
  initHeaderFixed();
 
});


var USER_DATA = {};
function getUserData(){
	loginInfo();
  // se estiver no catalogo, chama via ajax, ja que os cookies do cart nao podem ser lidos
  if (window.location.hostname.substr(0, 3) == "www") {
    var ckoutURL = getUserDataServletURL();
    callUserDataServlet(ckoutURL, "callbackCkout");
  }else{
    cartInfo();
  }
}
/*
var USER_DATA = {};
function getUserData(){
  cartInfo();
}*/

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

function _GET(name)
{
  var url   = window.location.search.replace("?", "");
  var itens = url.split("&");

  for(n in itens)
  {
    if( itens[n].match(name) )
    {
      return decodeURIComponent(itens[n].replace(name+"=", ""));
    }
  }
  return null;
}

function cartInfo() {
  var store = $.cookie('st');
  if(store == null){
    store =_GET('st');
  }
  var cookieName = 'CART_INFO' + (store != null ? store : '');
  var qtt = readCookieCartQtd();
  var totalValue = readCookieCartTotalValue();
  
  if (!window.emptyCartMessage) {
    window.emptyCartMessage = $(".cartMsgs").html(); 
    window.emptyCartNumber = $(".cartItems").html();
  }
  
  if (qtt == 0) {
    $(".cartMsgs").html(window.emptyCartMessage);
    $(".cartItems").html(window.emptyCartNumber);
  } else if (qtt == 1) {
      $(".cartMsgs").html(qtt + " item na Nécessaire");
      $(".cartItems").html("fechar compra");      
  } else if (qtt > 1) {
      $(".cartMsgs").html(qtt + " itens na Nécessaire");
      $(".cartItems").html("fechar compra");      
  }
  
  if (qtt > 0) {
      $('.cartItems').attr('style', 'cursor: pointer');
      $('.cartItems').bind('click', function() {
         location.href =  acecIndexInformation.cartDomainUrl;
      });
  }

}

function readCustomerLogin () {
  if (USER_DATA.customer){
    return utf8_decode(USER_DATA.customer);
  } else {
    var store = $.cookie('st');
    if(store == null){
      store =_GET('st');
    }
    var dadosCookie = $.cookie('CUSTOMER_INFO' + (store != null ? store : ''));
    if (dadosCookie != null) {
      var indBegin= dadosCookie.indexOf('shortName');
      var indEnd = dadosCookie.indexOf('|');
      var customer = dadosCookie.substring(indBegin+10,indEnd);
      return utf8_decode(customer);
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
	}else{
	   cartDomain = domain.replace('ckout/','sserv/');
	}
	$(".logged .log").html('Olá, <span class="userName">' + loginName + '</span>, seja bem-vindo! <span class="log-links"><a href="javascript:void(0)" onclick="logout();">sair</a></span>');
    
    $(".login").hide();
    $(".logged").show();

  } else {
      $(".login").show();
      $(".logged").hide();
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

			$(".login").show();
			$(".logged").hide();
			
			location.href = acecIndexInformation.catalogDomain;
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

			$(".login").show();
			$(".logged").hide();
			
			location.href = acecIndexInformation.catalogDomain;
		}
	});
	
	}
}
function readCookieCartTotalValue() {
  if (USER_DATA.total) {
    return USER_DATA.total;
  } else {
    var store = $.cookie('st');
    if(store == null){
      store =_GET('st');
    }
//    var cookie = $.getCookie('CART_INFO' + (store != null ? store : ''));
//    if (cookie && cookie[0]) {
//        return cookie[0].get('vlTotal');
//    }
    return '0';
  }
}

function readCookieCartQtd() {
  if (USER_DATA.qt) {
    return USER_DATA.qt;
  } else {
    var store = $.cookie('st');
    if(store == null){
      store =_GET('st');
    }
//    var cookie = $.getCookie('CART_INFO' + (store != null ? store : ''));
//    if (cookie && cookie[0]) {
//      return cookie[0].get('qtTotal');
//    }
    return '0';
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


function checkRecNull(cko) {
  if (cko == null) {
    return false;
  } else {
    if ( isEmpty(cko.id) || isEmpty(cko.desc) ) {
      return false;
    } else {
      return true;
    }
  }
}

function urlImage(imageURL) {
  return imageURL;
  if (imageURL) {
    var parsedURL = parseURL(imageURL);
    // se pagina nao estiver em https OU se a imagem ja estiver em https, entao sai
    if (parent.location.protocol == 'http:' || parsedURL.protocol == "https://") {
      return imageURL;
    }
    var iefix = $.browser.msie ? "/" : "";
    //incluir constante que indique a loja
    //imageURL = 'caminho/carrinho' + iefix + parsedURL.pathname + parsedURL.search;
    return imageURL;
  }
}

function parseURL(url) {
  var a = document.createElement("a");
  a.href = url;
  return a;
}

function isEmpty(inputStr) { 
  if ( null == inputStr || "" == inputStr ) { 
    return true; 
  } 
  return false; 
}

function formatNumber(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g,'');
  
  if(isNaN(num))
    num = "0";
  
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num*100+0.50000000001);
  cents = num%100;
  num = Math.floor(num/100).toString();
  
  if(cents<10)
    cents = "0" + cents;

  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3)) + '.' + num.substring(num.length-(4*i+3));
  
  return (((sign)?'':'-') + 'R$ ' + num + ',' + cents);
}

function initHeaderFixed(){
    $(window).bind("scroll", function(event){
        event.stopPropagation();
        if($(document).scrollTop() > 52){
			$('.header').addClass('fixedHeader');
            $('.container').css('padding-top','150px');
        }else{
            $('.container').removeAttr('style');
			$('.header').removeClass('fixedHeader');
        }
    });
}

function utf8_decode(t){  
  	var r = /\\u([\d\w]{4})/gi;
	t = t.replace(r, function (match, grp) {
		return String.fromCharCode(parseInt(grp, 16)); } );
	t = unescape(t);
	return t;
}