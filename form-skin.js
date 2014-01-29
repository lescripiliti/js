function setupMaskSkin() {
    if ($('.check-skin input').length) {
        
        $('.check-skin').each(function(){ 
            $(this).removeClass('on');
        });
        $('.check-skin input:checked').each(function(){ 
            $(this).parent('label').addClass('on');
        });                
    }
    if ($('.radio-skin input').length) {
        $('.radio-skin').each(function(){ 
            $(this).removeClass('on');
        });
        $('.radio-skin input:checked').each(function(){ 
            $(this).parent('label').addClass('on');
        });
    }
}