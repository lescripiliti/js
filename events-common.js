$(document).ready(function() {

    eventsCommonStart();

});

function eventsCommonStart() {
	// Botão (Cadastre seu e-mail) para abrir box de Newsletter
	$(".boxSearchEmail form.search #submitButton").attr("href", "javascript:;");
	$(".boxSearchEmail form.search #submitButton").click(function() {
		if($("div.newsLetter:hidden")) { $("div.newsLetter").show();}
	});
	$("div.newsLetter span.searchDetNewsLetter a.newsLetterClose").attr("href", "javascript:;");
	$("div.newsLetter span.searchDetNewsLetter a.newsLetterClose").click(function() { 
		$(this).parents("div.newsLetter").hide();
		$(this).parents("div.sendNewsLetter").hide();
	});
	
	$("div.sendNewsLetter span.sendDetNewsLetter a.newsLetterClose").attr("href", "javascript:;");
	$("div.sendNewsLetter span.sendDetNewsLetter a.newsLetterClose").click(function() { 
		$(this).parents("div.newsLetter").hide();
		$(this).parents("div.sendNewsLetter").hide();
	});
	
	$("div.newsLetter .newsLetterForm .newsLetterButton").attr("href", "javascript:;");
	$("div.newsLetter .newsLetterForm .newsLetterButton").click(function(){
		$(this).parents("div.newsLetter").hide();
		// obtem o email
		var email = $("#newsLetterMail").attr("value");
		if(isEmailValid(email)){
			// monta a url de requisicao
			url = '/newsletterservice?operation=add&email=' + email + '&format=json&jsoncallback=?';
			// efetua a chamada ajax
			$.getJSON(url, function(){});
		}else{
			$(".banner .sendNewsLetter .sendText").text("Erro de preenchimento do e-mail.");
		}
		$("div.sendNewsLetter").show();
	});
	function isEmailValid(email) {
		// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
		return email.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i) != null;
	}
}