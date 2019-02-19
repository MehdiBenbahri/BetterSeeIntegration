'use strict';
chrome.storage.sync.get(['avoui'], function(check) {
    if (check.avoui === null) {
        chrome.runtime.onInstalled.addEventListener()(function() {
            chrome.tabs.create({
                url: "option.html"
            }, function(tab) {
                chrome.tts.speak('Êtes-vous atteint d\'une cécité visuelle totale ? Merci de cocher le bouton correspondant. Vous pouvez aussi naviguer avec la touche tabulation et les touches fléchées.');
            });
        });
    }
});