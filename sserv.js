$(document).ready(function() {
  arrangeDeliveryAddressBoxes();
  showRestitution();
});

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

function showRestitution() {
  $("input.radioRest").bind("click", function(ev){
    if (!$("li.restitution").hasClass("block")){
      $("li.restitution").addClass("block");
    }
	$("input.radioTroca").click(acao);	 // opcao Vale-Troca
	$("input.radioProd").click(acao);	// opcao Produto
  });
}
function acao() {
	$("li.restitution").removeClass("block");
}