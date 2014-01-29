$(document).ready(function() {
  arrangeDeliveryAddressBoxes();
  freightFlagEnabled();
});


function uncheckRadioFreight(){
	$("input:radio").removeAttr("checked");
}

function arrangeDeliveryAddressBoxes() {
  
  var totaLI = $("ul.deliveryList").find("li div.deliveryAddress");
  var maior = 0; 
  
  for (var i =0; i < totaLI.length; i++) {
    if (maior < $(totaLI[i]).height()) {
      maior = $(totaLI[i]).height();  
    }
  }
  $("ul.deliveryList").find("li div.deliveryAddress").css('height',maior+'px');
}

function freightFlagEnabled() {
	if($('#multiple-freight-enabled').length > 0){
		$('#listCorreiosFreightTable .correiosFreight').removeAttr('checked');
		var freightHeight = $('#listCorreiosFreightTable').height();
		$('#multiple-freight-value-selected').height(freightHeight);
	}
}
var CKOUT = {
	functions : {
		/**
		* @params 
		* frete: valor do frete
		* subtotal: valor do subtotal
		* discount: valor do desconto
		* totalPlace: local onde o resultado será exibido
		*/
		getTotal : function(frete, subtotal, discount, totalPlace){
			var value = 0;
			if(frete > 0){
				 value = frete + (subtotal - discount);
			}else{
				value = subtotal - discount;
			}
			var total = CKOUT.functions.formatCurrency(value);
			if(totalPlace != null){
				$(totalPlace).html(total);
			} else {
				return total;
			}
		},
		/**
		* @params value: valor a ser convertido
		*/
		formatCurrency : function(value){
			if(value > -1){
				value = CKOUT.functions.numberFormat(value,2,',','$1.$2');
				value = CKOUT.constants.currency + ' ' + value;
			}
			return value;
		},
		/**
		*    Uso:     numberFormat(123456,789, 2, ',', '$1.$2');
		*    Resultado:    123,456.79
		**/
		numberFormat : function(number, decimals, dec_point, thousands_sep) {
			number = (number + '').replace(/[^0-9+-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
				sep = (typeof thousands_sep === 'undefined') ? '$1.$2' : thousands_sep,
				dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
				s = '',
				toFixedFix = function (n, prec) {
					var k = Math.pow(10, prec);
					return '' + Math.round(n * k) / k;
				};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			if (s[0].length > 3) {
				s[0] = s[0].replace(/([0-9]+?)([0-9]{3})(?=.*?\.|$)/mg, sep);
			}
			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
		},

		/**
		* @params 
		* fadeInEffect: elemento a ser exibido com efeito fade
		* fadeOutEffect: elemento a ser ocultado com efeito fade
		*/
		setNewAddressBtn: function(fadeInEffect, fadeOutEffect) {
			fadeInEffect.fadeIn();
			fadeOutEffect.fadeOut();
		},
		/**
		* @params 
		* element: elemento a ser inserido
		* local: onde o elemento será inserido
		*/
		insertContent : function(element, local) {
			$(local).html(element);
		},
		arrangeDeliveryAddressBoxes : function() {
			var totaLI = $("ul.deliveryList").find("li div.deliveryAddress");
			var maior = 0; 

			for (var i =0; i < totaLI.length; i++) {
				if (maior < $(totaLI[i]).height()) {
					maior = $(totaLI[i]).height();  
				}
			}
			$("ul.deliveryList").find("li div.deliveryAddress").css('height',maior + 'px');
		},
		/**
		* @params 
		* element: elemento a ser mostrado ou exibido
		* option: opição de exibir ou ocultar o elemento
		*/
		showAndHide: function(element, option) {
			if(option == "show") {
				element.show();
			} else {
				element.hide();
			}
		}
	},
	constants : {
		/** contante para BRL**/
		currency: 'R$'
	}
};

$(document).ready(function(){

	setInterval(function(){
		if( $(".textCep1").val() != "" &&  $(".textCep1").val().length > 4 || $(".textCep2").val() != "" &&  $(".textCep2").val().length > 2)
		{
			$(".newAddress").show(function(){
				//$(".inputNumber").focus();
			});
		}
	},500);

});