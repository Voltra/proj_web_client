import installProtos from "@js/prototypes"
installProtos()//Initialise les modifications de prototypes

import jQuery from "jquery"
window.$ = window.jQuery = jQuery;

import "webpack-jquery-ui"
import "webpack-jquery-ui/css"
// import "rowgrid.js"
import "datatables"
import jqFlashInstaller from "jq-flash"
jqFlashInstaller(jQuery);

export const $ = jQuery;