// codigo responsavel por limpar os campos e mostrar as divs para re-pesquisar o valor do frete para outro cep
$(document).ready(function(){
  outrocep();
});

function outrocep() {
  $("#outrocep").click(function(){
    // volta a mensagem de disponibilidade
    for (i= 0; i < skusDados.skus.length ;i++) {
      msgDisp = $("#hiddenDispImediata"+ skusDados.skus[i]["id"]).val();
      $("#uda"+ skusDados.skus[i]["id"]).text(msgDisp);
    }
    
    // quando nao tem varios skus
    msgDisp = $("#hiddenDispImediata").val();
    if (msgDisp != null) {
      $("#CepSingleDiv").text(msgDisp);
    }
    
    $("#cepValue1").attr("value","");
    $("#cepValue2").attr("value","");
    
    $("#cepcalculado").hide();
    $("#cepcalc").show();
    
    hideLoader();
  });
}

// funcao que valida o cep
function validateCep(cep)
{
  //valida se o cep foi preenchido
  if(cep == "" || cep.length < 8)
  {
    // adicionas os li a lista de erros
    $("#listaErrosLightBox").append("<li> Erro de Preenchimento </li>");  
    $("#listaErrosLightBox").append("<li> &#201; necess&#225;rio o preenchimento do campo CEP  </li>");

    // chama a funcao que mostrar os erro no lightbox
    showErrorColorBox();
    
    return false;
  }
  
  // valida se o cep possui apenas numero          
  validaCep = "" + cep.match("[0-9]+");

    //valida se o cep foi preenchido
  if(validaCep.length < 8)
  {
    // adicionas os li a lista de erros
    $("#listaErrosLightBox").append("<li> Erro de Preenchimento </li>");  
    $("#listaErrosLightBox").append("<li> Campo CEP preenchimento incorretamente </li>");

    // chama a funcao que mostrar os erro no lightbox
    showErrorColorBox();

    return false;
  }    
  return true;
}


// funcao que calcula o frete a partir do cep
// a funcao deve receber como parametro:
// CEP -> no formato decimal com 8 digitos ex: 99999999
// SKUS -> Um objeto JSON que contem um array de skus. Exemplo de forma {"skus":[{"sku":375510},{"sku":378507},{"sku":372794}]}
// groupProd -> flag indica se o frete deve ser calculado individualmente por produto ou um unico frete para todos os skus

// variavel utilizada para setar o retorno da chamada assincrona

function calculateFreight(cep,skus,individual,fulFillData){

   var fulFillData = fulFillData;
  
  // monta a url de requisicao
   url = '/cepservice?cep=' + cep + '&individual=' + individual + '&skus=' + skus + '&format=json&jsoncallback=?';            
   // efetua a chamada ajax   
   xmlhttp = $.getJSON(url,cep, function(data)
   {
    // verifica se ocorreu algum erro no processamento do cep
    if(data.exception)
    {         
      // adicionas os li a lista de erros
      $("#listaErrosLightBox").append("<li> Ocorreu um erro </li>");  
      $("#listaErrosLightBox").append("<li>" + data.msgErro +"</li>");

      // chama a funcao que mostrar os erro no lightbox
      showErrorColorBox();  
    }
    else
    {
      cepView = cep.substring(0,cep.length-3) + "-" +cep.substring(cep.length-3,cep.length);

      (fulFillData)(cepView, data);
    }
   });
}

// funcao que preenche os campos na tela
// a funcao recebe um como parametro um objeto JSon com o formato exemplificado abaixo:
// {"precoFrete":'R$5,00',"skus":[{"sku":375510,"tempoEntrega":15,"cidadeEntrega":Sao Paulo},{"sku":375510,"tempoEntrega":15,"cidadeEntrega":Sao Paulo}]}
// os divs q deveram ser preenchidos deverao possuir um id no seguinte formato: id=uda+ sku, exemplo id="uda375510"
// desta forma a funcao ira percorrer o array de skus recebidos e ira preencher as divs com o tempo de entrega e cidade de entrage respectivos
function fulfillCepDiv(cep,skusFreight){
  var preco = skusFreight.precoFrete;
  if (preco == "R$0,00") {
    preco = "Frete Grátis";
  }
  // seta o cep q esta sendo calculado o valor do frete
  $("#spanCepCalculado").text(cep);

  // seta o cep q esta sendo calculado o valor do frete
  $("#spanValorCep").text(preco);

  // itera a lista de precos de frete retornada
  for(i= 0; i < skusFreight.skus.length ;i++)
  {
    msgTempoEntrega = "Entrega em " + skusFreight.skus[i]["tempoEntrega"] +" dias úteis para " + skusFreight.skus[i]["cidadeEntrega"];
    $("#uda"+ skusFreight.skus[i]["sku"]).text(msgTempoEntrega);
  }   

  // esconde o div com os inputs do cep
  $("#cepcalc").hide();      

  // mostra o div com o valor do cep calculado
   $("#cepcalculado").show();  
}

function fulfillCepSingleDiv(cep,skusFreight){
  var preco = skusFreight.precoFrete;
  if (preco == "R$0,00") {
    preco = "Frete Grátis";
  }
  
  // seta o cep q esta sendo calculado o valor do frete
  $("#spanCepCalculado").text(cep);

  // seta o cep q esta sendo calculado o valor do frete
  $("#spanValorCep").text(preco);

  msgTempoEntrega = "Entrega em " + skusFreight.skus[0]["tempoEntrega"] +" dias úteis para " + skusFreight.skus[0]["cidadeEntrega"];
  $("#CepSingleDiv").text(msgTempoEntrega);
  
  // esconde o div com os inputs do cep
  $("#cepcalc").hide();

  // mostra o div com o valor do cep calculado
   $("#cepcalculado").show();
}

function fulfillCepCorreios(cep, data) {
  var html = 
    '<p class="disp" id="uda1026">Entrega para @{cidade}</p>' +
    '<ul>' +
      '<li><p>CEP calculado:<span class="destino" id="spanCepCalculado">@{cep}</span></p></li>' +
      '<li>' +
        '@{labelValorFrete}' +
        '<ul class="mult-frete">' +
        '</ul>' +
      '</li>' +
    '</ul>' +
    '<a tabindex="6" href="#" id="outrocep" class="btnStandard btnCep2">Pesquisar outro CEP</a>';
        
  html = html.replace('@{cep}', cep);
  html = html.replace('@{cidade}', data.skus[0].cidadeEntrega);
  
 
  var freteTmpl = '';
  var correiosEnabled = false; // TODO: deschumbar esse valor e ler da general_parameter 
  if (correiosEnabled) {
    freteTmpl = '<li><span class="frete-type"><strong>@{tipoFrete}</strong> (@{tempoEntrega})</span> <span id="spanValorCep" class="frete">@{precoFrete}</span></li>';
    html = html.replace('@{labelValorFrete}', '<p>Valor do frete:</p>');
  } else {
    freteTmpl = '<li><span class="frete-type">Entrega em @{tempoEntrega}</span> <span id="spanValorCep" class="frete">@{precoFrete}</span></li>';
    // ajuste que adapta correios para transportadoras nao-correios
    data.fretes = [];
    data.fretes[0] = {};
    data.fretes[0].precoFrete = data.precoFrete;
    data.fretes[0].tempoEntrega = data.skus[0].tempoEntrega;
    html = html.replace('@{labelValorFrete}', '');
  }
  
  html = $(html);
  
  for (var i in data.fretes) {
    var frete = data.fretes[i];
    var linhaFrete = freteTmpl;
    linhaFrete = linhaFrete.replace('@{tipoFrete}', frete.tipoFrete);
    linhaFrete = linhaFrete.replace('@{precoFrete}', (frete.precoFrete == 'R$ 0,00' ? 'Frete Gr\xe1tis' : frete.precoFrete));
    linhaFrete = linhaFrete.replace('@{tempoEntrega}', frete.tempoEntrega == 1 ? '1 dia útil' : frete.tempoEntrega + ' dias úteis');
    $('.mult-frete', html).append(linhaFrete);
  }
   
  $('#cepcalculado').html(html);

  // esconde o div com os inputs do cep
  $('#cepcalc').hide();
  
  $('#loader-calculacep').hide();
    
  // mostra o div com o valor do cep calculado
  $('#cepcalculado').show();
  
  outrocep();
}