// ==UserScript==
// @name       Dad's Ukip
// @namespace  http://martintawse.com
// @version    0.1
// @description  Policies for 1950s
// @include     https://www.theguardian.com/*
// @include     http://www.bbc.com/*
// @include     http://www.bbc.co.uk/*
// @include     http://www.telegraph.co.uk/*
// @include     http://www.independent.co.uk/*
// @include     http://www.scotsman.com/*
// @include     http://www.heraldscotland.com/*
// @include     http://news.sky.com/*
// @include     http://www.economist.com/*
// @copyright  2015+ Martin Tawse
// ==/UserScript==

var replacementsMappings = {
    'ukip' : "Dad's Army",
    'Nigel Farage' : 'Captain Mainwaring',
    'Farage' : 'Mainwaring',
    'Liam Fox': 'The disgraced Liam Fox',
    'Boris Johnson': 'BoJo the Clown',
    'Boris': 'BoJo',
    'Brexit': 'Fucking Brexit',
    //'Donald Trump': 'Donald Fucking Trump',
    'Trump': 'Fucking Trump'
};

var notRacistComments = {
    'Farage said: "': 'Farage said: "I\'m not a racist but',
    'Farage said': 'Farage said he\'s not being racist but'  
};

var walkTheDOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

// currently we'll assume Farage is racist 50% of the time
var isFarageRacist = function () {
    var rand = Math.floor(Math.random() * 10 + 1);
    if (rand % 2 === 0) {
        return true;
    }
    return false;
};

walkTheDOM(document.body, function(node) {
    if (node.nodeType == 3) {
        var textContent = node.textContent;
        for (var key in notRacistComments) {
            if (notRacistComments.hasOwnProperty(key)) {
                if (isFarageRacist()) {
                    var re = new RegExp('('+key+')', 'gi');
                    textContent = textContent.replace(re, notRacistComments[key]);
                }
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