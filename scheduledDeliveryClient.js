/**
 * Scheduled Delivery client library.
 * 
 
 * Dependencies:
 *   - jQuery 1.3.2 (or newer)
 *   - jQuery UI 1.10.3 (or newer)
 *   - ckoutRestServices.js
 *   - acec.js
 *   
 * TWiki:
 *   https://lab.accurate.com.br/twiki/bin/view/Main/AcecTechnicalSpecificationsDeliverySchedule#scheduled_DeliveryClient_js
 *   
 * Author: Felipe Saab
 */
function ScheduledDeliveryClient() {
  
  /*
   * GLOBAL ATTRIBUTES
   */
  var _this = this; // fix js 'this bug'
  
  _this.initialized = false;
  _this.isScheduledDeliverySelected = false; // is the selected delivery the SCH?
  _this.isScheduledDeliveryDateSelected = false; // is the scheduled delivery date chosen?
  _this.isScheduledDeliverySlotSelected = false; // is the scheduled delivery slot chosen?
  
  _this.scheduledDeliveryPanelSelector; // Selector of the div that contains scheduled delivery objects
  _this.datePickerSelector; // Selector of the div that will become the date picker
  _this.slotPanelSelector; // Selector of the div that will display the slots
  _this.selectButtonSelector; // Selector of the select button
  
  _this.loader; // Name of the loader to call showLoader(_this.loader)
  
  _this.possibleDates; // Array of the possible schedule dates
  _this.possibleSlots; // Array of the possible slots of the selected date
  
  // ---------------------------------
  // FUNCTIONS
  // ---------------------------------
  
  /**
   * Init this class providing some configuration parameters.
   * 
   * @param scheduledDeliveryPanelSelector - JQuery selector to retrieve the div that contains the scheduled delivery stuff. 
   *                                          This div will be showed (display:block) for deliveryTye = 'SCH' or hidden (display:none) for deliveryType != 'SCH'. 
   * @param datePickerSelector - JQuery selector to retrive the div that will become the datePicker.
   * @param slotPanelSelector - JQuery selector to retrive the div that will display the slots.
   */
  this.init = function(scheduledDeliveryPanelSelector, datePickerSelector, slotPanelSelector, selectButtonSelector, loader) {
    
    _this.scheduledDeliveryPanelSelector = scheduledDeliveryPanelSelector;
    _this.datePickerSelector = datePickerSelector;
    _this.slotPanelSelector = slotPanelSelector;
	_this.selectButtonSelector = selectButtonSelector;
    _this.loader = loader;
    
    _this.possibleDates = new Array();
    _this.possibleSlots = new Array();
    
    _this.isScheduledDeliverySelected = false;
    _this.isScheduledDeliveryDateSelected = false;
    _this.isScheduledDeliverySlotSelected = false;
    _this.initialized = true;
  }
  
  /**
   * 1 - Load the possible dates to schedule the delivery.
   * 2 - Create the datepicker with the possible dates.
   * 3 - Show the hidden div to the user be able to choose a date.
   * 
   * @param deliveryType - Delivery Type of the selected freight. This function will only look for possible dates if the deliveryType is 'SCH'.
   */
  this.prepareScheduledDelivery = function(deliveryType) {
  
    if (deliveryType == 'SCH') {
      if (!_this.initialized) {
        alert('scheduled delivery client library not initialized!');
      } else {
        
        _this.isScheduledDeliverySelected = true;
        _this.isScheduledDeliveryDateSelected = false;
        _this.isScheduledDeliverySlotSelected = false;
        
        // Show loader 
        showLoader(_this.loader);
        
        // Send an ajax request to get the possible schedule dates
        ckoutRestServices.prepareScheduledDelivery(_this.prepareScheduledDeliveryCallback);
      }
    } else {
      
      // If the user have already chosen the slot, erase it..
      _this.cleanSelectedSlot();
      
      // If the user selected Normal, Express, or other than Scheduled then hide the schedule panel
      $(_this.scheduledDeliveryPanelSelector).fadeOut(300,function(){
        _this.onHide();
      });
	  
	  // Remove the custom class of the select button
	  $(_this.selectButtonSelector).removeClass('btnEntregaAgendada');
      
      _this.isScheduledDeliverySelected = false;
      _this.isScheduledDeliveryDateSelected = false;
      // _this.isScheduledDeliverySlotSelected = false; This flag will be adjusted in "_this.cleanSelectedSlot();" flow
    }
  }
  
  /**
   * Callback of the prepareScheduledDelivery function.
   * 
   * @param jsonResponse - JSON containing the possible dates. The dates are represented as milisenconds.
   *                      Ex: { "possibleScheduleDates" : [1029381023, 19823019230], "messages" : [] } 
   */
  this.prepareScheduledDeliveryCallback = function(jsonResponse) {
    // Init
    _this.possibleDates = new Array();

    // Hide the loader image
    hideLoader();
    
    // Has any error happened?
    if (jsonResponse.messages.length > 0) {

      alert(jsonResponse.messages[0].summary);
      
    } else {
      
      // Store the possible dates as Date objectsposition:fixed; top:10px; left:10px;"
      for (var i = 0; i < jsonResponse.possibleScheduleDates.length; i++) {
        _this.possibleDates[i] = new Date(jsonResponse.possibleScheduleDates[i]);
      }
	  
	  // Adjust the language of the date picker
	  var language = window.navigator.userLanguage || window.navigator.language;
	  if (language != undefined) {
  	    if ($.datepicker.regional[language] == undefined) {
	      language = language.substr(0, language.indexOf('-'));
		  if ($.datepicker.regional[language] == undefined) {
  		    language = 'pt-BR';
		  }
	    }
	    $.datepicker.setDefaults(
	      $.extend(
		    {'dateFormat':'dd/mm/yy'},
	        $.datepicker.regional[language]
		  )
	    );
	  }
  
      // Create the date picker
      $(_this.datePickerSelector).datepicker({
        beforeShowDay: _this.isPossibleScheduleDate, // event to enable or disable a date
        onSelect: _this.searchDateSlots, // event that handle the selection of a date
        defaultDate: new Date(), // first date selected
        dateFormat: 'dd/mm/yy' // date format pattern equivalent to dd/MM/yyyy
      });
      
      // Finally, show the schedule panel
      $(_this.scheduledDeliveryPanelSelector).css('display', 'block');
      //$(_this.scheduledDeliveryPanelSelector).fadeIn(300);
      _this.onShow();
	  
	  // Add a custom class in the select button
	  $(_this.selectButtonSelector).addClass('btnEntregaAgendada');
      
      // Search the slots of the default date
	  /*
      var day = _this.possibleDates[0].getDate();
      var month = _this.possibleDates[0].getMonth() + 1;
      var year = _this.possibleDates[0].getFullYear();
      _this.searchDateSlots(day + '/' + month + '/' + year);*/
    }
  }

  /**
    Callback when calendar is shown
    @param funtion
  */

  this.onShow = function()
  {
    
  }
  this.onHide= function()
  {
    
  }
  
  /**
   * Event that check if the datepicker dates are enabled or not.
   * 
   * @param date - Date to check
   */
  this.isPossibleScheduleDate = function(date) {
    
    // If the date is within the possibleDates, then it is enabled
    for (var i = 0; i < _this.possibleDates.length; i++) {
      if (date.getTime() == _this.possibleDates[i].getTime()) {
        return [true, ''];
      }
    }
    
    // Otherwise, it is disabled
    return [false, ''];
  }
  
  /**
   * Event that retrieve the slots of a date.
   * 
   * @param date - Date to retrieve the slots
   */
  this.searchDateSlots = function(date) {
    // Show loader 
    showLoader(_this.loader);
    
    // temporarily disable the slots
    $('ul.slot-list li').each(function() {
      $(this).attr("class", "slot-list-item-unavailable");
    });
    _this.isScheduledDeliverySlotSelected = false;
    
    ckoutRestServices.getSlotsByDate(date, _this.searchDateSlotsCallback);
  }
  
  /**
   * Callback of the searchDateSlots function.
   * Create the HTML of the list of slots and put it into the div represented by slotPanelSelector.
   * 
   * @param jsonResponse - JSON containing the slots for the date. Ex
   * {
          "possibleSlots": [
              {
                  "slotSalesId": "332",
                  "startTime": "08:00",
                  "endTime": "12:00",
                  "slotAvailable": "9999"
              },
              {
                  "slotSalesId": "333",
                  "startTime": "13:00",
                  "endTime": "18:00",
                  "slotAvailable": "9999"
              },
              {
                  "slotSalesId": "334",
                  "startTime": "19:00",
                  "endTime": "22:00",
                  "slotAvailable": "9999"
              }
          ],
          "messages": []
      }
   */
  this.searchDateSlotsCallback = function(jsonResponse) {
    hideLoader();
    
    _this.possibleSlots = new Array();
    
    // Has any error happened?
    if (jsonResponse.messages.length > 0) {
      
      alert(jsonResponse.messages[0].summary);
      $(_this.slotPanelSelector).html('');
      
      _this.isScheduledDeliveryDateSelected = false;
      
    } else {
      
      var htmlList = '<ul class="slot-list">';
      
      for (var i = 0; i < jsonResponse.possibleSlots.length; i++) {
        var slot = jsonResponse.possibleSlots[i];
        _this.possibleSlots[i] = slot;
          
        if (slot.slotAvailable > 0) { 
          htmlList += '<li class="slot-list-item">';
          htmlList += ' <input type="radio" class="slot-list-item-radio" name="scheduled-delivery-slot" onclick="scheduledDeliveryClient.chooseSlot(\''+slot.slotSalesId+'\');" />';
          htmlList += ' <span class="slot-list-item-text">' + slot.name + '</span>';
          htmlList += '</li>';
        }
        else {
          htmlList += '<li class="slot-list-item-unavailable">';
          htmlList += ' <input type="radio" class="slot-list-item-radio" name="scheduled-delivery-slot" disabled />';
          htmlList += ' <span class="slot-list-item-text">' + slot.name + '</span>';
          htmlList += '</li>';
        } 

      }
      
      htmlList += '</ul>';
      
      $(_this.slotPanelSelector).html(htmlList);


      
      _this.isScheduledDeliveryDateSelected = true;
    }
  }
  
  /**
   * Reserve the selected slot in the session for the user.
   * 
   *  @param slotId - Slot Id
   */
  this.chooseSlot = function(slotId) {
    // Show loader 
    showLoader(_this.loader);
    
    ckoutRestServices.chooseSlot(slotId, _this.chooseSlotCallback);
  }
  
  /**
   * Callback of the chooseSlotCallback function.
   * 
   *  @param jsonResponse - JSON containing the messages in case of errors.
   */
  this.chooseSlotCallback = function(jsonResponse) {
    hideLoader();
    
    if (jsonResponse.messages.length > 0) {
      
      alert(jsonResponse.messages[0].summary);
      _this.isScheduledDeliverySlotSelected = false;
    } else {
      
      _this.isScheduledDeliverySlotSelected = true;
    }
  }
  
  /**
   * If the user have already chosen a slot, clean it
   */
  this.cleanSelectedSlot = function() {
    if (_this.isScheduledDeliverySlotSelected) {
      ckoutRestServices.chooseSlot('-1', _this.cleanSelectedSlotCallback);
    } else {
      _this.isScheduledDeliverySlotSelected = false;
    }
  }
  
  /**
   * Callback of the cleanSelectedSlot function.
   * 
   *  @param jsonResponse - JSON containing the messages in case of errors.
   */
  this.cleanSelectedSlotCallback = function(jsonResponse) {
    if (jsonResponse.messages.length > 0) {
      
      alert(jsonResponse.messages[0].summary);
    } else {
      
      _this.isScheduledDeliverySlotSelected = false;
    }
  }
  
  /**
   * Validate if the scheduled delivery is ok to go to the next cart step (payment).
   */
  this.validateScheduledDelivery = function() {
    if (_this.isScheduledDeliverySelected) {
    
      var msg = '';
      if (!_this.isScheduledDeliveryDateSelected) {
        msg = 'Por favor selecione uma data para a entrega.';
      } else if (!_this.isScheduledDeliverySlotSelected) {
        msg = 'Por favor selecione um período para a entrega.';
      }
      
      if (msg != '') {
        alert(msg);
        return false;
      }
    }
    
    return true;
  }
  
}

// make an instance of ScheduledDeliveryClient available for every place that imports it
var scheduledDeliveryClient = new ScheduledDeliveryClient();
