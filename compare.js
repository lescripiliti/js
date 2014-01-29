$(document).ready(function(){
	scrollCompareStart();
	buyItem();
	hideRemoveButton();
});

function scrollCompareStart(){
	$("a.remove").click(function(evt) {
		var item = parseInt($(this).attr("rel"));
		// Esconde nome do produto
		$("#nameProducts li:eq("+ item +")").hide();
		// Esconde img do produto
		$("#thumbProd .images:eq("+ item +")").hide();
		item = item+2;
		// Esconde coluna do produto
		$("#compareTable td:nth-child("+ item +")").hide();
		hideRemoveButton();
		evt.stopImmediatePropagation();
	});
}

function hideRemoveButton(){
  if ($("a.remove:visible").size() <= 2){
    $("a.remove").hide();
  }
}

function buyItem(){
  $(".btnStandard.maisDetalhes").each(function() {
    $(this).bind("click",function(){
      var prodId = $(this).attr("data-product");
      var hasWarranty = $(this).attr("data-warranty");
      var urlCart = $("#ckoutUrl").val();
      var urlWarranty = $("#warrUrl").val();
      var url;
      var skuId = null;
    
      if( $("[name=product_"+ prodId+"]").size() > 0){
        skuId = $("[name=product_" + prodId + "]:checked").val();
      }else{
    skuId = $("#prod_sku_" + prodId ).val();
    }
    if(skuId !=null){
    if (hasWarranty == "true"){
      url = urlWarranty;
      }else{
            url = urlCart;
      }
        url += '?skus=' + skuId;
        url += '&addsku={' + skuId + ',1,}';
        window.location = url;
    }else{
          $("#listaErrosLightBox").append("<li>Selecione um produto!</li>");
          showErrorColorBox();
    }
    });
  });
}