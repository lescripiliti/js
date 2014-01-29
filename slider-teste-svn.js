    /**Estou alterando o arquivo */
$(document).ready(function() {

    StartSliderHorizontal();
});

function StartSliderHorizontal() {
  try {
    $("div.productPurchased div.anythingSlider a.forward").live("click", vai_ProductPurchased_click);
    
    if ($("div.productPurchased div.anythingSlider .back").length > 0) {
      $("div.productPurchased div.anythingSlider .back").addClass("disabled");
    }
    
    if ($("div.productPurchased div.anythingSlider #thumbNavContainer").size() > 0) {
      CreatePaggingSeeAlso();
    }
	
	$("div.ultimosProdutos div.anythingSlider .forward").live("click", vai_click);
    $("div.seeAlso div.anythingSlider a.forward").live("click", vai_seealso_click);
    
    if ($("div.ultimosProdutos div.anythingSlider .back").length > 0) {
      $("div.ultimosProdutos div.anythingSlider .back").addClass("disabled");
    }
    
    if ($("div.seeAlso div.anythingSlider .back").length > 0) {
      $("div.seeAlso div.anythingSlider .back").addClass("disabled");
    }
    
    if ($("div.seeAlso div.anythingSlider #thumbNavContainer").size() > 0) {
      CreatePaggingSeeAlso();
    }
	
  } catch (Error) {
  }
}



/*See ProductPurchased*/
function CreatePaggingProductPurchased() {
  var itens = $("div.seeAlsoProductPurchased ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProductPurchased").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item);
  var pags = itens.length / por_pagina;
  
  $("div.productPurchased div.anythingSlider #thumbNavContainer div").html('');
  $("div.productPurchased div.anythingSlider #thumbNavContainer").hide();    
  
  if (pags > 0) {
    for (var i = 0; i < pags; i++) {
      if (i == 0)
        $("div.productPurchased div.anythingSlider #thumbNavContainer div").append('<a class="cur" pag="'+ i +'" href="javascript:;"/>');
      else
        $("div.productPurchased div.anythingSlider #thumbNavContainer div").append('<a class="" pag="' + i + '"href="javascript:;"/>');
    }
    
    $("div.productPurchased div.anythingSlider #thumbNavContainer").css({ width: 22 * pags + 'px' });
    $("div.productPurchased div.anythingSlider #thumbNavContainer").show();
    
    //Bind Pagging events
    $("div.productPurchased div.anythingSlider #thumbNavContainer div a").bind('click', function (ev) {
        Pagging_ProductPurchased_Click(ev);
    });
  }
}

function Pagging_ProductPurchased_Click(ev) {
  var page_click = $(ev.target).attr("pag");
  
  $("div.productPurchased div.anythingSlider #thumbNavContainer div a").removeClass('cur');
  $(ev.target).addClass("cur");
  
  var nav_quantity = 5;
  var itens = $("div.seeAlsoProductPurchased ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProductPurchased").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var pag = parseInt($("div.productPurchased div.anythingSlider .wrapper .seeAlsoProductPurchased ul").css("left"));
  var left = -((largura_item * nav_quantity) * page_click) + "px";

  $(".anythingSlider .wrapper .seeAlsoProductPurchased ul").animate({ left: left }, "slow");
}

function Pagging_ProductPurchased_Update() {
  var nav_quantity = 5;
  var itens = $("div.seeAlsoProductPurchased ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProductPurchased").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item);
  var pag = parseInt($("div.productPurchased div.anythingSlider .wrapper .seeAlsoProductPurchased ul").css("left"));
  var pixels_por_pagina = -(largura_item * por_pagina);
  var idx = pag / pixels_por_pagina;
  
  $("div.productPurchased div.anythingSlider #thumbNavContainer div a").removeClass('cur');
  
  $("div.productPurchased div.anythingSlider #thumbNavContainer div a").each(function (index) {
    if (index == Math.abs(idx)) {
      $($("div.productPurchased div.anythingSlider #thumbNavContainer div a")[index]).addClass("cur");
    }
  });
}

function vai_ProductPurchased_click() {
  $("div.productPurchased div.anythingSlider .back").removeClass("disabled");

  var nav_quantity = 5;
  var itens = $("div.productPurchased ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProductPurchased").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item) + 1;
  var min_left = (itens.length - por_pagina) * -largura_item;
  var pag = parseInt($("div.productPurchased div.anythingSlider .wrapper .seeAlsoProductPurchased ul").css("left"));
  var left = pag - (largura_item * nav_quantity) + "px";    
  
  if (pag >= min_left) {
    DisableButtons_ProductPurchased();
    $(".anythingSlider .wrapper .seeAlsoProductPurchased ul").animate({ left: left }, "slow", function () {
      Pagging_ProductPurchased_Update();
      EnableButtons_ProductPurchased();
    });

    if (pag - (largura_item * nav_quantity) <= min_left) {
      $("div.productPurchased div.anythingSlider a.forward").addClass("disabled");
    }
  }
}

function volta_ProductPurchased_click() {
  $("div.productPurchased div.anythingSlider .forward").removeClass("disabled");
  
  var nav_quantity = 5;
  var itens = $("div.seeAlsoProductPurchased ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProductPurchased").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item) + 1;
  var min_left = (itens.length - por_pagina) * largura_item;
  var pag = parseInt($("div.productPurchased div.anythingSlider .wrapper .seeAlsoProductPurchased ul").css("left"));
  var left = pag + (largura_item * nav_quantity) + "px";
  
  if (pag < 0) {
    DisableButtons_ProductPurchased();
    $(".anythingSlider .wrapper .seeAlsoProductPurchased ul").animate({ left: left }, "slow", function () {
      Pagging_ProductPurchased_Update();
      EnableButtons_ProductPurchased();
    });

    if ((pag + (largura_item * nav_quantity)) >= 0) {
      $("div.productPurchased div.anythingSlider .back").addClass("disabled");
    }
  } else {
    $("div.productPurchased div.anythingSlider .back").addClass("disabled");
  }
}

function EnableButtons_ProductPurchased() {
  try {
    //Click dos botoes
    if ($("div.productPurchased div.anythingSlider a.forward").length > 0) {
        $("div.productPurchased div.anythingSlider a.forward").click(vai_ProductPurchased_click);
    }

    if ($("div.productPurchased div.anythingSlider .back").length > 0) {
        $("div.productPurchased div.anythingSlider .back").click(volta_ProductPurchased_click);
    }
  } catch (Error) {
  }
}

function DisableButtons_ProductPurchased() {
  try {
    if ($("div.productPurchased div.anythingSlider a.forward").length > 0) {
      $("div.productPurchased div.anythingSlider a.forward").unbind('click');
    }
    if ($("div.productPurchased div.anythingSlider .back").length > 0) {
      $("div.productPurchased div.anythingSlider .back").unbind('click');
    }
  } catch (Error) {
  }
}
/*end seealso*/

/*See Alvo*/
function CreatePaggingSeeAlso() {
  var itens = $("div.seeAlsoProducts ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item);
  var pags = itens.length / por_pagina;
  
  $("div.seeAlso div.anythingSlider #thumbNavContainer div").html('');
  $("div.seeAlso div.anythingSlider #thumbNavContainer").hide();    
  
  if (pags > 0) {
    for (var i = 0; i < pags; i++) {
      if (i == 0)
        $("div.seeAlso div.anythingSlider #thumbNavContainer div").append('<a class="cur" pag="'+ i +'" href="javascript:;"/>');
      else
        $("div.seeAlso div.anythingSlider #thumbNavContainer div").append('<a class="" pag="' + i + '"href="javascript:;"/>');
    }
    
    $("div.seeAlso div.anythingSlider #thumbNavContainer").css({ width: 22 * pags + 'px' });
    $("div.seeAlso div.anythingSlider #thumbNavContainer").show();
    
    //Bind Pagging events
    $("div.seeAlso div.anythingSlider #thumbNavContainer div a").bind('click', function (ev) {
        Pagging_SeeAlso_Click(ev);
    });
  }
}

function Pagging_SeeAlso_Click(ev) {
  var page_click = $(ev.target).attr("pag");
  
  $("div.seeAlso div.anythingSlider #thumbNavContainer div a").removeClass('cur');
  $(ev.target).addClass("cur");
  
  var nav_quantity = 5;
  var itens = $("div.seeAlsoProducts ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));
  var left = -((largura_item * nav_quantity) * page_click) + "px";

  $(".anythingSlider .wrapper .seeAlsoProducts ul").animate({ left: left }, "slow");
}

function Pagging_SeeAlso_Update() {
  var nav_quantity = 5;
  var itens = $("div.seeAlsoProducts ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item);
  var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));
  var pixels_por_pagina = -(largura_item * por_pagina);
  var idx = pag / pixels_por_pagina;
  
  $("div.seeAlso div.anythingSlider #thumbNavContainer div a").removeClass('cur');
  
  $("div.seeAlso div.anythingSlider #thumbNavContainer div a").each(function (index) {
    if (index == Math.abs(idx)) {
      $($("div.seeAlso div.anythingSlider #thumbNavContainer div a")[index]).addClass("cur");
    }
  });
}

function vai_seealso_click() {
  $("div.ultimosProdutos div.anythingSlider .back").removeClass("disabled");

  var nav_quantity = 5;
  var itens = $("div.seeAlsoProducts ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item) + 1;
  var min_left = (itens.length - por_pagina) * -largura_item;
  var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));
  var left = pag - (largura_item * nav_quantity) + "px";    
  
  if (pag >= min_left) {
    DisableButtons_SeeAlso();
    $(".anythingSlider .wrapper .seeAlsoProducts ul").animate({ left: left }, "slow", function () {
      Pagging_SeeAlso_Update();
      EnableButtons_SeeAlso();
    });

    if (pag - (largura_item * nav_quantity) <= min_left) {
      $("div.seeAlso div.anythingSlider a.forward").addClass("disabled");
    }
  }
}

function volta_seealso_click() {
  $("div.ultimosProdutos div.anythingSlider .forward").removeClass("disabled");
  
  var nav_quantity = 5;
  var itens = $("div.seeAlsoProducts ul li");
  var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item) + 1;
  var min_left = (itens.length - por_pagina) * largura_item;
  var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));
  var left = pag + (largura_item * nav_quantity) + "px";
  
  if (pag < 0) {
    DisableButtons_SeeAlso();
    $(".anythingSlider .wrapper .seeAlsoProducts ul").animate({ left: left }, "slow", function () {
      Pagging_SeeAlso_Update();
      EnableButtons_SeeAlso();
    });

    if ((pag + (largura_item * nav_quantity)) >= 0) {
      $("div.seeAlso div.anythingSlider .back").addClass("disabled");
    }
  } else {
    $("div.seeAlso div.anythingSlider .back").addClass("disabled");
  }
}

function EnableButtons_SeeAlso() {
  try {
    //Click dos botoes
    if ($("div.seeAlso div.anythingSlider a.forward").length > 0) {
        $("div.seeAlso div.anythingSlider a.forward").click(vai_seealso_click);
    }

    if ($("div.seeAlso div.anythingSlider .back").length > 0) {
        $("div.seeAlso div.anythingSlider .back").click(volta_seealso_click);
    }
  } catch (Error) {
  }
}

function DisableButtons_SeeAlso() {
  try {
    if ($("div.seeAlso div.anythingSlider a.forward").length > 0) {
      $("div.seeAlso div.anythingSlider a.forward").unbind('click');
    }
    if ($("div.seeAlso div.anythingSlider .back").length > 0) {
      $("div.seeAlso div.anythingSlider .back").unbind('click');
    }
  } catch (Error) {
  }
}
/*end seealso*/

function EnableButtons() {
  try{
    //Click dos botoes
    if ($("div.ultimosProdutos div.anythingSlider .forward").length > 0)
      $("div.ultimosProdutos div.anythingSlider .forward").click(vai_click);

    if ($("div.ultimosProdutos div.anythingSlider .back").length > 0)
      $("div.ultimosProdutos div.anythingSlider .back").click(volta_click);
  } catch (Error) {
  }
}

function DisableButtons() {
  try {
    //Click dos botoes
    if ($("div.ultimosProdutos div.anythingSlider .forward").length > 0)
      $("div.ultimosProdutos div.anythingSlider .forward").unbind('click');
    
    if ($("div.ultimosProdutos div.anythingSlider .back").length > 0)
      $("div.ultimosProdutos div.anythingSlider .back").unbind('click');
  } catch (Error) {
  }
}

function vai_click() {
  $("div.ultimosProdutos div.anythingSlider .back").removeClass("disabled");
  
  var nav_quantity = 3;
  var itens = $("div.lastProductsSlide ul li");
  var largura_slider = $(".anythingSlider .wrapper .lastProductsSlide").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item) + 1;
  var min_left = (itens.length - por_pagina) * -largura_item;
  var pag = parseInt($("#slider .wrapper .lastProductsSlide ul").css("left"));
  var left = pag - (largura_item * nav_quantity) + "px";    
  
  if (pag >= min_left) {
    DisableButtons();
    $(".anythingSlider .wrapper .lastProductsSlide ul").animate({ left: left }, "slow", function() {
      EnableButtons();
    });
    
    if (pag - (largura_item * nav_quantity) <= min_left) {
      $("#vaiUltimos").addClass("disabled");            
    }
  } else {
    $("#vaiUltimos").addClass("disabled");        
  }
}

function volta_click() {
  $("div.ultimosProdutos div.anythingSlider .forward").removeClass("disabled");
  
  var nav_quantity = 3;
  var itens = $("div.lastProductsSlide ul li");
  var largura_slider = $(".anythingSlider .wrapper .lastProductsSlide").outerWidth();
  var largura_item = itens.filter(":first:").outerWidth();
  var por_pagina = parseInt(largura_slider / largura_item) + 1;
  var min_left = (itens.length - por_pagina) * largura_item;
  var pag = parseInt($("#slider .wrapper .lastProductsSlide ul").css("left"));
  var left = pag + (largura_item * nav_quantity) + "px";

  if (pag < 0) {
    DisableButtons();
    $(".anythingSlider .wrapper .lastProductsSlide ul").animate({ left: left }, "slow", function() {
      EnableButtons();
    });

    if ((pag + (largura_item * nav_quantity)) >= 0) {
      $("#voltaUltimos").addClass("disabled");
    }
  } else {
    $("#voltaUltimos").addClass("disabled");
  }
}



