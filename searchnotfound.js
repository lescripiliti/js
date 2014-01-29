function validate() {
	if ($("#name").val() == null || $("#name").val() == '') {
		$('.contentCamposErroModalPop').show();
		$('.white').text("Seu nome é um campo obrigatório");
		return false;
	}
	if ($("#email").val() == null || $("#email").val() == '') {
		$('.contentCamposErroModalPop').show();
		$('.white').text("Seu e-mail é um campo obrigatório");
		return false;
	}
	if (emailValidate($("#email").val())==null) {
		$('.contentCamposErroModalPop').show();
		$('.white').text("Seu e-mail é inválido");
		return false;
	}
	if ($("#word").val() == null || $("#word").val() == '') {
		$('.contentCamposErroModalPop').show();
		$('.white').text("Não foi possível realizar a operação solicitada.");
		return false;
	}
	return true;
}

function emailValidate(email){
	var regexRFC2822 = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
	return email.match(regexRFC2822);
}

function getWordParameter() {
        var variaveis=location.search.split("?");
        var pairs=variaveis[1].split("&");
        for ( i in pairs ) {
	    var keyval = pairs[ i ].split( "=" );
	    if (keyval[0]=='word') {
		    $("#word").val(unescape(keyval[1]));
	    }
	}
}