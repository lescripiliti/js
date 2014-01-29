// Referencia: http://colorpowered.com/colorbox/

$(document).ready(function(){
  //Examples of how to assign the ColorBox event to elements
  $(".htmlPop").colorbox({width:"650px", height:"650px"});
  $(".iframePop").colorbox({width:"650px", height:"560px", iframe:true});
  $("#showEsqueciSenha").colorbox({width:"650px", height:"350px", iframe:true});
  $("#showEsqueciEmail").colorbox({width:"650px", height:"300px", iframe:true});
  $(".schedulePop").colorbox({width:"650px", height:"940px", iframe:true});
  $("#showSearchNotFound").colorbox({width:"650px", height:"380px", iframe:true});
  $("#Recommend").colorbox({width:"650px", height:"420px", iframe:true});
  
  

  bindColorboxEvent();
});

function closeColorBox() {
  $.colorbox.close();
}

function bindColorboxEvent() {
  $(".inlinePop").colorbox({width:"300px", height:"200px", inline:true});
}

function showErrorColorBox() {
   if ($("#listaErrosLightBox ul").size() > 0 || $("#listaErrosLightBox").find("p").size() > 0 || $("#listaErrosLightBox").size() > 0) {
    hideLoader();
    window.setTimeout('$.colorbox({width:"300px", height:"200px", inline:true, href:"#listaErrosLightBox", open:true, title: "Atenção", onClosed:function(){$("#listaErrosLightBox").html("")}});',1);
  }
}

function openColorBoxCorreios(pos) {
  $.colorbox({title: "Selecione um meio de envio", width:"320px", height:"250px", href:"#showPopSelectFreightBox" + pos, open:true, inline:true, onClosed:function(){$("#showPopSelectFreightBox" + pos).html('')}});
}

function openColorBox(modalName, params) {
  if (typeof(params) == "undefined") {
    params = "";
  }
  switch (modalName) {
    case "mail_reminder_begin":
      params= "document_number.xhtml?" + params + "&operationType=mail_reminder";
      window.location.href = params;
    break;

    case "mail_reminder_end":      
      params ="mail_reminder.xhtml?" + params;
      window.location.href = params;
    break;
    case "mail_change_begin":
      params = "document_number.xhtml?" + params+ "&operationType=mail_change";
      window.location.href = params;
    break;

    case "mail_change_end":
      params= "mail_change.xhtml?" + params;
      window.location.href = params;
    break;

    case "password_reminder":
      params="popup/password_reminder.xhtml?" + params;
      $.colorbox({href:params});
    break;
  }
};
