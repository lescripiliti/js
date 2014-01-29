// Javascript criado para montar a paleta de cor ou tamanho na pagina de produto.
// OBS: Alterar somente a estrutura de html para outras lojas.

var variantOption = {
    OBJECT_SKUS: null,
    ARR_OBJ_VARIANT: new Array(),
    PREFIX_COLOR: 'cor',
    PREFIX_SIZE: 'tamanho',
	PREFIX_POSITION_SIZE: 'position_tamanho',
    ACTIVE_PALETTE_COLOR: 0,
    ACTIVE_PALETTE_SIZE: 0,
	MAIN_COLOR : ''
};

$(document).ready(function () {
    var skuMain = $("#skuMain").val();
    loadObject();
    loadPalette();
    loadPaletteColor();
    loadPaletteSize('');
	initPalette();
	changeSizeBtnPosition();
});

// Clica na primeira cor disponivel.
function initPalette() {

	if (variantOption.ACTIVE_PALETTE_COLOR == 1) {
		
		var foundColor = false;
		
		if (ACEC.object.current.chosenColor != '') {
			$('.color-available').each(function(i, item) {
				if ($(this).attr('title') == ACEC.object.current.chosenColor ) { 
					$('.skuSelected-'+skuMain).click(); 
					$(this).parent().parent().parent().parent().parent().attr('style', 'border: 1px solid #000');
					$(this).attr('data-selected-color', $('.color-available').first().attr('title'));
					foundColor = true 
				}
			});
			if (!foundColor) { $('.color-available').first().click(); }
		} else {
			
			$('.skuSelected-'+ $("#skuMain").val()).find("img").trigger("click"); 
			
								   
			$('.color-available').first().attr('data-selected-color', $('.color-available').first().attr('title'));
		}
	}
}

// Criacao do objeto para utilizados dos dados.
function objVariant(skuId, variantColor, variantUrl, variantSize, available) {
    this.skuId = skuId;
    this.variantColor = variantColor;
    this.variantUrl = variantUrl;
    this.variantSize = variantSize;
    this.available = available;
}

// Omit o box da paleta tamanho.
function hideElements() {

    $('.snippet_specs-title:last').hide();
    $('div.snippet_structure-info-product_specs-info').hide();
    $('.snippet_specs-size_link').hide();
}

// Mostra o box da paleta tamanho
function showElements() {

    $('.snippet_specs-title:last').show();
    $('div.snippet_structure-info-product_specs-info').show();
    $('.snippet_specs-size_link').show();
}

// Cria uma array com os skus que foram criados na pagina e cria um relacionamento
// das cores com os tamanhos.
function loadObject() {

    variantOption.OBJECT_SKUS = skusDados;
    
    if (variantOption.OBJECT_SKUS.skus.length == 1) {
    	$('.module_product-box .snippet_structure-info-product_specs').html('');
    	return false;
    }
    
    $('.module_product-box .snippet_structure-info-product_specs').removeAttr('style');

    $(variantOption.OBJECT_SKUS.skus).each(function (idx, elm) {
	
		var available = false;
		if($("#skuMain").val() == elm.id){
			variantOption.MAIN_COLOR = elm.COR;
		}
		// Verifica a disponibilidade do SKU.
		$(skusAvailable.items).each(function (idx_2, elm_2) {
		
			if (elm_2.id == elm.id)
				available = elm_2.available;
		});
		
        variantOption.ARR_OBJ_VARIANT[idx] = new objVariant(elm.id, elm[getPropertyName(elm, 1)], pathImage + elm[getPropertyName(elm, 1)].toLowerCase() + '.jpg', elm[getPropertyName(elm, 2)], available);
		
		available = false;
    });

    var script = '<script>\n var ARR_SIZES_FOR_COLOR = {\n "itens" :\n [ ';

    $(variantOption.ARR_OBJ_VARIANT).each(function (idx, elm) {
        
        script += '{ "skuId" : "'+ elm.skuId +'", "Cor" : "' + elm.variantColor + '", ';
        
        $(skusAvailable.items).each(function(idx_1, elm_1) {
        	
        	if (elm.skuId == elm_1.id) {
        		script += '"Available" : "' + elm_1.available + '", ';
        	}
        });

        script += '"Sizes" : [';

        $(variantOption.ARR_OBJ_VARIANT).each(function (idx_2, elm_2) {

            if (elm.variantColor == elm_2.variantColor) {

                script += '"' + elm_2.variantSize + '"';

                if (idx_2 < variantOption.ARR_OBJ_VARIANT.length - 1) {
                    script += ', ';
                }
            }
        });

        script += ']}';

        if (idx < variantOption.ARR_OBJ_VARIANT.length - 1) {
            script += '\n, ';
        }

    });

    script += ']};\n</script>';

    $(document).append(script);
}

// Verifica qual o nome correto da UDA, deve começar sempre com cor ou tamanho.
function getPropertyName(element, type) {

    for (var propertyName in element) {
        if (type == 1) {
            if (propertyName.toLowerCase().indexOf(variantOption.PREFIX_COLOR) == 0) {
                return propertyName;
            }
        } else if (type == 2) {
            if (propertyName.toLowerCase().indexOf(variantOption.PREFIX_SIZE) == 0) {
                return propertyName;
            }
        } else if (type == 3) {
			if (propertyName.toLowerCase().indexOf(variantOption.PREFIX_POSITION_SIZE) == 0) {
                return propertyName;
            }
		}
    }
}

// Verificar se temos a UDA cor ou tamanho e ativamos os objetos de cada paleta.
function loadPalette() {

    if (variantOption.ARR_OBJ_VARIANT.length > 1) {

        if (variantOption.ARR_OBJ_VARIANT[0].variantColor !== undefined) {
            variantOption.ACTIVE_PALETTE_COLOR = 1;
        }

        if (variantOption.ARR_OBJ_VARIANT[0].variantSize !== undefined) {
            variantOption.ACTIVE_PALETTE_SIZE = 1;
        }
    }
}

// Verifica se temos algum tamanho disponnível para a cor.
// Se todos os tamanhos estiverem indisponiveis, colocamos uma classe de css na cor, nao podera ser clicada.
function verifySizesOfColor(color) {

	var countAvailable = 0;
	
	$(variantOption.ARR_OBJ_VARIANT).each(function (idx, elm) {
		
		if (elm.variantColor == color && elm.available == "true") {
			countAvailable++;
		}
	});
	
	return countAvailable > 0;
}

// Monta a paleta cor, para outras lojas, altaerar somente a estrutura do html.
function loadPaletteColor() {

    if (variantOption.ACTIVE_PALETTE_COLOR == 1) {

        var htmlColors = '';
        var existColor = false;
		var classAvailable = '';
		var variantColorDummy ='';
		var sku = ''
		
        $(variantOption.ARR_OBJ_VARIANT).each(function (idx, elm) {
		
		variantColorDummy = replaceAccent(elm.variantColor);

            $('ul.snippet_structure-info-product_specs-info img').each(function (index, element) {

                if (elm.variantColor == $(element).attr('title')) {
                    existColor = true;
                }
            });
			
			// Verifica a disponibilidade da cor
			if (verifySizesOfColor(elm.variantColor)) {
			
				classAvailable = 'color-available';
			}

            if (!existColor) {
				if(elm.variantColor == variantOption.MAIN_COLOR){
					sku = $("#skuMain").val();
				} else {
					sku = elm.skuId;
				}
                htmlColors = '<li class=snippet_structure-info-product_specs_color-item>';
                htmlColors += '<a href="javascript:void(0);" class="snippet_structure-info-product_specs_color-item_link '+variantColorDummy.toLowerCase() +'  skuSelected-'+sku+'"     >';
                htmlColors += '<table><tr><td>';
                htmlColors += '<img class="palette-colors '+ classAvailable + '"  src="' + replaceBarLastUrlImages(elm.variantUrl) + '" style="width:22px;height:22px" sku="'+ sku +'" title="' +  elm.variantColor+ '" />';
				
				if (classAvailable == '') {
					htmlColors += '<span class="snippet_color-off"></span>'
				}
				
                htmlColors += '</td></tr></table>';
                htmlColors += '</a></li>';

                $('ul.snippet_structure-info-product_specs-info').append(htmlColors);
            }
			
			classAvailable = '';

            existColor = false;

        });

        if (variantOption.ACTIVE_PALETTE_SIZE == 1) {

            $('.palette-colors').bind('click', function () {

                loadPaletteSize($(this).attr('title'));
            });
        }
    } else {

        $('.snippet_specs-title:first').remove();
        $('ul.snippet_structure-info-product_specs-info').remove();
    }
}

//Monta a paleta tamanho, para outras lojas, altaerar somente a estrutura do html.
function loadPaletteSize(variantColor) {

    var htmlSize = '';
    var existSize = false;

    if (variantOption.ACTIVE_PALETTE_SIZE == 1 && variantOption.ACTIVE_PALETTE_COLOR == 0) {

        $(variantOption.ARR_OBJ_VARIANT).each(function (idx, elm) {

            $('ul.snippet_structure-info-product_specs_size a').each(function (index, element) {

                if (elm.variantSize == $(element).html()) {
                    existSize = true;
                }
            });

            if (!existSize) {

                htmlSize = setHtmlSize(elm, true);

                $('ul.snippet_structure-info-product_specs_size').append(htmlSize);

                showElements();
            }

            existSize = false;
        });

    } else if (variantOption.ACTIVE_PALETTE_SIZE == 1 && variantOption.ACTIVE_PALETTE_COLOR == 1 && variantColor != '') {

        createHtmlAllSize();

        verifyAvailableColorAndSize(variantColor);

		adjustmentLayout();

    } else if (variantOption.ACTIVE_PALETTE_SIZE == 0) {

        $('.snippet_specs-title:last').remove();
        $('div.snippet_structure-info-product_specs-info').remove();
        $('.snippet_specs-size_link').remove();
    }
}

// Verifica disponibilidade por SKU.
function getAvailableBySku(skuId) {
	
	var result = false;
	
	$(skusAvailable.items).each(function(idx, elm) {
		
		if (elm.id == skuId) {
			result = elm.available == "true" ? true : false;
		}
	});
	
	return result;
}

// Percorre o objeto json, e verifica a disponibilidade de cor e tamanho.
function verifyAvailableColorAndSize(variantColor) {

	$(variantOption.ARR_OBJ_VARIANT).each(function (idx, elm) {
	
		if (variantColor == elm.variantColor) {
		
			$('ul.snippet_structure-info-product_specs_size a').each(function (index, element) {
				
				if ($(element).attr('title') == elm.variantSize && getAvailableBySku(elm.skuId)) {
					
					$(element).parent().find('span').remove();
				}
			});
		}
	});
}

// Faz a correcao no tamanho do span (X), para sku indisponivel, usa o mesmo tamanho da li.
function adjustmentLayout() {

	$('.snippet_structure-info-product_specs_size span').each(function(idx, elm) {

		var li = $(this).parent();
		$(this).css('height', $(li).height() + 4);
		$(this).css('width', $(li).width() + 3);
		$(this).parent().toggleClass('unavailable');
	});
}

// Cria o html com todos os tamanhos de todas as cores.
function createHtmlAllSize() {

	var existSize = false;

	$('ul.snippet_structure-info-product_specs_size').html('');

	$(variantOption.ARR_OBJ_VARIANT).each(function (idx, elm) {

		$('ul.snippet_structure-info-product_specs_size a').each(function (index, element) {

			if (elm.variantSize == $(element).html()) {
				existSize = true;
			}
		});

		if (!existSize) {

			htmlSize = '<li class="snippet_structure-info-product_specs_size-item">';
			htmlSize += '<a href="javascript:void(0)" class="snippet_structure-info-product_specs_size-item_link "  title="' + elm.variantSize + '" sku="'+elm.skuId+'" >';
			htmlSize += elm.variantSize;
			htmlSize += '</a><span class="snippet_size-off" style="cursor:not-allowed;"></span></li>';
			$('ul.snippet_structure-info-product_specs_size').append(htmlSize);

			showElements();
		}

		existSize = false;
	});
}

// Encontra o botão de medidas (que é adicionado fora do componente) e o adiciona ao lado das medidas
function changeSizeBtnPosition(){
	var tableBtn = $("#measureTableBtn");
	$("#measureTableBtn").remove();
	$(".snippet_structure-info-product_specs").append(tableBtn);
	
    var widthTabela = $('#product-mesure-table-id img.tabela-medidas').width();
    var heightTabela = $('#product-mesure-table-id img.tabela-medidas').height();

    $(".popTabela").colorbox({width:widthTabela, height:heightTabela, inline:true, className:"tabelaMedidas"});
}


//Substitui acentos por sem.
 function replaceAccent(word) {
 
		var strToReplace = word.replace(' ','-');
		var  accent= 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
		var wAccent = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
		var newStr='';
		
	for (var i = 0; i < strToReplace.length; i++) {
		if (accent.indexOf(strToReplace.charAt(i)) != -1) {
				newStr+=wAccent.substr(accent.search(strToReplace.substr(i,1)),1);
		} else {
			newStr+=strToReplace.substr(i,1);
		}
	}
	return replaceSpecialCharacters(newStr);
}
  
  //Substitui caractes especiais por traço (-)
 function replaceSpecialCharacters(strToReplace) {
	return strToReplace.replace(/[()\/|&_+]/g,'-');
}


// ex: http://i-globe.a8e.net.br/static/images/carvão/cinza.jpg to
//     http://i-globe.a8e.net.br/static/images/carvao-cinza.jpg 
 function replaceBarLastUrlImages(strToReplace) {


  console.log('strToReplace: '+strToReplace);
 	var urlArray = strToReplace.split('/');
 	var penultimate = urlArray[urlArray.length-2];
 	var ultimate =  urlArray[urlArray.length-1];
    var imagesUrl =''; 
    var newUrl='';


 

 	if(penultimate!='images'){
 		 imagesUrl = penultimate+'/'+ultimate;
 		 newUrl =  replaceAll(' ', '-', strToReplace).replace(' ','-').replace(imagesUrl,replaceAccent(imagesUrl))
 	}else{
 	  newUrl = replaceAll(' ', '-', strToReplace).replace(ultimate,replaceAccent(ultimate))
	}


 	return newUrl;
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
} 