function HideAll() {
	$(".tabContent ").removeClass('tabContenthover');

	if ($('#blueBar').hasClass('showUp')) {
		$('#blueBar').removeClass('showUp');
		$('div.subNav').removeClass("show");
		$('#blueBar').css({ bottom: 0 });
		$("div.myAcc ul.nav li").removeClass("active");
	}
}

function BlueBarStart(logado) {
	HideAll();
	var animate_duration = 1000;
	$('a.myCart').bind("click", function() {
		if (!$('div.cartFull').hasClass("openFull")) { $('div.cartFull').addClass("openFull");}
		else { $('div.cartFull').removeClass("openFull");}
	});
	$('a.close').bind("click", function() { $('div.cartFull').removeClass("openFull");});

	$('a.selectedOption').bind("click", function() {
		var availableOptions = $(this).parents(".specialCombo").find(".availableOptions");
		if (!availableOptions.hasClass("show")){ availableOptions.addClass("show");}
		else { availableOptions.removeClass("show");}
	});

	$("li.specialCombo div a").click(function() {
		$(this).parents(".specialCombo").find("a.selectedOption label").text($(this).text());
		$(this).parents(".specialCombo").find("a.selectedOption input[type=hidden]").val($(this).children("input[type=hidden]").val())
		$(this).parents(".specialCombo").find(".availableOptions").removeClass("show");
	});

	$("div.myAcc ul.nav li a").attr("onclick", "return false;");
	$("div.myAcc ul.nav li").bind("click", blue_bar_click);
	$("div.myAcc ul.nav li").bind("dblclick", function () { });

	function blue_bar_click (ev) {
	    var target_click = ev.currentTarget;

		if (!$(target_click).hasClass("barTab")) {
			if ($('#blueBar').hasClass('showUp')) {
				$("div.myAcc ul.nav li").unbind('click');

				$('#blueBar').animate({
					bottom: '0'
				}, animate_duration, function () {
					$('#blueBar').removeClass("showUp");
					$('div.subNav').removeClass("show");
					$('ul.nav li').removeClass("active");
					$("div.myAcc ul.nav li").bind('click', blue_bar_click);
				});
			}
		} else {
			if (!$(target_click).hasClass("active")) {
				var target = $(target_click).children("a").attr("title");
				$(".tabContent ").removeClass("tabContenthover");
				$("#" + target + ".tabContent").addClass("tabContenthover ");
				$("#" + target + ".tabContent").show();
				$("#" + target + ".tabContent>div").addClass("active");
				$("#" + target + ".tabContent > div").parents(".subNav").addClass("show");
				$("div.myAcc ul.nav li").removeClass("active");
				$(target_click).addClass("active");

				if (!$('#blueBar').hasClass('showUp')) {
					$("div.myAcc ul.nav li").unbind('click');
					$('div.subNav').addClass("show");

					$('#blueBar').animate({
						bottom: '54'
					}, animate_duration, function () {
						$('#blueBar').addClass("showUp");
						$("div.myAcc ul.nav li").bind('click', blue_bar_click);
					});
				}
	        } else {
				var target = $(target_click).children("a").attr("title");
				$("#" + target + ".tabContent").hide();
				var target_parents = $("#" + target + ".tabContent ").parents(".subNav");
				var target_parents_div = $("#" + target + ".tabContent > div ").parents(".subNav");
				$(target_click).removeClass("active");

				if ($('#blueBar').hasClass('showUp')) {
					$("div.myAcc ul.nav li").unbind('click');

					$('#blueBar').animate({
						bottom: '0px'
					}, animate_duration, function () {
						$('#blueBar').removeClass("showUp");
						target_parents.removeClass("show");
						target_parents_div.removeClass("show");
						$(target_click).removeClass("active");
						$("div.myAcc ul.nav li").bind('click', blue_bar_click);
					});
				}
			}
		}
	}
	
		
	$(document).ready(function () {
		if ($("#vLogin").size() > 0) { $("#vLogin").validate();}

	    if ($("#vRegister").size() > 0) { $("#vRegister").validate();}

	    if ($("#vFind").size() > 0) { $("#vFind").validate();}
	});

};

//Função para limpar campo e setar cor default
function ClearAndSetColor(id){
	 var e = document.getElementById(id);
	 if(e.value == id){
		e.value = '';
	 }
	 e.style.color = "#666666";
	 return(true);
} 