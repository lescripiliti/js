
var path_image_item = '/images/cadastro-erro-validacao.jpg';

var win_width = 0;
var scrollToLeft = 0;
var win_height = 0;
var scrollToBottom = 0;

var alert_box_width = 0;
var alert_box_height = 0;

//on page ready load image
$(document).ready(function () {

    AlertStart();
});


function AlertStart() {
    //imgLoader = new Image(); // preload path_image_item
    //imgLoader.src = path_image_item;

    win_width = $(window).width();
    scrollToLeft = $(window).scrollLeft();
    win_height = $(window).height();
    scrollToBottom = $(window).scrollTop();

    if ($(".ListaErrosOcorridos").size() > 0) {
        var params_li = new Array();
        var title = "";
        $("ul.ListaErrosOcorridos li").each(function (index) {
            if (index == 0)
                title = $($("ul.ListaErrosOcorridos li")[index]).html();
            else
                params_li.push($($("ul.ListaErrosOcorridos li")[index]).html());
        });

        if (params_li.length > 0) {
            ShowMessage(title, params_li);
            $(".ListaErrosOcorridos").text("");
        }

    }
}


function ShowMessage(title, params) {

    var box_height = 95; //Tamanho m�nimo do box
    var box_width = 300; //era par�metro ficou fixo.

    alert_box_width = box_width;
    alert_box_height = box_height;

    var color = "#000000";
    var offset = {};
    var options = {
        margin: 1,
        border: 1,
        padding: 1,
        scroll: 0
    };

    var resizeTimerAlert = null;
    $(window).bind('resize', function () {
        if (resizeTimerAlert) clearTimeout(resizeTimerAlert);
        resizeTimerAlert = setTimeout("CenterDivAlert()", 100);
    });

    var div_modal = document.getElementById('#TB_window_alert');

    if (div_modal == null) {
        $('body').append("<div id='TB_window_alert' style='background-color:Transparent; margin-left: 0px;position: absolute;z-index:1500;display:none;width:" + box_width + ";height:auto;margin-top: 0px;' ></div>");
    }

    $.dimScreen(500, 0.7, color, function () {
        $('#TB_window_alert').fadeIn(500);
    });

    var offset = {}
    offset = $("#TB_window_alert").offset({ scroll: false })

    X_left = offset.left + box_width - 16;
    X_top = offset.top;


    // inicio Conteudo de layout do alert

    var strHtml = "<div class='topcorner'></div>";
    strHtml += "    <div class='contentAlertError'>";
    strHtml += "     <span id='AlertTitle'></span>";
	strHtml += "       <ul id='AlertConteudo'></ul>";
    strHtml += "       <div class='botaoAlertError' id='btAlertClose'>";
    strHtml += "       	 <a class='btArrowAlertError'  href='javascript:void(0);'>OK</a> ";
    strHtml += "           <div class='arrow'></div>";
    strHtml += "       </div>";
    strHtml += "    </div>";
    strHtml += "    <span class='bottomcorner'></span>"; 

    $("#TB_window_alert").append(strHtml);

    //Fim     

    $('#btAlertClose').click(function () {        
        // 
        $('#TB_window_alert').fadeOut(500);
        $('#TB_window_alert').remove();
	$(".ListaErrosOcorridos").text("");
        $.dimScreenStop();
    });


    //Append Params
    var strParams = "";
    for (var i = 0; i < params.length; i++) {
        strParams += "<li> " + params[i] + "</li>";
    }
    $("#AlertTitle").html(title);
    $("#AlertConteudo").html(strParams);


    if ($('#TB_window_alert').height() < box_height) {

        $('#TB_window_alert').css({ height: box_height + 'px' });
		$('#tabelaalerta').css({ height: box_height - 46+ 'px' });
		

    } else {
        box_height = $('#TB_window_alert').height();
        alert_box_height = box_height;
		
    }


    $('#TB_window_alert').css({ left: ((((win_width - box_width) / 2)) + scrollToLeft) + 'px',
        top: ((((win_height - box_height) / 2)) + scrollToBottom) + 'px',
        border: '0px',
        width: box_width + 'px'
    });

}

function CenterDivAlert() {

    win_width = $(window).width();
    scrollToLeft = $(window).scrollLeft();
    win_height = $(window).height();
    scrollToBottom = $(window).scrollTop();

    $('#TB_window_alert').css({ left: ((((win_width - alert_box_width) / 2)) + scrollToLeft) + 'px', top: ((((win_height - alert_box_height) / 2)) + scrollToBottom) + 'px' }); 
}

