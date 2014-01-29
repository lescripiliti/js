/* ACEC Minified JS - 1-bottom - Mon Jun 21 12:00:00 BRT 2010 */ 
/* 01-Alert.js */ 

var path_image_item = '/images/cadastro-erro-validacao.jpg';

var win_width = 0;
var scrollToLeft = 0;
var win_height = 0;
var scrollToBottom = 0;

var alert_box_width = 0;
var alert_box_height = 0;

//on page ready load image
$(document).ready(function () {

AlertStart();
});


function AlertStart() {
imgLoader = new Image(); // preload path_image_item
//imgLoader.src = path_image_item;

win_width = $(window).width();
scrollToLeft = $(window).scrollLeft();
win_height = $(window).height();
scrollToBottom = $(window).scrollTop();

if ($(".ListaErrosOcorridos").size() > 0) {
var params_li = new Array();
var title = "";
$("ul.ListaErrosOcorridos li").each(function (index) {
if (index == 0)
title = $($("ul.ListaErrosOcorridos li")[index]).html();
else
params_li.push($($("ul.ListaErrosOcorridos li")[index]).html());
});

if (params_li.length > 0) {
ShowMessage(title, params_li);
$(".ListaErrosOcorridos").text("");
}

}
}


function ShowMessage(title, params) {

var box_height = 95; //Tamanho m�nimo do box
var box_width = 300; //era par�metro ficou fixo.

alert_box_width = box_width;
alert_box_height = box_height;

var color = "#000000";
var offset = {};
var options = {
margin: 1,
border: 1,
padding: 1,
scroll: 0
};

var resizeTimerAlert = null;
$(window).bind('resize', function () {
if (resizeTimerAlert) clearTimeout(resizeTimerAlert);
resizeTimerAlert = setTimeout("CenterDivAlert()", 100);
});

var div_modal = document.getElementById('#TB_window_alert');

if (div_modal == null) {
$('body').append("<div id='TB_window_alert' style='background-color:Transparent; margin-left: 0px;position: absolute;z-index:1500;display:none;width:" + box_width + ";height:auto;margin-top: 0px;' ></div>");
}

$.dimScreen(500, 0.7, color, function () {
$('#TB_window_alert').fadeIn(500);
});

var offset = {}
offset = $("#TB_window_alert").offset({ scroll: false })

X_left = offset.left + box_width - 16;
X_top = offset.top;


// inicio Conteudo de layout do alert

var strHtml = "<div class='topcorner'></div>";
strHtml += "    <div class='contentAlertError'>";
strHtml += "     <span id='AlertTitle'></span>";
strHtml += "       <ul id='AlertConteudo'></ul>";
strHtml += "       <div class='botaoAlertError' id='btAlertClose'>";
strHtml += "       	 <a class='btArrowAlertError'  href='javascript:void(0);'>OK</a> ";
strHtml += "           <div class='arrow'></div>";
strHtml += "       </div>";
strHtml += "    </div>";
strHtml += "    <span class='bottomcorner'></span>"; 

$("#TB_window_alert").append(strHtml);

//Fim     

$('#btAlertClose').click(function () {        
// 
$('#TB_window_alert').fadeOut(500);
$('#TB_window_alert').remove();
$(".ListaErrosOcorridos").text("");
$.dimScreenStop();
});


//Append Params
var strParams = "";
for (var i = 0; i < params.length; i++) {
strParams += "<li> " + params[i] + "</li>";
}
$("#AlertTitle").html(title);
$("#AlertConteudo").html(strParams);


if ($('#TB_window_alert').height() < box_height) {

$('#TB_window_alert').css({ height: box_height + 'px' });
$('#tabelaalerta').css({ height: box_height - 46+ 'px' });


} else {
box_height = $('#TB_window_alert').height();
alert_box_height = box_height;

}


$('#TB_window_alert').css({ left: ((((win_width - box_width) / 2)) + scrollToLeft) + 'px',
top: ((((win_height - box_height) / 2)) + scrollToBottom) + 'px',
border: '0px',
width: box_width + 'px'
});

}

function CenterDivAlert() {

win_width = $(window).width();
scrollToLeft = $(window).scrollLeft();
win_height = $(window).height();
scrollToBottom = $(window).scrollTop();

$('#TB_window_alert').css({ left: ((((win_width - alert_box_width) / 2)) + scrollToLeft) + 'px', top: ((((win_height - alert_box_height) / 2)) + scrollToBottom) + 'px' }); 
}


/* 02-dimmer.js */ 
//dimScreen()
//by Brandon Goldman
//edited by Vin�cius Batista de Souza.
jQuery.extend({
//dims the screen
dimScreen: function (speed, opacity, color, callback) {

var resizeTimer = null;
$(window).bind('resize', function () {
if (resizeTimer) clearTimeout(resizeTimer);
resizeTimer = setTimeout("$.resizeDimmer()", 100);
});


if (color == undefined || color == '')
color = "#FFFFFF";

if (jQuery('#__dimScreen').size() > 0) return;

if (typeof speed == 'function') {
callback = speed;
speed = null;
}

if (typeof opacity == 'function') {
callback = opacity;
opacity = null;
}

if (speed < 1) {
var placeholder = opacity;
opacity = speed;
speed = placeholder;
}

if (opacity >= 1) {
var placeholder = speed;
speed = opacity;
opacity = placeholder;
}

var isIe = false;

if ($.browser.msie && $.browser.version >= 8) {
isIe = true;
}

var minusW = 0;
var minusH = 0;

if (isIe) {
//minusH = 4;
//minusW = 21;
}


speed = (speed > 0) ? speed : 500;
opacity = (opacity > 0) ? opacity : 0.5;
return jQuery('<div></div>').attr({
id: '__dimScreen'
, fade_opacity: opacity
, speed: speed
}).css({
background: color
, height: ($(document).height() - minusH) + 'px'
, left: '0px'
, opacity: 0
, position: 'absolute'
, top: '0px'
, width: ($(document).width() - minusW) + 'px'
, zIndex: 1060
, overflow: 'hidden'
}).appendTo(document.body).fadeTo(speed, 0.7, callback);
},

//stops current dimming of the screen
dimScreenStop: function (callback) {
var x = jQuery('#__dimScreen');
var opacity = x.attr('fade_opacity');
var speed = x.attr('speed');
x.fadeOut(speed, function () {
x.remove();
if (typeof callback == 'function') callback();
});
},

resizeDimmer: function () {
var isIe = false;

if ($.browser.msie && $.browser.version >= 8) {
isIe = true;
}

var minusW = 0;
var minusH = 0;

if (isIe) {
minusH = 4;
minusW = 21;
}

$('#__dimScreen').css({
height: ($(document).height() - minusH) + 'px'
, width: ($(document).width() - minusW) + 'px'
});
}
});

/* 03-jquery.validate.js */ 
/*
* jQuery validation plug-in 1.5.5
*
* http://bassistance.de/jquery-plugins/jquery-plugin-validation/
* http://docs.jquery.com/Plugins/Validation
*
* Copyright (c) 2006 - 2008 Jörn Zaefferer
*
* $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function($) {

$.extend($.fn, {
// http://docs.jquery.com/Plugins/Validation/validate
validate: function(options) {

// if nothing is selected, return nothing; can't chain anyway
if (!this.length) {
options && options.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
return;
}

// check if a validator for this form was already created
var validator = $.data(this[0], 'validator');
if (validator) {
return validator;
}

validator = new $.validator(options, this[0]);
$.data(this[0], 'validator', validator);

if (validator.settings.onsubmit) {

// allow suppresing validation by adding a cancel class to the submit button
this.find("input, button").filter(".cancel").click(function() {
validator.cancelSubmit = true;
});

// when a submitHandler is used, capture the submitting button
if (validator.settings.submitHandler) {
this.find("input, button").filter(":submit").click(function() {
validator.submitButton = this;
});
}

// validate the form on submit
this.submit(function(event) {
if (validator.settings.debug)
// prevent form submit to be able to see console output
event.preventDefault();

function handle() {
if (validator.settings.submitHandler) {
if (validator.submitButton) {
// insert a hidden input as a replacement for the missing submit button
var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
}
validator.settings.submitHandler.call(validator, validator.currentForm);
if (validator.submitButton) {
// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
hidden.remove();
}
return false;
}
return true;
}

// prevent submit for invalid forms or custom submit handlers
if (validator.cancelSubmit) {
validator.cancelSubmit = false;
return handle();
}
if (validator.form()) {
if (validator.pendingRequest) {
validator.formSubmitted = true;
return false;
}
return handle();
} else {
validator.focusInvalid();
return false;
}
});
}

return validator;
},
// http://docs.jquery.com/Plugins/Validation/valid
valid: function() {
if ($(this[0]).is('form')) {
return this.validate().form();
} else {
var valid = true;
var validator = $(this[0].form).validate();
this.each(function() {
valid &= validator.element(this);
});
return valid;
}
},
// attributes: space seperated list of attributes to retrieve and remove
removeAttrs: function(attributes) {
var result = {},
$element = this;
$.each(attributes.split(/\s/), function(index, value) {
result[value] = $element.attr(value);
$element.removeAttr(value);
});
return result;
},
// http://docs.jquery.com/Plugins/Validation/rules
rules: function(command, argument) {
var element = this[0];

if (command) {
var settings = $.data(element.form, 'validator').settings;
var staticRules = settings.rules;
var existingRules = $.validator.staticRules(element);
switch (command) {
case "add":
$.extend(existingRules, $.validator.normalizeRule(argument));
staticRules[element.name] = existingRules;
if (argument.messages)
settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
break;
case "remove":
if (!argument) {
delete staticRules[element.name];
return existingRules;
}
var filtered = {};
$.each(argument.split(/\s/), function(index, method) {
filtered[method] = existingRules[method];
delete existingRules[method];
});
return filtered;
}
}

var data = $.validator.normalizeRules(
$.extend(
{},
$.validator.metadataRules(element),
$.validator.classRules(element),
$.validator.attributeRules(element),
$.validator.staticRules(element)
), element);

// make sure required is at front
if (data.required) {
var param = data.required;
delete data.required;
data = $.extend({ required: param }, data);
}

return data;
}
});

// Custom selectors
$.extend($.expr[":"], {
// http://docs.jquery.com/Plugins/Validation/blank
blank: function(a) { return !$.trim(a.value); },
// http://docs.jquery.com/Plugins/Validation/filled
filled: function(a) { return !!$.trim(a.value); },
// http://docs.jquery.com/Plugins/Validation/unchecked
unchecked: function(a) { return !a.checked; }
});

// constructor for validator
$.validator = function(options, form) {
this.settings = $.extend({}, $.validator.defaults, options);
this.currentForm = form;
this.init();
};

$.validator.format = function(source, params) {
if (arguments.length == 1)
return function() {
var args = $.makeArray(arguments);
args.unshift(source);
return $.validator.format.apply(this, args);
};
if (arguments.length > 2 && params.constructor != Array) {
params = $.makeArray(arguments).slice(1);
}
if (params.constructor != Array) {
params = [params];
}
$.each(params, function(i, n) {
source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
});
return source;
};

$.extend($.validator, {

defaults: {
messages: {},
groups: {},
rules: {},
errorClass: "error",
validClass: "valid",
errorElement: "label",
focusInvalid: true,
errorContainer: $([]),
errorLabelContainer: $([]),
onsubmit: true,
ignore: [],
ignoreTitle: false,
onfocusin: function(element) {
this.lastActive = element;

// hide error label and remove error class on focus if enabled
if (this.settings.focusCleanup && !this.blockFocusCleanup) {
this.settings.unhighlight && this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
this.errorsFor(element).hide();
}
},
onfocusout: function(element) {
if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
this.element(element);
}
},
onkeyup: function(element) {
if (element.name in this.submitted || element == this.lastElement) {
this.element(element);
}
},
onclick: function(element) {
if (element.name in this.submitted)
this.element(element);
},
highlight: function(element, errorClass, validClass) {
$(element).addClass(errorClass).removeClass(validClass);
},
unhighlight: function(element, errorClass, validClass) {
$(element).removeClass(errorClass).addClass(validClass);
}
},

// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
setDefaults: function(settings) {
$.extend($.validator.defaults, settings);
},

messages: {
required: "Campo obrigat&oacute;rio.",
remote: "Preencha corretamente.",
email: "Insira um e-mail v&aacute;lido..",
url: "Insira uma URL v&aacute;lida.",
date: "Insira uma data v&aacute;lida.",
dateISO: "Please enter a valid date (ISO).",
dateDE: "Bitte geben Sie ein gültiges Datum ein.",
number: "Preencha corretamente.",
ceperror: "Preencha o CEP corretamente",
numberDE: "Bitte geben Sie eine Nummer ein.",
digits: "Please enter only digits",
creditcard: "Please enter a valid credit card number.",
equalTo: "Please enter the same value again.",
accept: "Please enter a value with a valid extension.",
maxlength: $.validator.format("Please enter no more than {0} characters."),
minlength: $.validator.format("Please enter at least {0} characters."),
rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
range: $.validator.format("Please enter a value between {0} and {1}."),
max: $.validator.format("Please enter a value less than or equal to {0}."),
min: $.validator.format("Please enter a value greater than or equal to {0}."),
cpfcnpj: "Informe um CPF / CNPJ v&aacute;lido."
},

autoCreateRanges: false,

prototype: {

init: function() {
this.labelContainer = $(this.settings.errorLabelContainer);
this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
this.submitted = {};
this.valueCache = {};
this.pendingRequest = 0;
this.pending = {};
this.invalid = {};
this.reset();

var groups = (this.groups = {});
$.each(this.settings.groups, function(key, value) {
$.each(value.split(/\s/), function(index, name) {
groups[name] = key;
});
});
var rules = this.settings.rules;
$.each(rules, function(key, value) {
rules[key] = $.validator.normalizeRule(value);
});

function delegate(event) {
var validator = $.data(this[0].form, "validator");
validator.settings["on" + event.type] && validator.settings["on" + event.type].call(validator, this[0]);
}
$(this.currentForm)
.delegate("focusin focusout keyup", ":text, :password, :file, select, textarea", delegate)
.delegate("click", ":radio, :checkbox", delegate);

if (this.settings.invalidHandler)
$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
},

// http://docs.jquery.com/Plugins/Validation/Validator/form
form: function() {
this.checkForm();
$.extend(this.submitted, this.errorMap);
this.invalid = $.extend({}, this.errorMap);
if (!this.valid())
$(this.currentForm).triggerHandler("invalid-form", [this]);
this.showErrors();
return this.valid();
},

checkForm: function() {
this.prepareForm();
for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
this.check(elements[i]);
}
return this.valid();
},

// http://docs.jquery.com/Plugins/Validation/Validator/element
element: function(element) {
element = this.clean(element);
this.lastElement = element;
this.prepareElement(element);
this.currentElements = $(element);
var result = this.check(element);
if (result) {
delete this.invalid[element.name];
} else {
this.invalid[element.name] = true;
}
if (!this.numberOfInvalids()) {
// Hide error containers on last error
this.toHide = this.toHide.add(this.containers);
}
this.showErrors();
return result;
},

// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
showErrors: function(errors) {
if (errors) {
// add items to error list and map
$.extend(this.errorMap, errors);
this.errorList = [];
for (var name in errors) {
this.errorList.push({
message: errors[name],
element: this.findByName(name)[0]
});
}
// remove items from success list
this.successList = $.grep(this.successList, function(element) {
return !(element.name in errors);
});
}
this.settings.showErrors
? this.settings.showErrors.call(this, this.errorMap, this.errorList)
: this.defaultShowErrors();
},

// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
resetForm: function() {
if ($.fn.resetForm)
$(this.currentForm).resetForm();
this.submitted = {};
this.prepareForm();
this.hideErrors();
this.elements().removeClass(this.settings.errorClass);
},

numberOfInvalids: function() {
return this.objectLength(this.invalid);
},

objectLength: function(obj) {
var count = 0;
for (var i in obj)
count++;
return count;
},

hideErrors: function() {
this.addWrapper(this.toHide).hide();
},

valid: function() {
return this.size() == 0;
},

size: function() {
return this.errorList.length;
},

focusInvalid: function() {
if (this.settings.focusInvalid) {
try {
$(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus();
} catch (e) {
// ignore IE throwing errors when focusing hidden elements
}
}
},

findLastActive: function() {
var lastActive = this.lastActive;
return lastActive && $.grep(this.errorList, function(n) {
return n.element.name == lastActive.name;
}).length == 1 && lastActive;
},

elements: function() {
var validator = this,
rulesCache = {};

// select all valid inputs inside the form (no submit or reset buttons)
// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
return $([]).add(this.currentForm.elements)
.filter(":input")
.not(":submit, :reset, :image, [disabled]")
.not(this.settings.ignore)
.filter(function() {
!this.name && validator.settings.debug && window.console && console.error("%o has no name assigned", this);

// select only the first element for each name, and only those with rules specified
if (this.name in rulesCache || !validator.objectLength($(this).rules()))
return false;

rulesCache[this.name] = true;
return true;
});
},

clean: function(selector) {
return $(selector)[0];
},

errors: function() {
return $(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext);
},

reset: function() {
this.successList = [];
this.errorList = [];
this.errorMap = {};
this.toShow = $([]);
this.toHide = $([]);
this.formSubmitted = false;
this.currentElements = $([]);
},

prepareForm: function() {
this.reset();
this.toHide = this.errors().add(this.containers);
},

prepareElement: function(element) {
this.reset();
this.toHide = this.errorsFor(element);
},

check: function(element) {
element = this.clean(element);

// if radio/checkbox, validate first element in group instead
if (this.checkable(element)) {
element = this.findByName(element.name)[0];
}

var rules = $(element).rules();
var dependencyMismatch = false;
for (method in rules) {
var rule = { method: method, parameters: rules[method] };
try {
var result = $.validator.methods[method].call(this, element.value.replace(/\r/g, ""), element, rule.parameters);

// if a method indicates that the field is optional and therefore valid,
// don't mark it as valid when there are no other rules
if (result == "dependency-mismatch") {
dependencyMismatch = true;
continue;
}
dependencyMismatch = false;

if (result == "pending") {
this.toHide = this.toHide.not(this.errorsFor(element));
return;
}

if (!result) {
this.formatAndAdd(element, rule);
return false;
}
} catch (e) {
this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
+ ", check the '" + rule.method + "' method");
throw e;
}
}
if (dependencyMismatch)
return;
if (this.objectLength(rules))
this.successList.push(element);
return true;
},

// return the custom message for the given element and validation method
// specified in the element's "messages" metadata
customMetaMessage: function(element, method) {
if (!$.metadata)
return;

var meta = this.settings.meta
? $(element).metadata()[this.settings.meta]
: $(element).metadata();

return meta && meta.messages && meta.messages[method];
},

// return the custom message for the given element name and validation method
customMessage: function(name, method) {
var m = this.settings.messages[name];
return m && (m.constructor == String
? m
: m[method]);
},

// return the first defined argument, allowing empty strings
findDefined: function() {
for (var i = 0; i < arguments.length; i++) {
if (arguments[i] !== undefined)
return arguments[i];
}
return undefined;
},

defaultMessage: function(element, method) {
return this.findDefined(
this.customMessage(element.name, method),
this.customMetaMessage(element, method),
// title is never undefined, so handle empty string as undefined
!this.settings.ignoreTitle && element.title || undefined,
$.validator.messages[method],
"<strong>Warning: No message defined for " + element.name + "</strong>"
);
},

formatAndAdd: function(element, rule) {
var message = this.defaultMessage(element, rule.method);
if (typeof message == "function")
message = message.call(this, rule.parameters, element);
this.errorList.push({
message: message,
element: element
});
this.errorMap[element.name] = message;
this.submitted[element.name] = message;
},

addWrapper: function(toToggle) {
if (this.settings.wrapper)
toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
return toToggle;
},

defaultShowErrors: function() {
for (var i = 0; this.errorList[i]; i++) {
var error = this.errorList[i];
this.settings.highlight && this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
this.showLabel(error.element, error.message);
}
if (this.errorList.length) {
this.toShow = this.toShow.add(this.containers);
}
if (this.settings.success) {
for (var i = 0; this.successList[i]; i++) {
this.showLabel(this.successList[i]);
}
}
if (this.settings.unhighlight) {
for (var i = 0, elements = this.validElements(); elements[i]; i++) {
this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
}
}
this.toHide = this.toHide.not(this.toShow);
this.hideErrors();
this.addWrapper(this.toShow).show();
},

validElements: function() {
return this.currentElements.not(this.invalidElements());
},

invalidElements: function() {
return $(this.errorList).map(function() {
return this.element;
});
},

showLabel: function(element, message) {
var label = this.errorsFor(element);
if (label.length) {
// refresh error/success class
label.removeClass().addClass(this.settings.errorClass);

// check if we have a generated label, replace the message then
label.attr("generated") && label.html(message);
} else {
// create label
label = $("<" + this.settings.errorElement + "/>")
.attr({ "for": this.idOrName(element), generated: true })
.addClass(this.settings.errorClass)
.html(message || "");
if (this.settings.wrapper) {
// make sure the element is visible, even in IE
// actually showing the wrapped element is handled elsewhere
label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
}
if (!this.labelContainer.append(label).length)
this.settings.errorPlacement
? this.settings.errorPlacement(label, $(element))
: label.insertAfter(element);
}
if (!message && this.settings.success) {
label.text("");
typeof this.settings.success == "string"
? label.addClass(this.settings.success)
: this.settings.success(label);
}
this.toShow = this.toShow.add(label);
},

errorsFor: function(element) {
return this.errors().filter("[for='" + this.idOrName(element) + "']");
},

idOrName: function(element) {
return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
},

checkable: function(element) {
return /radio|checkbox/i.test(element.type);
},

findByName: function(name) {
// select by name and filter by form for performance over form.find("[name=...]")
var form = this.currentForm;
return $(document.getElementsByName(name)).map(function(index, element) {
return element.form == form && element.name == name && element || null;
});
},

getLength: function(value, element) {
switch (element.nodeName.toLowerCase()) {
case 'select':
return $("option:selected", element).length;
case 'input':
if (this.checkable(element))
return this.findByName(element.name).filter(':checked').length;
}
return value.length;
},

depend: function(param, element) {
return this.dependTypes[typeof param]
? this.dependTypes[typeof param](param, element)
: true;
},

dependTypes: {
"boolean": function(param, element) {
return param;
},
"string": function(param, element) {
return !!$(param, element.form).length;
},
"function": function(param, element) {
return param(element);
}
},

optional: function(element) {
return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
},

startRequest: function(element) {
if (!this.pending[element.name]) {
this.pendingRequest++;
this.pending[element.name] = true;
}
},

stopRequest: function(element, valid) {
this.pendingRequest--;
// sometimes synchronization fails, make sure pendingRequest is never < 0
if (this.pendingRequest < 0)
this.pendingRequest = 0;
delete this.pending[element.name];
if (valid && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
$(this.currentForm).submit();
} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
$(this.currentForm).triggerHandler("invalid-form", [this]);
}
},

previousValue: function(element) {
return $.data(element, "previousValue") || $.data(element, "previousValue", previous = {
old: null,
valid: true,
message: this.defaultMessage(element, "remote")
});
}

},

classRuleSettings: {
required: { required: true },
email: { email: true },
url: { url: true },
date: { date: true },
dateISO: { dateISO: true },
dateDE: { dateDE: true },
number: { number: true },
numberDE: { numberDE: true },
ceperror: { ceperror: true },
digits: { digits: true },
creditcard: { creditcard: true },
cpfcnpj: { cpfcnpj: true }

},

addClassRules: function(className, rules) {
className.constructor == String ?
this.classRuleSettings[className] = rules :
$.extend(this.classRuleSettings, className);
},

classRules: function(element) {
var rules = {};
var classes = $(element).attr('class');
classes && $.each(classes.split(' '), function() {
if (this in $.validator.classRuleSettings) {
$.extend(rules, $.validator.classRuleSettings[this]);
}
});
return rules;
},

attributeRules: function(element) {
var rules = {};
var $element = $(element);

for (method in $.validator.methods) {
var value = $element.attr(method);
if (value) {
rules[method] = value;
}
}

// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
delete rules.maxlength;
}

return rules;
},

metadataRules: function(element) {
if (!$.metadata) return {};

var meta = $.data(element.form, 'validator').settings.meta;
return meta ?
$(element).metadata()[meta] :
$(element).metadata();
},

staticRules: function(element) {
var rules = {};
var validator = $.data(element.form, 'validator');
if (validator.settings.rules) {
rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
}
return rules;
},

normalizeRules: function(rules, element) {
// handle dependency check
$.each(rules, function(prop, val) {
// ignore rule when param is explicitly false, eg. required:false
if (val === false) {
delete rules[prop];
return;
}
if (val.param || val.depends) {
var keepRule = true;
switch (typeof val.depends) {
case "string":
keepRule = !!$(val.depends, element.form).length;
break;
case "function":
keepRule = val.depends.call(element, element);
break;
}
if (keepRule) {
rules[prop] = val.param !== undefined ? val.param : true;
} else {
delete rules[prop];
}
}
});

// evaluate parameters
$.each(rules, function(rule, parameter) {
rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
});

// clean number parameters
$.each(['minlength', 'maxlength', 'min', 'max'], function() {
if (rules[this]) {
rules[this] = Number(rules[this]);
}
});
$.each(['rangelength', 'range'], function() {
if (rules[this]) {
rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
}
});

if ($.validator.autoCreateRanges) {
// auto-create ranges
if (rules.min && rules.max) {
rules.range = [rules.min, rules.max];
delete rules.min;
delete rules.max;
}
if (rules.minlength && rules.maxlength) {
rules.rangelength = [rules.minlength, rules.maxlength];
delete rules.minlength;
delete rules.maxlength;
}
}

// To support custom messages in metadata ignore rule methods titled "messages"
if (rules.messages) {
delete rules.messages
}

return rules;
},

// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
normalizeRule: function(data) {
if (typeof data == "string") {
var transformed = {};
$.each(data.split(/\s/), function() {
transformed[this] = true;
});
data = transformed;
}
return data;
},

// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
addMethod: function(name, method, message) {
$.validator.methods[name] = method;
$.validator.messages[name] = message || $.validator.messages[name];
if (method.length < 3) {
$.validator.addClassRules(name, $.validator.normalizeRule(name));
}
},

methods: {

// http://docs.jquery.com/Plugins/Validation/Methods/required
required: function(value, element, param) {
// check if dependency is met
if (!this.depend(param, element))
return "dependency-mismatch";
switch (element.nodeName.toLowerCase()) {
case 'select':
var options = $("option:selected", element);
return options.length > 0 && (element.type == "select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);
case 'input':
if (this.checkable(element))
return this.getLength(value, element) > 0;
default:
return $.trim(value).length > 0;
}
},

// http://docs.jquery.com/Plugins/Validation/Methods/remote
remote: function(value, element, param) {
if (this.optional(element))
return "dependency-mismatch";

var previous = this.previousValue(element);

if (!this.settings.messages[element.name])
this.settings.messages[element.name] = {};
this.settings.messages[element.name].remote = typeof previous.message == "function" ? previous.message(value) : previous.message;

param = typeof param == "string" && { url: param} || param;

if (previous.old !== value) {
previous.old = value;
var validator = this;
this.startRequest(element);
var data = {};
data[element.name] = value;
$.ajax($.extend(true, {
url: param,
mode: "abort",
port: "validate" + element.name,
dataType: "json",
data: data,
success: function(response) {
var valid = response === true;
if (valid) {
var submitted = validator.formSubmitted;
validator.prepareElement(element);
validator.formSubmitted = submitted;
validator.successList.push(element);
validator.showErrors();
} else {
var errors = {};
errors[element.name] = previous.message = response || validator.defaultMessage(element, "remote");
validator.showErrors(errors);
}
previous.valid = valid;
validator.stopRequest(element, valid);
}
}, param));
return "pending";
} else if (this.pending[element.name]) {
return "pending";
}
return previous.valid;
},

// http://docs.jquery.com/Plugins/Validation/Methods/minlength
minlength: function(value, element, param) {
return this.optional(element) || this.getLength($.trim(value), element) >= param;
},

// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
maxlength: function(value, element, param) {
return this.optional(element) || this.getLength($.trim(value), element) <= param;
},

// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
rangelength: function(value, element, param) {
var length = this.getLength($.trim(value), element);
return this.optional(element) || (length >= param[0] && length <= param[1]);
},

// http://docs.jquery.com/Plugins/Validation/Methods/min
min: function(value, element, param) {
return this.optional(element) || value >= param;
},

// http://docs.jquery.com/Plugins/Validation/Methods/max
max: function(value, element, param) {
return this.optional(element) || value <= param;
},

// http://docs.jquery.com/Plugins/Validation/Methods/range
range: function(value, element, param) {
return this.optional(element) || (value >= param[0] && value <= param[1]);
},

// http://docs.jquery.com/Plugins/Validation/Methods/email
email: function(value, element) {
// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
},

//Accurate CFEC-476 
cpfcnpj: function(value, element) {
if (value.length <= 14) {

value = value.replace('.', '');
value = value.replace('.', '');

cpf = value.replace('-', '');
while (cpf.length < 11)
cpf = "0" + cpf;
var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
var a = [];
var b = new Number;
var c = 11;
for (i = 0; i < 11; i++) {
a[i] = cpf.charAt(i);
if (i < 9)
b += (a[i] * --c);
}
if ((x = b % 11) < 2) {
a[9] = 0
} else {
a[9] = 11 - x
}
b = 0;
c = 11;
for (y = 0; y < 10; y++)
b += (a[y] * c--);
if ((x = b % 11) < 2) {
a[10] = 0;
} else {
a[10] = 11 - x;
}
if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10])
|| cpf.match(expReg))
return false;
return true;
}
else {

cnpj = value.replace('/', '');
cnpj = cnpj.replace('.', '');
cnpj = cnpj.replace('.', '');
cnpj = cnpj.replace('-', '');

var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
digitos_iguais = 1;

if (cnpj.length < 14 && cnpj.length < 15) {
return false;
}
for (i = 0; i < cnpj.length - 1; i++) {
if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
digitos_iguais = 0;
break;
}
}

if (!digitos_iguais) {
tamanho = cnpj.length - 2
numeros = cnpj.substring(0, tamanho);
digitos = cnpj.substring(tamanho);
soma = 0;
pos = tamanho - 7;

for (i = tamanho; i >= 1; i--) {
soma += numeros.charAt(tamanho - i) * pos--;
if (pos < 2) {
pos = 9;
}
}
resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
if (resultado != digitos.charAt(0)) {
return false;
}
tamanho = tamanho + 1;
numeros = cnpj.substring(0, tamanho);
soma = 0;
pos = tamanho - 7;
for (i = tamanho; i >= 1; i--) {
soma += numeros.charAt(tamanho - i) * pos--;
if (pos < 2) {
pos = 9;
}
}
resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
if (resultado != digitos.charAt(1)) {
return false;
}
return true;
} else {
return false;
}
}
},

// http://docs.jquery.com/Plugins/Validation/Methods/url
url: function(value, element) {
// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
},

// http://docs.jquery.com/Plugins/Validation/Methods/date
date: function(value, element) {
return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
},

// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
dateISO: function(value, element) {
return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
},

// http://docs.jquery.com/Plugins/Validation/Methods/dateDE
dateDE: function(value, element) {
return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);
},

// http://docs.jquery.com/Plugins/Validation/Methods/number
number: function(value, element) {
return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
},
// http://docs.jquery.com/Plugins/Validation/Methods/number
ceperror: function(value, element) {
return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
},

// http://docs.jquery.com/Plugins/Validation/Methods/numberDE
numberDE: function(value, element) {
return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
},

// http://docs.jquery.com/Plugins/Validation/Methods/digits
digits: function(value, element) {
return this.optional(element) || /^\d+$/.test(value);
},

// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
// based on http://en.wikipedia.org/wiki/Luhn
creditcard: function(value, element) {
if (this.optional(element))
return "dependency-mismatch";
// accept only digits and dashes
if (/[^0-9-]+/.test(value))
return false;
var nCheck = 0,
nDigit = 0,
bEven = false;

value = value.replace(/\D/g, "");

for (n = value.length - 1; n >= 0; n--) {
var cDigit = value.charAt(n);
var nDigit = parseInt(cDigit, 10);
if (bEven) {
if ((nDigit *= 2) > 9)
nDigit -= 9;
}
nCheck += nDigit;
bEven = !bEven;
}

return (nCheck % 10) == 0;
},

// http://docs.jquery.com/Plugins/Validation/Methods/accept
accept: function(value, element, param) {
param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
},

// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
equalTo: function(value, element, param) {
return value == $(param).val();
}

}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
var ajax = $.ajax;
var pendingRequests = {};
$.ajax = function(settings) {
// create settings for compatibility with ajaxSetup
settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
var port = settings.port;
if (settings.mode == "abort") {
if ( pendingRequests[port] ) {
pendingRequests[port].abort();
}
return (pendingRequests[port] = ajax.apply(this, arguments));
}
return ajax.apply(this, arguments);
};
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 

// provides triggerEvent(type: String, target: Element) to trigger delegated events
;(function($) {
$.each({
focus: 'focusin',
blur: 'focusout'	
}, function( original, fix ){
$.event.special[fix] = {
setup:function() {
if ( $.browser.msie ) return false;
this.addEventListener( original, $.event.special[fix].handler, true );
},
teardown:function() {
if ( $.browser.msie ) return false;
this.removeEventListener( original,
$.event.special[fix].handler, true );
},
handler: function(e) {
arguments[0] = $.event.fix(e);
arguments[0].type = fix;
return $.event.handle.apply(this, arguments);
}
};
});
$.extend($.fn, {
delegate: function(type, delegate, handler) {
return this.bind(type, function(event) {
var target = $(event.target);
if (target.is(delegate)) {
return handler.apply(target, arguments);
}
});
},
triggerEvent: function(type, target) {
return this.triggerHandler(type, [$.event.fix({ type: type, target: target })]);
}
})
})(jQuery);

/* 04-slider-horizontal.js */ 
$(document).ready(function() {

StartSliderHorizontal();
});

function StartSliderHorizontal() {

try {


if ($("div.ultimosProdutos div.anythingSlider .forward").length > 0) {
$("div.ultimosProdutos div.anythingSlider .forward").click(vai_click);
}

if ($("div.ultimosProdutos div.anythingSlider .back").length > 0) {
//            $("div.ultimosProdutos div.anythingSlider .back").click(volta_click);
$("div.ultimosProdutos div.anythingSlider .back").addClass("disabled");
}


if ($("div.seeAlso div.anythingSlider a.forward").length > 0) {
$("div.seeAlso div.anythingSlider a.forward").click(vai_seealso_click);
}

if ($("div.seeAlso div.anythingSlider .back").length > 0) {
//            $("div.seeAlso div.anythingSlider .back").click(volta_seealso_click);
$("div.seeAlso div.anythingSlider .back").addClass("disabled");
}

if ($("div.seeAlso div.anythingSlider #thumbNavContainer").size() > 0) {
CreatePaggingSeeAlso();
}


} catch (Error) {

}
}


/*See Alvo*/

function CreatePaggingSeeAlso() {
var itens = $("div.seeAlsoProducts ul li");
var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
var largura_item = itens.filter(":first:").outerWidth();
var por_pagina = parseInt(largura_slider / largura_item);
var pags = itens.length / por_pagina;

$("div.seeAlso div.anythingSlider #thumbNavContainer div").html('');
$("div.seeAlso div.anythingSlider #thumbNavContainer").hide();    

if (pags > 0) {

for (var i = 0; i < pags; i++) {
if (i == 0)
$("div.seeAlso div.anythingSlider #thumbNavContainer div").append('<a class="cur" pag="'+ i +'" href="javascript:;"/>');
else
$("div.seeAlso div.anythingSlider #thumbNavContainer div").append('<a class="" pag="' + i + '"href="javascript:;"/>');
}

$("div.seeAlso div.anythingSlider #thumbNavContainer").css({ width: 22 * pags + 'px' });
$("div.seeAlso div.anythingSlider #thumbNavContainer").show();

//Bind Pagging events
$("div.seeAlso div.anythingSlider #thumbNavContainer div a").bind('click', function (ev) {
Pagging_SeeAlso_Click(ev);
});


} 

}

function Pagging_SeeAlso_Click(ev) {
var page_click = $(ev.target).attr("pag");


$("div.seeAlso div.anythingSlider #thumbNavContainer div a").removeClass('cur');
$(ev.target).addClass("cur");


var nav_quantity = 5;
var itens = $("div.seeAlsoProducts ul li");
var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
var largura_item = itens.filter(":first:").outerWidth();
var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));
var left = -((largura_item * nav_quantity) * page_click) + "px";

$(".anythingSlider .wrapper .seeAlsoProducts ul").animate({ left: left }, "slow");

}

function Pagging_SeeAlso_Update() {
var nav_quantity = 5;
var itens = $("div.seeAlsoProducts ul li");
var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
var largura_item = itens.filter(":first:").outerWidth();
var por_pagina = parseInt(largura_slider / largura_item);
var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));

var pixels_por_pagina = -(largura_item * por_pagina);

var idx = pag / pixels_por_pagina;

$("div.seeAlso div.anythingSlider #thumbNavContainer div a").removeClass('cur');

$("div.seeAlso div.anythingSlider #thumbNavContainer div a").each(function (index) {
if (index == Math.abs(idx)) {
$($("div.seeAlso div.anythingSlider #thumbNavContainer div a")[index]).addClass("cur");
}
});

}

function vai_seealso_click() {
$("div.ultimosProdutos div.anythingSlider .back").removeClass("disabled");

var nav_quantity = 5;
var itens = $("div.seeAlsoProducts ul li");
var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
var largura_item = itens.filter(":first:").outerWidth();
var por_pagina = parseInt(largura_slider / largura_item) + 1;
var min_left = (itens.length - por_pagina) * -largura_item;
var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));
var left = pag - (largura_item * nav_quantity) + "px";    

if (pag >= min_left) {
DisableButtons_SeeAlso();
$(".anythingSlider .wrapper .seeAlsoProducts ul").animate({ left: left }, "slow", function () {
Pagging_SeeAlso_Update();
EnableButtons_SeeAlso();
});

if (pag - (largura_item * nav_quantity) <= min_left) {
$("div.seeAlso div.anythingSlider a.forward").addClass("disabled");
}
}

}


function volta_seealso_click() {
$("div.ultimosProdutos div.anythingSlider .forward").removeClass("disabled");

var nav_quantity = 5;
var itens = $("div.seeAlsoProducts ul li");
var largura_slider = $(".anythingSlider .wrapper .seeAlsoProducts").outerWidth();
var largura_item = itens.filter(":first:").outerWidth();
var por_pagina = parseInt(largura_slider / largura_item) + 1;
var min_left = (itens.length - por_pagina) * largura_item;
var pag = parseInt($("div.seeAlso div.anythingSlider .wrapper .seeAlsoProducts ul").css("left"));
var left = pag + (largura_item * nav_quantity) + "px";

if (pag < 0) {
DisableButtons_SeeAlso();
$(".anythingSlider .wrapper .seeAlsoProducts ul").animate({ left: left }, "slow", function () {
Pagging_SeeAlso_Update();
EnableButtons_SeeAlso();
});

if ((pag + (largura_item * nav_quantity)) >= 0) {
$("div.seeAlso div.anythingSlider .back").addClass("disabled");
}
} else {
$("div.seeAlso div.anythingSlider .back").addClass("disabled");
}
}

function EnableButtons_SeeAlso() {
try {


//Click dos botoes

if ($("div.seeAlso div.anythingSlider a.forward").length > 0) {
$("div.seeAlso div.anythingSlider a.forward").click(vai_seealso_click);
}

if ($("div.seeAlso div.anythingSlider .back").length > 0) {
$("div.seeAlso div.anythingSlider .back").click(volta_seealso_click);
}

} catch (Error) {

}
}

function DisableButtons_SeeAlso() {

try {

if ($("div.seeAlso div.anythingSlider a.forward").length > 0) {
$("div.seeAlso div.anythingSlider a.forward").unbind('click');
}

if ($("div.seeAlso div.anythingSlider .back").length > 0) {
$("div.seeAlso div.anythingSlider .back").unbind('click');
}

} catch (Error) {

}

}

/*end seealso*/

function EnableButtons() {

try{


//Click dos botoes
if ($("div.ultimosProdutos div.anythingSlider .forward").length > 0)
$("div.ultimosProdutos div.anythingSlider .forward").click(vai_click);

if ($("div.ultimosProdutos div.anythingSlider .back").length > 0)
$("div.ultimosProdutos div.anythingSlider .back").click(volta_click);


} catch (Error) {

}


}

function DisableButtons() {

try {


//Click dos botoes
if ($("div.ultimosProdutos div.anythingSlider .forward").length > 0)
$("div.ultimosProdutos div.anythingSlider .forward").unbind('click');

if ($("div.ultimosProdutos div.anythingSlider .back").length > 0)
$("div.ultimosProdutos div.anythingSlider .back").unbind('click');

} catch (Error) {

}

}


function vai_click() {
$("div.ultimosProdutos div.anythingSlider .back").removeClass("disabled");

var nav_quantity = 3;
var itens = $("div.lastProductsSlide ul li");
var largura_slider = $(".anythingSlider .wrapper .lastProductsSlide").outerWidth();
var largura_item = itens.filter(":first:").outerWidth();
var por_pagina = parseInt(largura_slider / largura_item) + 1;
var min_left = (itens.length - por_pagina) * -largura_item;
var pag = parseInt($("#slider .wrapper .lastProductsSlide ul").css("left"));
var left = pag - (largura_item * nav_quantity) + "px";    

if (pag >= min_left) {
DisableButtons();
$(".anythingSlider .wrapper .lastProductsSlide ul").animate({ left: left }, "slow", function() {
EnableButtons();
});

if (pag - (largura_item * nav_quantity) <= min_left) {
$("#vaiUltimos").addClass("disabled");            
}
} else {
$("#vaiUltimos").addClass("disabled");        
}
}


function volta_click() {
$("div.ultimosProdutos div.anythingSlider .forward").removeClass("disabled");

var nav_quantity = 3;
var itens = $("div.lastProductsSlide ul li");
var largura_slider = $(".anythingSlider .wrapper .lastProductsSlide").outerWidth();
var largura_item = itens.filter(":first:").outerWidth();
var por_pagina = parseInt(largura_slider / largura_item) + 1;
var min_left = (itens.length - por_pagina) * largura_item;
var pag = parseInt($("#slider .wrapper .lastProductsSlide ul").css("left"));
var left = pag + (largura_item * nav_quantity) + "px";

if (pag < 0) {
DisableButtons();
$(".anythingSlider .wrapper .lastProductsSlide ul").animate({ left: left }, "slow", function() {
EnableButtons();
});

if ((pag + (largura_item * nav_quantity)) >= 0) {
$("#voltaUltimos").addClass("disabled");
}
} else {
$("#voltaUltimos").addClass("disabled");        
}
}




/* 05-newsletter.js */ 
$(document).ready(function(){

// efetua a validacao se o formato do email esta correto	
$("#newsLetterForm").validate({

onfocusout: false,				
onkeyup: false,
onsubmit: false,
onclick: false,
focusInvalid: false,


rules : {	        	
mail: {
required: true,
email: true
}
},   		

showErrors: function(errorMap, errorList)
{					
if($("#newsLetterMail").attr("value") == ""){	    				

// adicionas os li a lista de erros
$("#listaErrosLightBox").append("<li> Erro de Preenchimento </li>");	
$("#listaErrosLightBox").append("<li> Por favor, informe seu email </li>");

// chama a funcao que mostrar os erro no lightbox

AlertStart();		

return;	
}

if(errorList.length > 0){


// adicionas os li a lista de erros
$("#listaErrosLightBox").append("<li> Erro de Preenchimento </li>");	
$("#listaErrosLightBox").append("<li> O email deve ter o formato nome@dominio.com </li>");

// chama a funcao que mostrar os erro no lightbox
AlertStart();		


return;
}			   	
}			   
});


$("#submitNewsLetter").click(function(){


$("#newsletterBox").hide();

if($("#newsLetterForm").valid()){

// obtem o email
var email = $("#newsLetterMail").attr("value");		

// monta a url de requisicao
url = '/newsletterservice?operation=add&email=' + email + '&format=json&jsoncallback=?'; 					 

// efetua a chamada ajax
$.getJSON(url, function(){});				 

}
});	
});

/* 06-jquery.cookie.js */ 
/**
* Cookie plugin
*
* Copyright (c) 2006 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

/**
* Create a cookie with the given name and value and other optional parameters.
*
* @example $.cookie('the_cookie', 'the_value');
* @desc Set the value of a cookie.
* @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
* @desc Create a cookie with all available options.
* @example $.cookie('the_cookie', 'the_value');
* @desc Create a session cookie.
* @example $.cookie('the_cookie', null);
* @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
*       used when the cookie was set.
*
* @param String name The name of the cookie.
* @param String value The value of the cookie.
* @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
* @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
*                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
*                             If set to null or omitted, the cookie will be a session cookie and will not be retained
*                             when the the browser exits.
* @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
* @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
* @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
*                        require a secure protocol (like HTTPS).
* @type undefined
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/

/**
* Get the value of a cookie with the given name.
*
* @example $.cookie('the_cookie');
* @desc Get the value of a cookie.
*
* @param String name The name of the cookie.
* @return The value of the cookie.
* @type String
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/
jQuery.cookie = function(name, value, options) {
if (typeof value != 'undefined') { // name and value given, set cookie
options = options || {};
if (value === null) {
value = '';
options.expires = -1;
}
var expires = '';
if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
var date;
if (typeof options.expires == 'number') {
date = new Date();
date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
} else {
date = options.expires;
}
expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
}
// CAUTION: Needed to parenthesize options.path and options.domain
// in the following expressions, otherwise they evaluate to undefined
// in the packed version for some reason...
var path = options.path ? '; path=' + (options.path) : '';
var domain = options.domain ? '; domain=' + (options.domain) : '';
var secure = options.secure ? '; secure' : '';
document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
} else { // only name given, get cookie
var cookieValue = null;
if (document.cookie && document.cookie != '') {
var cookies = document.cookie.split(';');
for (var i = 0; i < cookies.length; i++) {
var cookie = jQuery.trim(cookies[i]);
// Does this cookie string begin with the name we want?
if (cookie.substring(0, name.length + 1) == (name + '=')) {
cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
break;
}
}
}
return cookieValue;
}
};

/* 07-json2.js */ 
/*
http://www.JSON.org/json2.js
2009-09-29

Public Domain.

NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

See http://www.JSON.org/js.html

This file creates a global JSON object containing two methods: stringify
and parse.

JSON.stringify(value, replacer, space)
value       any JavaScript value, usually an object or array.

replacer    an optional parameter that determines how object
values are stringified for objects. It can be a
function or an array of strings.

space       an optional parameter that specifies the indentation
of nested structures. If it is omitted, the text will
be packed without extra whitespace. If it is a number,
it will specify the number of spaces to indent at each
level. If it is a string (such as '\t' or '&nbsp;'),
it contains the characters used to indent at each level.

This method produces a JSON text from a JavaScript value.

When an object value is found, if the object contains a toJSON
method, its toJSON method will be called and the result will be
stringified. A toJSON method does not serialize: it returns the
value represented by the name/value pair that should be serialized,
or undefined if nothing should be serialized. The toJSON method
will be passed the key associated with the value, and this will be
bound to the value

For example, this would serialize Dates as ISO strings.

Date.prototype.toJSON = function (key) {
function f(n) {
// Format integers to have at least two digits.
return n < 10 ? '0' + n : n;
}

return this.getUTCFullYear()   + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate())      + 'T' +
f(this.getUTCHours())     + ':' +
f(this.getUTCMinutes())   + ':' +
f(this.getUTCSeconds())   + 'Z';
};

You can provide an optional replacer method. It will be passed the
key and value of each member, with this bound to the containing
object. The value that is returned from your method will be
serialized. If your method returns undefined, then the member will
be excluded from the serialization.

If the replacer parameter is an array of strings, then it will be
used to select the members to be serialized. It filters the results
such that only members with keys listed in the replacer array are
stringified.

Values that do not have JSON representations, such as undefined or
functions, will not be serialized. Such values in objects will be
dropped; in arrays they will be replaced with null. You can use
a replacer function to replace those with JSON values.
JSON.stringify(undefined) returns undefined.

The optional space parameter produces a stringification of the
value that is filled with line breaks and indentation to make it
easier to read.

If the space parameter is a non-empty string, then that string will
be used for indentation. If the space parameter is a number, then
the indentation will be that many spaces.

Example:

text = JSON.stringify(['e', {pluribus: 'unum'}]);
// text is '["e",{"pluribus":"unum"}]'


text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
// text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

text = JSON.stringify([new Date()], function (key, value) {
return this[key] instanceof Date ?
'Date(' + this[key] + ')' : value;
});
// text is '["Date(---current time---)"]'


JSON.parse(text, reviver)
This method parses a JSON text to produce an object or array.
It can throw a SyntaxError exception.

The optional reviver parameter is a function that can filter and
transform the results. It receives each of the keys and values,
and its return value is used instead of the original value.
If it returns what it received, then the structure is not modified.
If it returns undefined then the member is deleted.

Example:

// Parse the text. Values that look like ISO date strings will
// be converted to Date objects.

myData = JSON.parse(text, function (key, value) {
var a;
if (typeof value === 'string') {
a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
if (a) {
return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
+a[5], +a[6]));
}
}
return value;
});

myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
var d;
if (typeof value === 'string' &&
value.slice(0, 5) === 'Date(' &&
value.slice(-1) === ')') {
d = new Date(value.slice(5, -1));
if (d) {
return d;
}
}
return value;
});


This is a reference implementation. You are free to copy, modify, or
redistribute.

This code should be minified before deployment.
See http://javascript.crockford.com/jsmin.html

USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
NOT CONTROL.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
lastIndex, length, parse, prototype, push, replace, slice, stringify,
test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
this.JSON = {};
}

(function () {

function f(n) {
// Format integers to have at least two digits.
return n < 10 ? '0' + n : n;
}

if (typeof Date.prototype.toJSON !== 'function') {

Date.prototype.toJSON = function (key) {

return isFinite(this.valueOf()) ?
this.getUTCFullYear()   + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate())      + 'T' +
f(this.getUTCHours())     + ':' +
f(this.getUTCMinutes())   + ':' +
f(this.getUTCSeconds())   + 'Z' : null;
};

String.prototype.toJSON =
Number.prototype.toJSON =
Boolean.prototype.toJSON = function (key) {
return this.valueOf();
};
}

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
gap,
indent,
meta = {    // table of character substitutions
'\b': '\\b',
'\t': '\\t',
'\n': '\\n',
'\f': '\\f',
'\r': '\\r',
'"' : '\\"',
'\\': '\\\\'
},
rep;


function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

escapable.lastIndex = 0;
return escapable.test(string) ?
'"' + string.replace(escapable, function (a) {
var c = meta[a];
return typeof c === 'string' ? c :
'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
}) + '"' :
'"' + string + '"';
}


function str(key, holder) {

// Produce a string from holder[key].

var i,          // The loop counter.
k,          // The member key.
v,          // The member value.
length,
mind = gap,
partial,
value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

if (value && typeof value === 'object' &&
typeof value.toJSON === 'function') {
value = value.toJSON(key);
}

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

if (typeof rep === 'function') {
value = rep.call(holder, key, value);
}

// What happens next depends on the value's type.

switch (typeof value) {
case 'string':
return quote(value);

case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

return isFinite(value) ? String(value) : 'null';

case 'boolean':
case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

if (!value) {
return 'null';
}

// Make an array to hold the partial results of stringifying this object value.

gap += indent;
partial = [];

// Is the value an array?

if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

length = value.length;
for (i = 0; i < length; i += 1) {
partial[i] = str(i, value) || 'null';
}

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

v = partial.length === 0 ? '[]' :
gap ? '[\n' + gap +
partial.join(',\n' + gap) + '\n' +
mind + ']' :
'[' + partial.join(',') + ']';
gap = mind;
return v;
}

// If the replacer is an array, use it to select the members to be stringified.

if (rep && typeof rep === 'object') {
length = rep.length;
for (i = 0; i < length; i += 1) {
k = rep[i];
if (typeof k === 'string') {
v = str(k, value);
if (v) {
partial.push(quote(k) + (gap ? ': ' : ':') + v);
}
}
}
} else {

// Otherwise, iterate through all of the keys in the object.

for (k in value) {
if (Object.hasOwnProperty.call(value, k)) {
v = str(k, value);
if (v) {
partial.push(quote(k) + (gap ? ': ' : ':') + v);
}
}
}
}

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

v = partial.length === 0 ? '{}' :
gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
mind + '}' : '{' + partial.join(',') + '}';
gap = mind;
return v;
}
}

// If the JSON object does not yet have a stringify method, give it one.

if (typeof JSON.stringify !== 'function') {
JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

var i;
gap = '';
indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

if (typeof space === 'number') {
for (i = 0; i < space; i += 1) {
indent += ' ';
}

// If the space parameter is a string, it will be used as the indent string.

} else if (typeof space === 'string') {
indent = space;
}

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

rep = replacer;
if (replacer && typeof replacer !== 'function' &&
(typeof replacer !== 'object' ||
typeof replacer.length !== 'number')) {
throw new Error('JSON.stringify');
}

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

return str('', {'': value});
};
}


// If the JSON object does not yet have a parse method, give it one.

if (typeof JSON.parse !== 'function') {
JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

var j;

function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

var k, v, value = holder[key];
if (value && typeof value === 'object') {
for (k in value) {
if (Object.hasOwnProperty.call(value, k)) {
v = walk(value, k);
if (v !== undefined) {
value[k] = v;
} else {
delete value[k];
}
}
}
}
return reviver.call(holder, key, value);
}


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

cx.lastIndex = 0;
if (cx.test(text)) {
text = text.replace(cx, function (a) {
return '\\u' +
('0000' + a.charCodeAt(0).toString(16)).slice(-4);
});
}

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

return typeof reviver === 'function' ?
walk({'': j}, '') : j;
}

// If the text is not JSON parseable, then a SyntaxError is thrown.

throw new SyntaxError('JSON.parse');
};
}
}());


function addProductToList(produtoP, cookieObj, domain) {

var produto = {
id: produtoP.id,
url: produtoP.url,
desc: produtoP.desc,
productUrl: produtoP.productUrl
}

var produtoRecomendado1 = {
id: produtoP.rec_1_id,
url: produtoP.rec_1_url,
desc: produtoP.rec_1_nome,
img: produtoP.rec_1_img,
price: produtoP.rec_1_preco,
origin: produtoP.id
}

var produtoRecomendado2 = {
id: produtoP.rec_2_id,
url: produtoP.rec_2_url,
desc: produtoP.rec_2_nome,
img: produtoP.rec_2_img,
price: produtoP.rec_2_preco,
origin: produtoP.id
}

addProdutosRecomendados(produtoRecomendado1, produtoRecomendado2, domain);

for (idx=0; idx<cookieObj.length; idx++) {
var currentObj = cookieObj[idx];
if (currentObj.id == produto.id) {
cookieObj.splice(idx,1);
}
}

if (cookieObj.length == 9) {
cookieObj.shift();
}

cookieObj[cookieObj.length] = produto;
}

function addProdutosRecomendados(pRec1, pRec2, domain) {

//nome do cookie
var COOKIE_NAME = 'CAT_REC_PRODUCTS';

//objeto de produtos recomendados que estao na barra
//caso nao exista, cria um array vazio
var recProducts = cookieToObject(COOKIE_NAME);
if (recProducts == null) {
recProducts = new Array();
}

//primeiro item do array se existir vai para a segunda posicao
//se nao existir, e o primeiro item, nao move o objeto entao
if (recProducts[0] != null) {
recProducts[1] = recProducts[0];
}

//define qual sera o novo produto recomendado a entrar na primeira posicao do array
//deve ser o produto mais barato da categoria do ultimo produto visto
//caso o produto visualizado (origin) seja o produto mais barato da categoria dele
//mostramos o segundo mais barato da categoria

if(recProducts[0] == recProducts[1] && pRec1.id == pRec1.origin){
recProducts[0] = pRec2;
recProducts[1] = '';
} else {
recProducts[0] = pRec1;		
recProducts[1] = pRec2;		
}

objectToCookie(COOKIE_NAME, recProducts, domain);
}

function addLevelToList(level, cookieLevel) {

for (idx=0; idx<cookieLevel.length; idx++) {
var currentObj = cookieLevel[idx];
if (level.cat == currentObj.cat && level.catf == currentObj.catf) {
cookieLevel.splice(idx,1);
}
}

if (cookieLevel.length == 7) {
cookieLevel.shift();
}

cookieLevel[cookieLevel.length] = level;
}

function objectToCookie(nome, objeto, domain) {
var date = new Date();
date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));

var objetoStr = JSON.stringify(objeto);
$.cookie(nome, objetoStr, { expires: date, path: '/', domain: domain.cookieDomain});
}

function cookieToObject(nome) {
return eval(eval($.cookie(nome)));
}

function cookieToObject(nome) {
return eval(eval($.cookie(nome)));
}

function populateLast() {
var cookieObj = cookieToObject('LAST_PRODUCTS');
var cookieLevel = cookieToObject('LAST_CATEGORIES');
var cookieRec = cookieToObject('CAT_REC_PRODUCTS');
if(cookieObj == null && cookieLevel == null) {
$(".boxFull:last").hide();            
} else {
$(".boxFull:last").show();
if (cookieObj != null) {
var item = 0;
for(var i=cookieObj.length-1; i >= 0; i--) {
if(i == cookieObj.length){
$('.lastProductsSlide ul').append('<li class="first"><a class="WAClick WAClick:clic_on_ultimos_produtos_vistos:N" title="' + cookieObj[i].desc + '" href="' + cookieObj[i].productUrl + '"><img alt="' + cookieObj[i].desc + '" src="' + urlImage(cookieObj[i].url) + '"></a><h3><a class="WAClick WAClick:clic_on_ultimos_produtos_vistos:N" title="' + cookieObj[i].desc + '" href="' + cookieObj[i].productUrl + '">' + cookieObj[i].desc + '</a></h3></li>');
}else{
$('.lastProductsSlide ul').append('<li><a class="WAClick WAClick:clic_on_ultimos_produtos_vistos:N" title="' + cookieObj[i].desc + '" href="' + cookieObj[i].productUrl + '"><img alt="' + cookieObj[i].desc + '" src="' + urlImage(cookieObj[i].url) + '"></a><h3><a class="WAClick WAClick:clic_on_ultimos_produtos_vistos:N" title="' + cookieObj[i].desc + '" href="' + cookieObj[i].productUrl + '">' + cookieObj[i].desc + '</a></h3></li>');
}
item++;
}
}
if(cookieLevel != null) {
for(var level=cookieLevel.length-1; level >= 0; level--) {
if (cookieLevel[level] != null) {
if(level == cookieLevel.length-1){
$('.ultimasCategorias ul').append('<li class="first-child"><a class="WAClick WAClick:clic_on_ultimas_categorias_vistas" href="'+cookieLevel[level].catf_full+'/'+cookieLevel[level].cat+'"><span class="ultimaCat">'+cookieLevel[level].catf+'</span>&nbsp;&#62; <span class="ultimaSubCat">'+cookieLevel[level].cat+'</span></a></li>'); 
} else{
$('.ultimasCategorias ul').append('<li><a class="WAClick WAClick:clic_on_ultimas_categorias_vistas" href="'+cookieLevel[level].catf_full+'/'+cookieLevel[level].cat+'"><span class="ultimaCat">'+cookieLevel[level].catf+'</span>&nbsp;&#62; <span class="ultimaSubCat">'+cookieLevel[level].cat+'</span></a></li>'); 
}
}
}  
}
if (cookieRec != null) {
if (checkRecNull(cookieRec[0])) {
var recProd = cookieRec[0];
var priceStr = recProd.desc+' <br />por <strong>'+formatCurrency(recProd.price)+'</strong>';
$('.produtosRecomendados li:eq(0) a').attr({href: recProd.url});
$('.produtosRecomendados li:eq(0) a img').attr({src: urlImage(recProd.img)});
$('.produtosRecomendados li:eq(0) a img').attr({alt: recProd.desc});                
$('.produtosRecomendados li:eq(0) a span').html(priceStr);
} 
if (checkRecNull(cookieRec[1])) {
var recProd = cookieRec[1];
var priceStr = recProd.desc+' <br />por <strong>'+formatCurrency(recProd.price)+'</strong>';
$('.produtosRecomendados li:eq(1) a').attr({href: recProd.url});
$('.produtosRecomendados li:eq(1) a img').attr({src: urlImage(recProd.img)});
$('.produtosRecomendados li:eq(1) a img').attr({alt: recProd.desc});
$('.produtosRecomendados li:eq(1) a span').html(priceStr);
}
}
}
} 

function checkRecNull(cko) {

if (cko == null) {
return false;
} else {
if ( isEmpty(cko.id) || isEmpty(cko.desc) ) {
return false;
} else {
return true;
}
}
}

function urlImage(imageURL) {
if (imageURL) {
var parsedURL = parseURL(imageURL);
// se pagina nao estiver em https OU se a imagem j� estiver em https, entao sai
if (parent.location.protocol == 'http:' || parsedURL.protocol == "https://") {
return imageURL;
}
var iefix = $.browser.msie ? "/" : "";
imageURL = '' + iefix + parsedURL.pathname + parsedURL.search;
return imageURL;
}
}

function parseURL(url) {
var a = document.createElement("a");
a.href = url;
return a;
}


function isEmpty(inputStr) { 
if ( null == inputStr || "" == inputStr ) { 
return true; 
} 
return false; 
}

function formatCurrency(num) {

num = num.toString().replace(/\$|\,/g,'');

if(isNaN(num))
num = "0";

sign = (num == (num = Math.abs(num)));
num = Math.floor(num*100+0.50000000001);
cents = num%100;
num = Math.floor(num/100).toString();

if(cents<10)
cents = "0" + cents;

for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
num = num.substring(0,num.length-(4*i+3)) + '.' + num.substring(num.length-(4*i+3));

return (((sign)?'':'-') + 'R$ ' + num + ',' + cents);
}

jQuery.extend({

getURLParam: function(strParamName){

         var strReturn = "";

         var strHref = window.location.href;

         var bFound=false;

         

         var cmpstring = strParamName + "=";

         var cmplen = cmpstring.length;

 

         if ( strHref.indexOf("?") > -1 ){

           var strQueryString = strHref.substr(strHref.indexOf("?")+1);

           var aQueryString = strQueryString.split("&");

           for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){

             if (aQueryString[iParam].substr(0,cmplen)==cmpstring){

               var aParam = aQueryString[iParam].split("=");

               strReturn = aParam[1];

               bFound=true;

               break;

             }

             

           }

         }

         if (bFound==false) return null;

         return strReturn;

       }

});

