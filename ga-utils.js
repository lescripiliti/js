var _gaq = _gaq || [];
_gaq.push(['_setAccount', acecIndexInformation.googleAnalyticsCode]);
_gaq.push(['_setDomainName', acecIndexInformation.cookieDomain]);
_gaq.push(['_setAllowHash', false]);
_gaq.push(['_trackPageview', acecIndexInformation.gaPageName]);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function gaAddTrans(orderId, storeName, total, freight, city, state, country) {
  _gaq.push(['_addTrans',
             orderId,   // order ID - required
             storeName, // affiliation or store name
             total,     // total - required
             '0',       // tax
             freight,   // shipping
             city,      // city
             state,     // state or province
             country    // country
  ]);
}

// add item might be called for every item in the shopping cart
// where your ecommerce engine loops through each item in the cart and
// prints out _addItem for each
function gaAddItem(orderId, sku, productName, categoryName, price, quantity) {
  _gaq.push(['_addItem',
             orderId,      // order ID - required
             sku,          // SKU/code - required
             productName,  // product name
             categoryName, // category or variation
             price,        // unit price - required
             quantity      // quantity - required
  ]);
}

function gaCommitTrans() {
  _gaq.push(['_trackTrans']); //submits transaction to the Analytics servers
}

function gaEvent(category, action, opt_label, opt_value) {
  _gaq.push(['_trackEvent',
             category,     // event category - cart, catalog, etc
             action,       // event action - click, mouseover, etc
             opt_label,    // event label or identifier - sku, pagenumber, keyword, etc
             opt_value]);  // event value (numeric)
}

function callGaEvent(obj) {
  eval("var myObj = " + obj);
  
  gaEvent(myObj.category, myObj.action, myObj.label, myObj.value);
}

function dataGaEventFunc() {
  // atribui evento jquery aos objetos data-ga
  $("a.dataGaEvent").each(function(){
    $(this).attr('data-ga-click', $(this).attr("rel"));
    $(this).removeClass("dataGaEvent");
    $(this).attr("rel", "");
  });
}

$(document).ready(function(){
  try {
    A4J.AJAX.AddListener( { onafterajax: dataGaEventFunc } );
  } catch (e) {
  }
  
  dataGaEventFunc();
  
  $("[data-ga-click]").live("click", function(){
    callGaEvent($(this).attr("data-ga-click"));
  });
  
  $("[data-ga-load]").each(function(){
    callGaEvent($(this).attr("data-ga-load"));
  });
});

