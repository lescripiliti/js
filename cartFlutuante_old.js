updateCartFlutuante();


function formatPriceValue(price){
	
	var strPrice = new String(price);
	var strValuePrice = strPrice.split(',');
	var strFormatValuePrice = '';

	if(strValuePrice[0].length > 3){
		for(var i = strValuePrice[0].length - 1 ; i >= 0 ; i--){	
		    if((strFormatValuePrice.length % 4) == 3){	
		        strFormatValuePrice = '.' + strFormatValuePrice;
		    } 
		    strFormatValuePrice = strValuePrice[0].charAt(i) + strFormatValuePrice;
		}
		strFormatValuePrice += ',' + strValuePrice[1];		
		return strFormatValuePrice;
	}else{
		return strFormatValuePrice  = strPrice;
	}	
		
}

function updateCartFlutuante() {
	
	
	if(typeof acecIndexInformation == "undefined"){
		/* ajuste temporário para podermos trabalhar em páginas onde não está sendo declarado a variável acecIndexInformation*/
		 window.STORE_ID = "GLOBE";
         window.acecIndexInformation = {
                sservDomainUrl: "https://cart.globe.dev.accurate.com.br/sserv/",
                cartDomainUrl:  "https://cart.globe.dev.accurate.com.br/ckout/addItems.xhtml".replace('/addItems.xhtml','/'),
                catalogDomain:  "http://www.globe.dev.accurate.com.br/",
                productZoomEnabled: '',
                userDataServlet: '', 
                cookieDomain: '.globe.dev.accurate.com.br',
                googleAnalyticsCode: '',
                gaPageName: $(location).attr('pathname')
         };
	}
	$.ajax
	({
		type: "GET",
		url: acecIndexInformation.cartDomainUrl + 'updateItems.xhtml',
		cache: false,
        dataType: 'jsonp',
        async: false,
		success: function(data){
			var $cart = $('#cartFlutuante');
			
			var $cheio = $('.carrinho-cheio');
			var $vazio = $('.carrinho-vazio');
			
			var $list = $cart.find('ul.productList');
			var $modelo_item = $list.children(':first').clone(true);
			var $total = $cart.find('.total .valor');
			
			var $cartLink = $('#cartLink .cartItems');
			
			var $temp_item;
			
			var qtde_total = 0;
						
			$list.html('');
			
			if (data && typeof data.status != 'undefined' && data.status == 'true' && data.shoppingCart != null && data.shoppingCart.shoppingCartLines.length > 0) {
				
				for (var i = 0; i < data.shoppingCart.shoppingCartLines.length; i++) {
					qtde_total += data.shoppingCart.shoppingCartLines[i].quantity;
					
					$temp_item = $modelo_item.clone(true);
					
					$temp_item.find('a').attr('href', data.shoppingCart.shoppingCartLines[i].productItem.urlProductHome).attr('title', data.shoppingCart.shoppingCartLines[i].productItem.name);
					
					if (typeof data.shoppingCart.shoppingCartLines[i].productItem.imagesURL != null && data.shoppingCart.shoppingCartLines[i].productItem.imagesURL[6] != undefined) {
						$temp_item.find('img').attr('src', data.shoppingCart.shoppingCartLines[i].productItem.imagesURL[6]).attr('alt', data.shoppingCart.shoppingCartLines[i].productItem.name);
					}
					else {
						$temp_item.find('img').attr('src', '');
					}
					
					$temp_item.find('.qtde').text('(' + data.shoppingCart.shoppingCartLines[i].quantity + ')');
					
					$temp_item.find('.name').text(data.shoppingCart.shoppingCartLines[i].productItem.name);
					
								
					$temp_item.find('.price').text('R$ ' + formatPriceValue(data.shoppingCart.shoppingCartLines[i].lineTotal.toFixed(2).toString().replace('.',',')));
					
					$list.append($temp_item);
					
				} delete i;
				
				
				$total.text('R$ ' + formatPriceValue(data.shoppingCart.total.toFixed(2).toString().replace('.', ',')));
				
				
				
				$cartLink.text('(' + qtde_total + ')');
				
				$vazio.hide();
				$cheio.show();
				
			} else {
				
				$vazio.show();
				$cheio.hide();
				
				$cartLink.text('(0)');
				
			}
			jQuery('#cartLink').on('click', this,function(){
				if($cart.css('display') == 'block'){
					$cart.hide();
				}else{
					$cart.show();
				}
			});
		}
	}); 


	if (typeof (0).toMoney == 'undefined') {
		Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
		{ 
		   var n = this,
		   c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
		   d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
		
		   /*
		   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
		   the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
		   rather than doing value === undefined.
		   */   
		   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
		
		   sign = (n < 0) ? '-' : '',
		
		   //extracting the absolute value of the integer part of the number and converting to string
		   i = parseInt(n = Math.abs(n).toFixed(c)) + '', 
		
		   j = ((j = i.length) > 3) ? j % 3 : 0; 
		   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
		}	
	}
}