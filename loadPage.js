function openPage(url, id) {
  $.get(url, function(response){
    var elemento = $("#" + id);
      if (elemento.size() > 0) {
        elemento.html(response);
        events_productStart();
        var cross = crosselling.skuCrosselling[0].skucrosselling;
        var acess = crosselling.skuCrosselling[0].skuacessories;
        if (cross == "") {
            if (acess != "") {
              $("#slider-tab").removeClass("slider-tab-default").addClass("slider-tab-acess");
              $("#vertSliderAcessorios").show();
              $("#vertSliderRecomendado").hide();
            }
        } else {
          if (id == 'crossvalue') {
            $(".colorBoxQuickView").colorbox({width:"681px", height:"645px", opacity:0.5, iframe:true});
          }
        }
      }
  })
}