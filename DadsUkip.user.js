// ==UserScript==
// @name       Dad's Ukip
// @namespace  http://martintawse.com
// @version    0.1
// @description  Policies for 1950s
// @include     http://www.theguardian.com/*
// @include     http://www.bbc.com/news/*
// @include     http://www.telegraph.co.uk/*
// @include     http://www.independent.co.uk/*
// @include     http://www.scotsman.com/*
// @include     http://www.heraldscotland.com/news/*
// @copyright  2015+ Martin Tawse
// ==/UserScript==

var replacementsMappings = {
    'ukip' : "Dad's Army",
    'Nigel Farage' : 'Captain Mainwaring',
    'Farage' : 'Mainwaring'
};

var notRacistComments = ['Farage said'];

var walkTheDOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
}

// currently we'll assume Farage is racist 50% of the time
var isFarageRacist = function () {
    var rand = Math.floor(Math.random() * 10 + 1);
    if (rand % 2 == 0) {
        return true;
    }
    return false;
}

walkTheDOM(document.body, function(node) {
        if (node.nodeType == 3) {
            var textContent = node.textContent;  
            for (var i = 0; i < notRacistComments.length; i++) {
                if (isFarageRacist()) {
                    var re = new RegExp('('+notRacistComments[i]+')', 'gi');
                    textContent = textContent.replace(re, notRacistComments[i]+' he\'s not racist but');
                }
            }
            for (var key in replacementsMappings) {
                if (replacementsMappings.hasOwnProperty(key)) {
                    var re = new RegExp('('+key+')', 'gi');
                    textContent = textContent.replace(re, replacementsMappings[key]);
                }
        } 
        node.textContent = textContent;
    }
});
