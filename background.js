'use strict';

chrome.runtime.onInstalled.addListener(function() {
     chrome.tabs.create({url: "option.html"}, function (tab) {
		chrome.tts.speak('Êtes-vous atteint d\'une cécité visuelle totale ? Merci de cocher le bouton ou dire oui ou non.');
    });
});