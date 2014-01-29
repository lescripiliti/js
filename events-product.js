$(document).ready(function(){
	events_productStart();
	bindMoreComments();
	comboStart();

});

$.extend($.expr[':'], {
  'containsi': function(elem, i, match, array)
  {
    return (elem.textContent || elem.innerText || '').toLowerCase()
    .indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});

function changeTab(search) {
   var results = $(".tabContent *:containsi('" + search + "'):eq(0)");      
   // se houver alguma coisa, esconde todas as abas e mostra a primeira encontrada
   if (results.size() > 0) {
      $(".tabContent").removeClass("active");
	  $(".tabsList li").removeClass("active");
	  $(".tabs li").removeClass("active");
      results.parent(".productTabs .tabContent").addClass("active");
	  tab = results.parent().attr('id');
	  $("a[rel='"+ tab +"']").parent().addClass("active");
	  results.parent(".tabsList li").addClass("active");
	  results.parent(".tabs li").addClass("active");
   }
}


function loadCross() {
	// Se o height do conteúdo for maior q o do crosselling o msm iguala-se ou o contrario.
	heightItens();
	$("div.tabsSelection ul.tabsList li").click(function() {
		window.setTimeout(vertHeightEqual, 300);
	});

	$(".crossSell .crossSlider #volta").addClass("disablef");
	$(".crossSell .crossSlider #voltabaixo").addClass("disablef");
}

function events_productStart() {

	//tabs
	$(".viewBoxMedia").load($(".imageView .viewBoxHeader ul li.active a").attr("href"));
	$(".imageView .viewBoxHeader ul li").bind("click", function(ev){
		$(".imageView .viewBoxHeader ul li").removeClass("active");
		$(this).addClass("active");
		var a = $(this).find("a");
		$(".viewBoxMedia").load(a.attr("href"));
	});
	$(".imageView .viewBoxHeader ul li.video").bind("click", function(ev){
		$(".imageView .viewBoxThumbs").hide();
	});
	$(".imageView .viewBoxHeader ul li.foto").bind("click", function(ev){
		$(".imageView .viewBoxThumbs").show();
	});
	
	//thumbs
	$(".imageView .viewBoxThumbs ul li a").bind("click", function(ev){
		$(".viewBoxMedia img").attr("src", $(this).attr("href"));
	});

	//tooltip		
	// $("a.showHelp").each(function(i, el){
	// 	var content = $(".tooltipContent." + $(el).attr("rel")).html();
	// 	$(el).simpletip({
	// 		fixed: 'true',
	// 		position: 'right',
	// 		activeClass: 'tooltipActive',
	// 		content: content
	// 	});
	// });

	//tooltip, Visie's way
	$('a.showHelp').hover(function(){
		$(".tooltipContent." + $(this).attr("rel")).css({
		  position:'absolute',
		  top:$(this).position().top+15,
		  left:$(this).position().left
		}).find('div:eq(0)').show();
	}, function() {
		$(".tooltipContent." + $(this).attr("rel")+ "> div").hide();
	});

   /* VERTICAL SLIDER **************************************/

	// Esconde o elemento
	$("#vertSliderAcessorios").hide();

	$("#recomendado").click(function () {
	    $("#slider-tab").removeClass('slider-tab-acess');
	    $("#slider-tab").addClass('slider-tab-default');

	    $("#vertSliderAcessorios").hide();
	    $("#vertSliderRecomendado").show();

		resizeMain(".mainBox > .productDetails", "#vertSliderRecomendado");

	})

   $("#acessorios").click(function () {
       $("#slider-tab").removeClass('slider-tab-default');
       $("#slider-tab").addClass('slider-tab-acess');

       $("#vertSliderRecomendado").hide();
       $("#vertSliderAcessorios").show();

	   resizeMain(".mainBox > .productDetails", "#vertSliderAcessorios");
   })

   /* VOLTAGEM **************************************/ 
      
   $("#clickvolt").click(function(){
      $("#volt01").hide();      
      $("#volt02").show();
   })

   $("#clickdisp").click(function(){
      $("#volt02").hide();      
      $("#volt01").show();
   })


/* VOLTAGEM  OK **************************************/

   $("#click110liga").click(function() {
       $("#inicio").hide();
       $("#volt02").show();
       $("#volt03").hide();

       $("#click110desliga").attr("checked", "true");
   })
   
   $("#click110liga2").click(function(){
      $("#inicio").hide();      
      $("#volt02").show();
      $("#volt03").hide();

      $("#click110desliga").attr("checked", "true");
   })

   $("#click110desliga").click(function(){
      $("#inicio").show();      
      $("#volt02").hide();
      $("#volt03").hide();
	  
   })
   
   $("#click220liga").click(function(){
      $("#inicio").hide();      
      $("#volt02").hide();
      $("#volt03").show();

      $("#click220desliga").attr("checked", "true");
      
   })
   
  $("#click220liga2").click(function(){
      $("#inicio").hide();      
      $("#volt02").hide();
      $("#volt03").show();

      $("#click220desliga").attr("checked", "true");
   })
   
   $("#click220desliga").click(function(){
      $("#inicio").show();      
      $("#volt02").hide();
	  $("#volt03").hide();
   })

   /* CEP **************************************/

   $("#calculacep").click(function() {
       $("#cepcalc").hide();
       $("#cepcalculado").show();
   })

   $("#outrocep").click(function() {
       $("#cepcalculado").hide();
       $("#cepcalc").show();

       $(".camposCep input.textCep1").attr('value', '');
       $(".camposCep input.textCep2").attr('value', '');

       $(".camposCep input.textCep1").focus();

   })
    	
   /* INDISPONIVEL **************************************/ 
      $(".jQueryAviseMe").click(function(){ 
  // $("#avisai").click(function(){
      $("#desc").hide();      
      $("#avise").show();
   })

   /*$("#avisado").click(function(){
      $("#avise").hide();      
      $("#desc").show();
   })*/
       	
   

	jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 });
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};

	
	//quick view
	$("div.quick-view div.imagem-mini > a").bind("click",function(ev){
		$("div.quick-view div.imagem-mini > a").removeClass("selecionada");
		$("div.quick-view div.imagem img").attr("src",  $(this).attr("href"));
		$(this).addClass("selecionada");
	});

	// color selector
	$('.jQueryColorSelector .images li span').bind("click", function(ev){
		$(this).parents("ul").find("span").removeClass("active");
		$(this).parents("li").find("span").toggleClass("active");
		acecChangeProductImages($(this).attr("rel"));
	});
	$('.jQueryColorSelector .images li input:checkbox').bind("click", function (ev) {
		userChoosesSku();		
	});

}

function acecChangeProductImages(skuId) {
	$(".boxFotoInner").hide();
	$("#boxFoto_sku" + skuId).show();
	$("#boxFoto_sku" + skuId + " ul li a:eq(0)").click();
}

searchHighlight = function(){
	$(".productTabs .tabContent").removeHighlight().highlight($(".productsSearch input.text").val());	
};

function Trim(str) { return str.replace(/^\s+|\s+$/g, ""); }


function bindMoreComments(){
	//mais comentarios	
	$('a.readAll').bind("click", function(ev){
		if (!$('div.moreComments').hasClass("openComments")){
			$('div.moreComments').addClass("openComments");
		} else {
			$('div.moreComments').removeClass("openComments");
		}
	});
}

function comboStart(){

    // combo

//    $("#changeDDD").click(function() {
//        $('ul.comboDDD').slideToggle();
//    });

//    $("#calcularDDD").click(function() {
//        $(".dddCombo").addClass('erro');
//    });

    $("#changeDDD").click(function() {
        $('ul.comboDDD').slideToggle();
    });

    $("#calcularDDD").click(function() {
        $(".comboDdd").addClass('erro');
    });

}

// Mantém height igual
var heightItens = function () {

	var setHeight = function(heightItens, lenghtItens, wrapperRec, vertSliderRec) {

		if (wrapperRec === "#wrapperRecomendado") {
			if (lenghtItens <= 3) { // testa e add height para os elementos do cross.
				$(wrapperRec).height((heightItens * lenghtItens)+48);
				$(vertSliderRec).height((heightItens * lenghtItens)+160);

				$("#vai").addClass("disableb");
				$("#vaibaixo").addClass("disableb");
				resizeMain(".mainBox > .productDetails", "#vertSliderRecomendado"); // #vertSliderRecomendado
			} else {
				height = heightItens * 3;
				$(wrapperRec).height(height+48);
				$(vertSliderRec).height(height+160);

				resizeMain(".mainBox > .productDetails", "#vertSliderRecomendado"); // #vertSliderRecomendado
			}
		}
		if (wrapperRec === "#vertSliderAcessorios") {
			if (lenghtItens <= 8) { // testa e add height para os elementos do cross.
				$(wrapperRec).height((heightItens * lenghtItens));
				$(vertSliderRec).height((heightItens * lenghtItens)+160);

				resizeMain(".mainBox > .productDetails", "#vertSliderAcessorios"); // #vertSliderAcessorios
			} else {
				height = heightItens * 8;
				$(wrapperRec).height(height);
				$(vertSliderRec).height(height+160);

				resizeMain(".mainBox > .productDetails", "#vertSliderAcessorios"); // #vertSliderAcessorios
			}
		}
		
	}

	// Recomendado
	if ($("div.crossSellProducts").length >= 1) {
		setHeight($("div.crossSellProducts").height(), // tamanho de cada elemento
				  $("div.crossSellProducts").length, // quantidade de elementos
				  "#wrapperRecomendado",
				  "#vertSliderRecomendado"
		);
	}

	// Acessórios
	if ($("div.crossSellMore").length >= 1) {
		setHeight(109, // tamanho de cada elemento
				  $("div.crossSellMore").length, // quantidade de elementos
				  "#wrapperAcessorios",
				  "#vertSliderAcessorios"
		);
	}

	if ($("div.crossSellProducts").length >= 1 && $("div.crossSellMore").length >= 1) {

		resizeMain(".mainBox > .productDetails", "#vertSliderRecomendado"); // #vertSliderRecomendado

	} else {
		if ($("div.crossSellProducts").length >= 1) {

			resizeMain(".mainBox > .productDetails", "#vertSliderRecomendado"); // #vertSliderRecomendado

		}
		else if ($("div.crossSellMore").length >= 1) {

			resizeMain(".mainBox > .productDetails", "#vertSliderAcessorios"); // #vertSliderAcessorios

		}
	}

}
var resizeMain = function(main, elem) {

	$(main).height("auto");

	var heightElem = $(elem).height(),
		heightMain = $(main).height();

	if (heightElem > heightMain) {
		$(main).height(heightElem+32);
	} else {
		$(elem).height(heightMain+32);
	}

}

var vertHeightEqual = function () {

	// Elementos
	var elem1 = ".mainBox > .productDetails",
		elem2 = "#vertSliderRecomendado",
		elem3 = "#vertSliderAcessorios";

	$(elem1).height("auto");

	// Height's
	var heightMain = $(elem1).height(),
		heightRecomendado = $(elem2).height(),
		heightAcessorios = $(elem3).height();

	if ($('div#vertSliderAcessorios:hidden').size() > 0) {

		if (heightRecomendado > heightMain) {
			$(elem1).height(heightRecomendado+32);
		} else {
			$(elem2).height(heightMain-32);
		}

	}
	else {

		if (heightAcessorios > heightMain) {
			$(elem1).height(heightAcessorios+32);
		} else {
			$(elem3).height(heightMain-32);
		}

	}

}