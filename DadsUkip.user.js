// ==UserScript==
// @name       Dad's Ukip
// @namespace  http://martintawse.com
// @version    0.1
// @description  Policies for 1950s
// @include     *
// @exclude https://github.com/*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2015+ Martin Tawse
// ==/UserScript==

$(document).ready(function () {

    var elems = ['h1', 'h2', 'h3', 'h4', 'a', 'p'];
    var replacementsMappings = {
        'ukip' : "Dad's Army",
        'Nigel Farage' : 'Captain Mainwaring',
        'Farage' : 'Mainwaring'
    };

    for (var i = 0; i < elems.length; i++) {
        $(elems[i]).each(function () {
            var content = $(this).html();
            for (var key in replacementsMappings) {
                if (replacementsMappings.hasOwnProperty(key)) {
                    var re = new RegExp('('+key+')', 'gi');
                    content = content.replace(re, replacementsMappings[key]);
                }
            }
            $(this).html(content);
        });
    }
});



