$( document ).ready( function() {
  $("#optUF").html('<option value="-1">Selecione</option>');
  jQuery.each( groups.states, function( y, state ) {
    $("#optUF").append('<option value="'+y+'">' + state.name + '</option>');
  });
  
  $("#optUF").change(function () {
    $("#optCity").html('<option value="-1">Selecione</option>');
    if($("#optUF").val() == -1) {
      $("#optNeigh").html('<option value="-1">Selecione</option>');
      $("#optCity").html('<option value="-1">Selecione</option>');
      return;
    }
    jQuery.each( groups.states[$("#optUF").val()].city, function( y, city ) {
      $("#optCity").append('<option value="'+y+'">' + city.name + '</option>');
    });
  });

  $("#optCity").change(function () {
    $("#optNeigh").html('<option value="-1">Selecione</option>');
    if($("#optCity").val() == -1 || $("#optUF").val() == -1) return;
    jQuery.each( groups.states[$("#optUF").val()].city[$("#optCity").val()].quarter, function( y, quarter ) {
      $("#optNeigh").append('<option value="'+y+'">' + quarter + '</option>');
    });
  });

  $('#busca').click( function() {
    if($('#optUF').val() !=-1){
      var state   = $('#optUF :selected').text();
    }
    if($('#optCity').val() !=-1){
      var city    = $('#optCity :selected').text();
    }
    if($('#optNeigh').val() !=-1){
      var quarter = $('#optNeigh :selected').text();
    }
    var url = '/encontrar-lojas';
    if ( state != null && state != '' ) {
      url += '/' + state;
    }
    if ( city != null && city != '' ) {
      url += '/' + city;
    }
    if ( quarter != null && quarter != '' ) {
      url += '/' + quarter;
    }
    $(this).attr( 'href', '' );
    $(this).attr( 'href', url );
  });
});