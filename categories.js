//INICIO TRECHO DE CODIGO INCORPORADO A PEDIDO A ACCURATE - LEONARDO - CFC - 127
jQuery(window).load(function() {
    var arr = jQuery('#udaFilters').attr('value');
    var mfilter = jQuery('#mFilter').attr('value');
    if ((mfilter == null || mfilter.length == 0) && arr != null && arr != undefined){
        arr = arr.toString().split('|');
        try {
            var lastList = null;
            var count = null;
            jQuery.each(arr, function() {
                var obj = this;
                var lista = jQuery("input[value='" + obj + "']").parents().filter('.dropOpt').attr('id').toString();
                jQuery("[lst='" + lista + "']").trigger('click');
                jQuery("input[value='" + obj + "']").trigger('click');
                lastList = lista;
                count++;
            });
            if(count > 1) { jQuery("[lst='" + lastList + "']").trigger('click');}
        } catch(Error){}
    }
    if(mfilter != null) {
        jQuery('#mFilter').attr('value',null);
        jQuery('#udaFilters').attr('value',null);
    }

    categoriesStart();
    hasSearchNotFound();
});
//FIM TRECHO DE CODIGO INCORPORADO A PEDIDO A ACCURATE - LEONARDO - CFC - 127

var arrListasAssociadas = new Array();
var arrGrupos = new Array();

function categoriesStart() {

    // Modo LINK para ordenacao dos produto
    $("[name=sort-results-by]").change(function () {
        window.location.href=$(this).val();
    })

    $("[name=sort-results-link]").click(function () {
        window.location.href=$(this).attr('value');
    }) 

    $("[name=sort-results-by] option[value$=]").change(function () {
    })

    // Reseta itens marcados
    $(".checkItem").each(function() {
        $(this).attr('checked', false);
    });

    // Diferencia as UDAs de cor e tamanho das demais, aplicando classe css na UL agrupadora
    var udaFilter = $('.component-uda a[data-uda-source]');
    var udaLength = $(udaFilter).length;
    var udaColorFilter = /cor-/;
    var udaSizeFilter = /tamanho-/;
    var udaPriceFilter = /faixa-/;
    for (i=0;i<udaLength;i++){
        var udaCurrent = udaFilter.eq(i).attr('data-uda-source');
        if(udaCurrent.match(udaColorFilter) == "cor-"){
            udaFilter.eq(i).parent().parent().addClass("udaCor");
        };
        if(udaCurrent.match(udaSizeFilter) == "tamanho-"){
            udaFilter.eq(i).parent().parent().addClass("udaTamanho");
        };
        if(udaCurrent.match(udaPriceFilter) == "faixa-"){
            udaFilter.eq(i).parent().parent().addClass("udaPreco");
        };
    }
    $(window).load(function(){
        if('.component-uda .udaTamanho a.link.selected'){
            $('.component-uda .udaTamanho').find('a.link.selected').parent().find('.checkItem').toggleClass('selected');
        }
    });
    
    
   $('body').bind("click",function () {
        for (var i = 0; i < arrGrupos.length; i++) {
            $("#" + arrGrupos[i]).removeClass("on");
            $("#" + arrGrupos[i]).parent().removeClass("on");
        }
        for (var i = 0; i < arrListasAssociadas.length; i++) {
            $("#" + arrListasAssociadas[i]).css("display", "none");
        }
   });

    // Clique nas categorias
    $(".grupo").each(function (index) {
        if ($($(".grupo")[index]).attr("lst") != undefined) {
            if (arrListasAssociadas == null) { arrListasAssociadas = new Array();}

            if (arrGrupos == null) { arrGrupos = new Array();}

            arrListasAssociadas.push($($(".grupo")[index]).attr("lst"));
            arrGrupos.push($($(".grupo")[index]).attr("id"));

            //Adicionando os labels na div de combos selecinados.
            if ($(".comboSelecionados").size() > 0) {
                $(".comboSelecionados").append("<span class='sele' id='lbl" + $($(".grupo")[index]).attr("id") + "' style='display:none'>" + $($(".grupo")[index]).html() + "</span>");
            }

            //bind click
            $($(".grupo")[index]).bind("click",function (event) { Categorie_Click(event);});
        }
    });

    // Adiciona/Remove Marca
    $(".checkItem").bind("click",function (event) {
        var secao = getGroup($(this));
        var item = $(this);
        var label = item.attr('name');
        var cod = item.attr('value');
        var total = $('.sele[cod=' + cod + '][secao=' + secao + ']').length;

        $(".boxFiltrados").css("display", "block");
        // Adiciona apenas uma vez ou remove
        if (total == 0) {
            if ($("#lbl" + secao).size() > 0) {
                $("#lbl" + secao).after('<span class="sele" id="opt" cod="' + cod + '" secao="' + secao + '"><a href="javascript:remover(this, \'' + cod + '\', \'' + secao + '\');">' + label + '</a></span>');
                $("#lbl" + secao).show();
            }
        }
        else { $('.sele[cod=' + cod + '][secao=' + secao + ']').remove();}

        remover_label(secao);
        event.stopPropagation();
    });

    $("div.boxSelecionados .filtroSubmit  #btFiltrar").bind("click", function (ev) {
        var strCod = "";

        for (var i = 0; i < arrGrupos.length; i++) {
            var items = $("span[cod][secao='" + arrGrupos[i] + "']");

            items.each(function(i) {
                if (strCod != "") { strCod = strCod + "|" + $(this).attr('cod');}
                else { strCod = $(this).attr('cod');}
            });
        }

        //Inicio Bloco alterado pela Accurate - Leonardo - CFC - 126
        if ($("#frmFiltro").size() > 0) {
            if ($("InputFiltroCodigos").size() == 0) {
                var tmp = $("#frmFiltro").attr("action");
                tmp = tmp + "/" + strCod;
                $("#frmFiltro").attr("action", tmp);
            }
            else { $("InputFiltroCodigos").attr('value', strCod);}
        }

        //Fim Bloco alterado pela Accurate - Leonardo - CFC - 126
        $('span[cod][secao]').remove();
        $('span.sele').hide();
        $('.checkItem[value][secao]').attr('checked', false);
        $(".boxFiltrados").css("display", "none");
        $("#frmFiltro").submit();
    });

    // compare
    $(".checkCompareTag").bind("click",function() {
        if ($(this).parent().hasClass("on")) { $(this).parent().removeClass("on");}
        else { $(this).parent().addClass("on");}
    });

    // combo
    $(".jQueryChangeOrder").bind("click",function() { $('ul.comboOrder').slideToggle();});
    $("#changeAmount").bind("click", function () { $('ul.comboQtd').slideToggle();});
    $("#changeAmountFim").bind("click", function () { $('ul.comboQtd').slideToggle();});

    // display mode
    $('.viewOption a').bind("click", function() {
        var viewClass = String($(this).attr('class'));
        viewLinkClass = viewClass.split(" ");
        viewLinkClass = viewLinkClass[0];

        $('.viewOption a').removeClass("on");
        $('.viewOption a').addClass("off");
        
        $(this).addClass("on");
        
        if("viewList" == viewLinkClass) {
            $(".show-case-box").addClass("one");
            $(".show-case-box").removeClass("four");
        }else {
            $(".show-case-box").removeClass("one");
            $(".show-case-box").addClass("four");
        }
    });
    $('.showCase').append(removeBorder('li'));

} // END categoriesStart();

// Remove Item
function remover(element, cod, secao) {
    $('span[cod='+cod+'][secao='+secao+']').remove();
    $('.checkItem[value=' + cod + '][secao=' + secao + ']').attr('checked', false);
    remover_label(secao);
}

// Remover todos itens
function remover_filtros() {
    $('span[cod][secao]').remove();
    $('.checkItem[value][secao]').attr('checked', false);
    $('.comboSelecionados').children().hide();
}

// Verifica se deve remover o label
function remover_label(secao) {
    var total = $('.sele[cod][secao=' + secao + ']').length;
    var hidebtFiltro = true;

    if (total == 0) { if($("#lbl" + secao).size() > 0) { $("#lbl" + secao).hide();}}

    if ($("#udaSelectedFilters").val()!=null && $("#udaSelectedFilters").val()!=''){ hidebtFiltro = false;}

    for (var i = 0; i < arrGrupos.length; i++) { if ($(('#lbl' + arrGrupos[i])).is(":visible")) { hidebtFiltro = false;}}

    if ( hidebtFiltro ) {
        $('span[cod][secao]').remove();
        $('.checkItem[value][secao]').attr('checked', false);
        $(".boxFiltrados").css("display", "none");
    }
}

function Categorie_Click(event) {
    if ($(event.target).attr("lst") != undefined) {
        var lstAssociada = $("#" + $(event.target).attr("lst"));

        if (lstAssociada.css("display") == "none") {
            // Posicionamento
            var bt_alt = $(event.target).outerHeight();
            var bt_top = $(event.target).position().top;
            var bt_left = $(event.target).position().left;
            lstAssociada.css('top', bt_top + bt_alt);
            lstAssociada.css('left', bt_left);
            lstAssociada.css("display", "block");
            $(event.target).addClass("on");
            $(event.target).parent().addClass("on");
            $(event.target).addClass("GrupoSelecionado");
        } else {
            lstAssociada.css("display", "none");
            $(event.target).removeClass("on");
            $(event.target).parent().removeClass("on");
        }

        //for each no array com as listas dos grupos associados.
        HideListas($(event.target).attr("lst"));

        //for each nos botoes.
        RemoveClassOn($(event.target).attr("id"));
    }
    event.stopPropagation();
}

function HideListas(currentList) {
    for (var i = 0; i < arrListasAssociadas.length; i++) {
        if (arrListasAssociadas[i] != currentList) {
            if ($("#" + arrListasAssociadas[i]).size() > 0) { $("#" + arrListasAssociadas[i]).css("display", "none");}
        }
    }
}

function RemoveClassOn( currentGroup) {
    for (var i = 0; i < arrGrupos.length; i++) {
        if (arrGrupos[i] != currentGroup) {
            if ($("#" + arrGrupos[i]).size() > 0) {
                $("#" + arrGrupos[i]).removeClass("GrupoSelecionado");
                $("#" + arrGrupos[i]).removeClass("on");
                $("#" + arrGrupos[i]).parent().removeClass("on");
            }
        }
    }
}

function getGroup(obj) {
    if (obj) { return obj.parents().find(".GrupoSelecionado:eq(0)").attr("id");}
}

// remove as bordas das ultimas 4 li - para vitrine com 4 colunas
function removeBorder(tag) {
    var fixBorderElement = ('<'+tag+' class="fix-border-element"'+'>'+'</'+tag+'>')
    return fixBorderElement;
}

// Diferencia pagina de busca e pagina de busca nao encontrada, adicionando uma classe adicional no body
function hasSearchNotFound(){
    if($('#home-busca .search-not-found').length>=1){
        $('body').toggleClass('has-search-not-found');
    }
}
