function validate() {
  if ($("#namefrom").val() == null || $.trim($("#namefrom").val()) == '') { 
    $('.contentCamposErroModalPop').show();
    $('.white').text("Seu nome \xe9 um campo obrigat\xf3rio");
    return false;
  }
  if ($("#emailfrom").val() == null || $.trim($("#emailfrom").val()) == '') {
    $('.contentCamposErroModalPop').show();
    $('.white').text("Seu e-mail \xe9 um campo obrigat\xf3rio");
    return false;
  }
  if (emailValidate($("#emailfrom").val()) == null) {
    $('.contentCamposErroModalPop').show();
    $('.white').text("Seu e-mail \xe9 inv\xe1lido");
    return false;
  }   
  
  if ($("#nameto").val() == null || $.trim($("#nameto").val()) == '') {
    $('.contentCamposErroModalPop').show();
    $('.white').text("O nome do seu amigo \xe9 um campo obrigat\xf3rio");
    return false;
  }
  if ($("#emailto").val() == null || $.trim($("#emailto").val()) == '') {
    $('.contentCamposErroModalPop').show();
    $('.white').text("O e-mail do seu amigo \xe9 um campo obrigat\xf3rio");
    return false;
  }
  if (emailValidate($("#emailto").val()) == null) {
    $('.contentCamposErroModalPop').show();
    $('.white').text("O e-mail do seu amigo \xe9 inv\xe1lido");
    return false;
  }
  getPUrl();
  return true;
}

function emailValidate(email){
  var regexRFC2822 = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  return email.match(regexRFC2822);
}

function getPUrl() {
  var variaveis=location.search.split("?");
  var pairs=variaveis[1].split("&");
  for ( i in pairs ) {
    var keyval = pairs[ i ].split( "=" );
    if (keyval[0]=='purl') {
      $("#purl").val(unescape(keyval[1]));
    }
  }
}