// Cookie Toolbox Javascript
// copyright 4th September 2002, by Stephen Chapman, Felgall Pty Ltd

// You have permission to copy and use this javascript provided that
// the content of the script is not changed in any way.
// For instructions on how to use these functions see "A Cookie Toolbox"
// in the Javascript section of our site at http://www.felgall.com/

var dbug = 0; function d_a(ary) {var beg = next_entry(ary) - 1; for (var i = beg ; i > -1; i--) {ary[i] = null;}} function init_array() {if (dbug) alert('init_cookie');  var ary = new Array(null); return ary;} function set_cookie(name,value,expires) {if (dbug) alert('set_cookie'); if (!expires) expires = new Date();
document.cookie = name + '=' + escape(value) + '; expires=' + expires.toGMTString() + '; path=/';} function get_cookie(name) {if (dbug) alert('get_cookie'); var dcookie = document.cookie; var cname = name + "="; var clen = dcookie.length; var cbegin = 0; while (cbegin < clen) {var vbegin = cbegin + cname.length;
if (dcookie.substring(cbegin, vbegin) == cname) {var vend = dcookie.indexOf (";", vbegin); if (vend == -1) vend = clen; return unescape(dcookie.substring(vbegin, vend));} cbegin = dcookie.indexOf(" ", cbegin) + 1; if (cbegin == 0) break;} return null;} function del_cookie(name) {if (dbug) alert('del_cookie');
document.cookie = name + '=' + '; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';} function get_array(name, ary) {if (dbug) alert('get_array'); d_a(ary); var ent = get_cookie(name); if (ent) {i = 1; while (ent.indexOf('^') != '-1') {ary[i] = ent.substring(0,ent.indexOf('^')); i++;
ent = ent.substring(ent.indexOf('^')+1, ent.length);}}} function set_array(name, ary, expires) {if (dbug) alert('set_array'); var value = ''; for (var i = 1; ary[i]; i++) {value += ary[i] + '^';} set_cookie(name, value, expires);} function del_entry(name, ary, pos, expires) {if (dbug) alert('del_entry');
var value = ''; get_array(name, ary); for (var i = 1; i < pos; i++) {value += ary[i] + '^';} for (var j = pos + 1; ary[j]; j++) {value += ary[j] + '^';} set_cookie(name, value, expires);} function next_entry(ary) {if (dbug) alert('next_entry'); var j = 0; for (var i = 1; ary[i]; i++) {j = i} return j + 1;}
function debug_on() {dbug = 1;} function debug_off() {dbug = 0;} function dump_cookies() {if (document.cookie == '') document.write('No Cookies Found'); else {thisCookie = document.cookie.split('; '); for (i=0; i<thisCookie.length; i++) {document.write(thisCookie[i] + '<br \/>');}}}