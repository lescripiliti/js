var slideCreated = false;
var cartSlider = {};
var thumbWidth = 68;
var cartItems = $('.carrinho-cheio .productList').clone(true);
$(document).ready(function(){

    //Chamando a função do menu Dropdown
    $("#topMenu").find(".drop").dropdown();

    //inserindo o Span showcase-mask na prateleira    

    $(".showcase-image img").before("<span class='showcase-mask'></span>");

    //inserindo o Span thumb-mask nas miniaturas da página de Produto

    $("body#home-produto .snippet_structure-carousel-product_item a img").before("<span class='thumb-mask'></span>")

    //inserindo a classe no-result para estilizar a busca sem resultado
    if ( $("body#home-busca .ilustra404").length ){
        $(".contentWrapper").addClass('no-result');
    }

    //Contador adicionando a classe MASK[0 a 4] para as prateleiras

    $('ul.showCase').each(function(){

    	var cont=1;
    	$(this).find('span.showcase-mask').each(function(i){
    		if(cont<=4){
    			$(this).addClass('mask'+cont);

    		}
    		cont++
    		if(cont>4){
    			cont=1;
    		}
    	});
    });

    //inserindo o Span value-from-mask na prateleira

    $(" body#home-produto .infoOne span.from-value span.pref-value-group").before("<span class='from-value-mask'></span>")    

    //insertZoomMask();

    //CartFlutuante

    $(".cartLink").live("click", function(){

        if($('#cartFlutuante').is(":visible"))
        {
            $('#cartFlutuante').slideUp(200,function(){
                cartSlider.destroySlider();
                $(".carrinho-cheio").find(".bx-wrapper").remove();
                $(cartItems).insertAfter("#loadingCart");
            });
        }
        else
        {
            $('#cartFlutuante').slideDown(200,function(){
                cartSlider =  $('.carrinho-cheio .productList').bxSlider({
                    mode: "vertical",
                    slideMargin: 15,
                    minSlides: 2,
                    moveSlides: 2,
                    easing: 'ease-in-out',
                    slideWidth: 200,
                    pager: false,
                    infiniteLoop: false,
                    hideControlOnEnd: true
                });
            });
        }

    });  

    //thumbs produto
/*
    $(".thumbs").each(function(){
     thumbsSlider = $(this).bxSlider({
            mode: "vertical",
            slideMargin: 15,
            minSlides: 4,
            moveSlides: 4,
            easing: 'ease-in-out',
            slideWidth: thumbWidth,
            pager: false,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

        if($(this).find("li").length <= 6) {
            $(this).find(".bx-has-controls-direction").hide();
        }
    });
*/

    //Function para ocultar o CART FLUTUANTE ao Clicar fora dele:

    $(document).live("click", function(e){
    if($('#cartFlutuante').is(":visible") && $(e.target).parents(".cart").length == 0 )
        {
            $('#cartFlutuante').slideUp(200,function(){
                cartSlider.destroySlider();
                $(".carrinho-cheio").find(".bx-wrapper").remove();
                $(cartItems).insertAfter("#loadingCart");
            });
        }
    });


});



//Function do Menu DropDown;

;(function($) {
    $.fn.dropdown = function(autoWidth) {
        var animationOption = {
            duration: 150,
            specialEasing: "easeInOutSine"
        }
       
 
        if(autoWidth)
        {
            var spacing = 15;
           
            $('.submenu-box:last').addClass("last");
 
            $('.submenu-box').css("visibility", "hidden").show();
            $('.submenu-box').each(function(){
                var item_width = 0;
                var itemBox_height = 0;
                var qtd_children = $(this).find('> ul').length;
                                 
                $(this).find('> ul').each(function(){
 
                    if($(this).height() > itemBox_height)
                    {
                        itemBox_height = $(this).height();
                    }                                      
                   
                    $(this).find(' > li').each(function(){
                        if($(this).outerWidth() > item_width)
                        {
                            item_width = $(this).outerWidth();
                        }
                    });
                                             
                    $(this).css({
                        width: item_width,
                        height: itemBox_height
                    });
                 
                });
 
                var final_width = (item_width * qtd_children) + spacing;
                   
                $(this).width(final_width);      
            });
            $('.submenu-box').css("visibility", "visible").hide();
        }
 
        $(this).on("mouseenter mouseleave", function(e){
            var subcategory = $(this).find(".submenu-box");
 
            switch(e.type)
            {
                case "mouseenter":
                    //if(subcategory.is(":animated")) return false;
                    subcategory.stop(true,true).slideDown(animationOption);
                break;
 
                case "mouseleave":
                    //if(subcategory.is(":animated")) return false;
                    subcategory.stop(true,true).slideUp(animationOption);
                break;
            }
 
        });
    }
})(jQuery);

//inserindo a mask no produtoi principal
/*
function insertZoomMask(){
    while($('body#home-produto .zoomPad img').length==0){
        setTimeout(function(){
            if($('body#home-produto .zoomPad img').length==0){
                insertZoomMask();
            }else{
                $("body#home-produto .zoomPad img").before("<span class='product-mask'></span>");
            }
        },500);
        break;
    }
}
*/



