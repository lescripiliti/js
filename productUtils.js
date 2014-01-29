function showMessage() {
	window.setTimeout('$.colorbox({width:"310px", height:"100px", inline:true, href:"#showMessage", open:true, title: "Aten&ccedil;&atilde;o", onClosed:function(){$("#listaErrosLightBox").html("")}});',1);
} 

/* Insere o skuId do produto no input e retorna se deu sucesso ou erro nesse processo */
function setSkuIdProduct() {
	var ret = true;
	// verifica se as propriedades do produto foram corretamente selecionadas
	if (verifySelectedProperties()) {
		var skuId = findSkuIdProduct();
			if (skuId != null) {
			$('input[name=skus]').val(skuId);
			$('input[name=addsku]').val('{' + skuId + ',,}');
		} else {
			ret = false;
		}
	} else {
		ret = false;
	}
	return ret;
}
      
/* Verifica se as propriedades do produto (cor e/ou tamanho) foram selecionados */
function verifySelectedProperties() {
  var ret = true;
  var colorSelectedElement = null;
  var sizeSelectedElement = null;

  colorSelectedElement = $('.palette-colors[data-selected-color]');
  if (hasColorPalette()) {
    if (colorSelectedElement.size() == 0) {
      $('#showMessageItem').html('Selecione a cor');
      showMessage();
      ret = false;
    }
  }
  
  hasUniqueSize(colorSelectedElement.attr('title'));
  sizeSelectedElement = $('.snippet_structure-info-product_specs_size-item_link[data-selected-size]');
  if (hasSizeChoice()) {
    if (sizeSelectedElement.size() == 0) {
      $('#showMessageItem').html('Selecione o tamanho');
      showMessage();
      ret = false;
    }   
  }
  return ret;
}

/* Retorna o skuId do produto de cor e/ou tamanho selecionado(s) */
function findSkuIdProduct() {
  var colorSelectedElement = $('.palette-colors[data-selected-color]');
  var sizeSelectedElement = $('.snippet_structure-info-product_specs_size-item_link[data-selected-size]');
  var color = null;
  var size = null;
       
  if (colorSelectedElement.size() > 0) {
    // acha qual o elemento de cor foi selecionado
    color = colorSelectedElement.attr('data-selected-color');
  }

  if (sizeSelectedElement.size() > 0) {
    // acha qual foi o elemento de tamanho selecionado
    size = sizeSelectedElement.attr('data-selected-size');
  }

  if (color != null || size != null) {
    var skuId = null;
           
    $(skusDados.skus).each(function(i,e) { 
      // As seguintes condicionais verificam a tres possibilidades possiveis:
      // 1. escolha de cor e tamanho
      // 2. escolha somente de cor
      // 3. escolha somente de tamanho
      if (color != null && size != null) { 
        // cor e tamanho
        if (color == e[getPropertyName(e, 1)] && size == e[getPropertyName(e, 2)]) {
          // encontrou o skuId correspondente
          skuId = e.id;
          return false;
        }
      } else if (color != null) { 
      // somente cor
        if (color == e[getPropertyName(e, 1)]) {
          skuId = e.id;
          return false;
        }
      } else if (size != null) { 
        // somente tamanho
        if (size == e[getPropertyName(e, 2)]) {
          skutId = e.id;
          return false;
        }
      }
    });
    return skuId;
  } else {
  // as propriedades do produto nao foram selecionadas
    return null;
  }
}

// verifica a presenca de paleta de cor no site
function hasColorPalette() {
  if ($('.palette-colors').size() > 0) {
    return true;
  } else {
    return false;
  }
}
      
// verifica a presenca de escolha de tamanhos do produto no site
function hasSizeChoice() {
  if ($('.snippet_structure-info-product_specs_size-item_link').size() > 0) {
    return true;
  } else {
    return false;
  }
}

// verifica se o produto tem tamanho unico
function hasUniqueSize(color){
    var cont_size = 0;
    var size = null;
    $(skusDados.skus).each(function(i,e) {
        if(e.COR == color){
            cont_size = cont_size + 1;
            size = e.TAMANHO;
        }
    });
    
    if(cont_size == 1){
        $('.snippet_structure-info-product_specs_size-item_link').each(function(){
            var sizeElement = $(this);
            if(sizeElement.attr('title') == size){
				$(this).trigger('click');
            }
        });
    }
}

$(document).ready(function() {
  $('.snippet_structure-info-product_specs_size-item_link').live('click', function() {
    var sizeElement = $(this);
    // $(this).attr('style', 'color: #000; border: 1px solid #333; background: #C3C3C3;');
    $('.snippet_structure-info-product_specs_size-item_link').removeClass("active");
    $(this).addClass("active");
    // limpa os elementos anteriores
    $('.snippet_structure-info-product_specs_size-item_link').each(function() {
      $(this).removeAttr('data-selected-size');
      //$(this).attr('style', 'color: #000');
    });
    // marca o elemento como selecionado
    sizeElement.attr('data-selected-size', sizeElement.attr('title'));

    //changeProductImages(sizeElement.attr('sku'));
    setSkuCrosselling(findSkuIdProduct(), '${param.itemId}');
  });
          
  $('.palette-colors:not(.active-color)').live('click', function() {
    var colorElement = $(this);
    var skuID = colorElement.attr('sku');

    //$(".snippet_structure-carousel-product_item.foto a").eq(1).click();
    //$(".snippet_structure-carousel-product_item.foto a").eq(0).click();
    //console.log("#images-videos-carousel-"+skuID);

    // limpa os elementos anteriores
    $('.palette-colors').each(function() {
      $(this).removeAttr('data-selected-color');
      $(this).parent().parent().parent().parent().parent().removeAttr('style');
    });
           
    $(this).parent().parent().parent().parent().parent().attr('style', 'border: 1px solid #000');

    // marca o elemento como selecionado
    colorElement.attr('data-selected-color', colorElement.attr('title'));
    restartZoom( $(".jqzoom") );
    changeProductImage( skuID );

    if(hasSizeChoice() && $('.snippet_structure-info-product_specs_size-item_link[data-selected-size]').size() > 0) {
      setSkuCrosselling(findSkuIdProduct(), '${param.itemId}');
    }
           
    var isChangeImageProduct = false;
    $(ARR_SIZES_FOR_COLOR.itens).each( function(idx, elm) {
      if (elm[getPropertyName(elm, 1)] == colorElement.attr('title') && isChangeImageProduct == false) {
        changeProductImages(colorElement.attr('sku'));
        isChangeImageProduct = true;
      }
    });
  });

  $('#buyButton').live('click', function(e) {
    if (hasColorPalette() || hasSizeChoice()) { // existem escolhas de propriedades
      if (!setSkuIdProduct()) {
          e.preventDefault();
      }
    }
  });
});

function validateVariantAdd(popup){

  if (hasColorPalette() || hasSizeChoice()) { 
    if (!setSkuIdProduct()) {
      e.preventDefault();
    }
  }
  selectAddSku = $("input[name='addsku']").attr("value");
  if (selectAddSku == "") {
    $("#listaErrosLightBox").append(" &lt;li&gt;Selecione um produto!&lt;/li&gt;");
    showErrorColorBox();
    return false;
  } else {
    $("input[name='addsku']").attr("value",selectAddSku);
    var sku = findSkuIdProduct();
    ckoutRestServices.addItem(
    sku,
    checkQtd(),
    '',
		function(jsonData){
      if(jsonData.messages.length > 0){
        var message = jsonData.messages[0].summary;
        $("#listaErrosLightBox").append(message);
        showErrorColorBox();
      } else {
		    FLOATING_CART.functions.showItems();
        if(popup){
          processJSON(jsonData);
        } else {
          window.location.replace(acecIndexInformation.cartDomainUrl);
        }
		  }
    });
  }
}

function changeProductImage(skuId){

    var fadeOptions = {
        duration: 300,
        specialEase: "easeInOutSine"
    }

    //Esconde todas as listas de thumb e o box da imagem grande
    $(".viewBox").hide();
    $(".thumbs").css({ opacity: 0 });
    $(".viewBoxThumbs .bx-wrapper").removeClass("activated").css({ opacity: 0 });

    //Mostra o box da imagem grande
    $("#boxFoto_sku" + skuId).fadeIn(fadeOptions);

    $("#images-videos-carousel-"+skuId).animate({
        opacity: 1
    },300);

    $(" #images-videos-carousel-" + skuId).parents(".bx-wrapper").addClass("activated").animate({
        opacity: 1
    },300);
}

$(window).load(function(){
  $('.skuSelected-'+ $("#skuMain").val()).find("img").trigger("click"); 
});
