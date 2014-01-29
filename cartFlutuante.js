/**
* cartFlutuante
* 
* Dependencies:
* - jQuery 1.3.2 (or newer)
* - CkoutRestServices.js
*
* Author: Alex Guerra
**/
var FLOATING_CART = {
	initialized : false,
	variable : {
		full : '',
		empty : '',
		list : '',
		total : '',
		cartLink : '',
		withParenthesis : true,
		model : ''
	},
    onShow: function() {},
    onHide: function() {},
	/**
	*	@params full: div exibida se carrinho cheio, empty: div exibida se carrinho vazio, 
	*	@params total: div onde sera exibido o total, cartLink: div onde sera exibida a qtd total
	*	@params withParenthesis: exibe quantidade com parenteses.
	**/
	init  : function(full, empty, list, total, cartLink, withParenthesis){
		if(!FLOATING_CART.initialized){
			FLOATING_CART.variable.full = full;
			FLOATING_CART.variable.empty = empty;
			FLOATING_CART.variable.list = list;
			FLOATING_CART.variable.total = total;
			FLOATING_CART.variable.cartLink = cartLink;

			FLOATING_CART.variable.withParenthesis = withParenthesis;
			$(document).ajaxStart(function() {
				$('img#loadingCart').show();
			});
			$(document).ajaxComplete(function() {
				$('img#loadingCart').hide();
			});
			FLOATING_CART.functions.getTotalItemsCart(cartLink);
			FLOATING_CART.initialized = true;
		}
	},
	functions : {
		/** Mostrar items no cart flutuante**/
		showItems : function(){
			ckoutRestServices.getShoppingCart(function(data){
				var modelo_item = '';
				if(FLOATING_CART.variable.model == ''){
					modelo_item = FLOATING_CART.variable.list.children(':first').clone(true);
					FLOATING_CART.variable.model = modelo_item;
				}else{
					modelo_item = FLOATING_CART.variable.model;
				}
				var temp_item;
				var qtde_total = 0;	
				FLOATING_CART.variable.list.html('');
				if (data && typeof data.status != 'undefined' && data.status == 'true' && data.shoppingCart != null && data.shoppingCart.shoppingCartLines.length > 0) {
					$(data.shoppingCart.shoppingCartLines).each(function(i, scl){
						qtde_total += scl.quantity;
						temp_item = modelo_item.clone(true);
						temp_item.find('a').attr('sku-data',scl.productItem.sku).attr('href', scl.productItem.urlProductHome).attr('title', scl.productItem.name);
						temp_item.find('.excludeProduct').attr('id', scl.productItem.sku);
						if (typeof scl.productItem.imagesURL != null && scl.productItem.imagesURL[6] != undefined) {
							temp_item.find('img').attr('src', scl.productItem.imagesURL[6]).attr('alt', scl.productItem.name);
						} else {
							temp_item.find('img').attr('src', '');
						}
						if(FLOATING_CART.variable.withParenthesis){
							temp_item.find('.qtde').text(scl.quantity);
						}else{
							temp_item.find('.qtde').text(scl.quantity);
						}
						temp_item.find('.name').text(scl.productItem.name);
						temp_item.find('.price').text(FLOATING_CART.constants.currency + FLOATING_CART.functions.formatPriceValue(scl.lineTotal.toFixed(2).toString().replace('.',',')));
						FLOATING_CART.variable.list.append(temp_item);
					}); 
					FLOATING_CART.variable.total.text(FLOATING_CART.constants.currency + FLOATING_CART.functions.formatPriceValue(data.shoppingCart.total.toFixed(2).toString().replace('.', ',')));
					if(qtde_total > 0){
						if(FLOATING_CART.variable.withParenthesis){
							FLOATING_CART.variable.cartLink.text(qtde_total);
						}else{
							FLOATING_CART.variable.cartLink.text(qtde_total);
						}
						FLOATING_CART.variable.cartLink.show();
					}else{
						FLOATING_CART.variable.cartLink.hide();
					}
					FLOATING_CART.variable.empty.hide();
					FLOATING_CART.variable.full.show(FLOATING_CART.onShow);
				} else {
					FLOATING_CART.variable.cartLink.hide();	
					FLOATING_CART.variable.empty.show(FLOATING_CART.onShow);
					FLOATING_CART.variable.full.hide(FLOATING_CART.onHide);
					
				}
			});
		},
		removeItem : function(skuId){
			ckoutRestServices.removeItem(skuId,function(jsonData){
				FLOATING_CART.functions.showItems();
			});
		},
		formatPriceValue : function(price){
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
		},
		getTotalItemsCart : function(totalQttPlace){
			var qtde_total = 0;
			$(document.cookie.split(';'))
				.each(function(index, value) {
				if (value.split('=')[0].indexOf('CART_INFO') > -1) {
					$($.cookie($.trim(value.split('=')[0]))
						.split('|'))
						.each(function(i, v) {
						if (v.indexOf('qtTotal') > -1) {
							var arr = v.split('=');
							if (arr.length > 1) {
								qtde_total = arr[1];
							}
						}
					});
				}
			});
			var $cartLink = totalQttPlace;
			if($cartLink != null){
				if(qtde_total > 0){
					if(FLOATING_CART.variable.withParenthesis){
						$cartLink.text(qtde_total);
					}else{
						$cartLink.text(qtde_total);
					}
					FLOATING_CART.variable.cartLink.show();
				}else{
					FLOATING_CART.variable.cartLink.hide({
                            done: FLOATING_CART.onHide()
                        });
				}
			}else{
				return qtde_total;
			}
		}
	},
	constants : {
		currency : 'R$'
	}	
};
