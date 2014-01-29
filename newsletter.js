/* newsletter.js */ 

$(document).ready(function() {
    hideField();
});

var screenNameField = "Seu nome";
var screenMailField = "Insira seu e-mail";

function hideField() {
    $('#newsLetterMail').focus(function(){
        valueField = $(this).val();
        valueMain = valueField.toLowerCase() == "insira seu e-mail";

        if(valueMain) {
            $(this).val("");
        }
    });
    $('#newsLetterMail').blur(function(){
        valueField = $(this).val();
        valueMain = valueField.toLowerCase() == "";

        if(valueMain) {
            $(this).val("Insira seu e-mail");
        }
    });
}

function sendNewsLetter() {

    if($("#newsLetterMail").val() == screenMailField){

        // chama a funcao que mostrar os erro no lightbox
        $("#listaErrosLightBox").html("<p> Erro de Preenchimento <br/> Por favor, informe seu email </p>");  
        showErrorColorBox();
        return false;
    } else if(!isValidEmail($("#newsLetterMail").val())) {
        $("#listaErrosLightBox").html("<p> Erro de Preenchimento <br/> Email inválido </p>");  
        showErrorColorBox();
        return false;
    }
    
    // obtem os dados
    var email = $("#newsLetterMail").val();

    // monta a url de requisicao
    url = '/newsletterservice?operation=add&email=' + email + '&format=json&jsoncallback=?';                     

    // efetua a chamada ajax
    $.getJSON(url, function(){});
    
    resetFields();
    $("#listaErrosLightBox").html("<p> Obrigado. Você saberá em primeira mão das ofertas e promoções. </p>");  

    showErrorColorBox();
};

function showColorBox(content, width, height){
    $.colorbox({width:width, height:height, inline:true, href:"#listaErrosLightBox", open:true, title: "", onClosed:function(){}});
    $("#listaErrosLightBox p").remove();
    if(flag){
        $("#listaErrosLightBox img").css('display', 'block');   
    }else{
        $("#listaErrosLightBox").append(content);   
        $("#listaErrosLightBox img").css('display', 'none');    
    }
}

function resetFields() {
    $("#newsLetterMail").val(screenMailField);
}

function isValidEmail(email) {
    var regEx = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return regEx.test(email);
} 
