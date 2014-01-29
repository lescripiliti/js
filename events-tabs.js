function scrollActiveTab(){
	$(".tabContent.active .scroll-pane").jScrollPane({
			showArrows: true, 
			scrollbarWidth: 20, 
			arrowSize: 9
	});
}

$(document).ready(function(){

tabStart();

});

function tabStart(){

	
		$("div.tabsContainer ul.tabsList li a").attr("onclick", "return false");
	$("div.tabsContainer ul.tabsList li").bind("click", function(ev){
		$("div.tabsContainer ul.tabsList li").removeClass("active");
		$(this).addClass("active");
	    var target = $(this).children("a").attr("rel");
		$(".tabContent").removeClass("active");
		$("#" + target + ".tabContent").addClass("active");
		if ($(this).parents(".tabsContainer").hasClass("scrollableTabs")){
			setTimeout("scrollActiveTab()", 100);
		}
	});
	$("div.tabsContainer ul.tabsList li.active").click();
	
	}