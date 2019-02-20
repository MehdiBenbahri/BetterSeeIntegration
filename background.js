chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
        url: "option.html"
    }, function(tab) {
        console.log("NTM");
        //chrome.tts.speak('Êtes-vous atteint d\'une cécité visuelle totale ? Merci de cocher le bouton correspondant. Vous pouvez aussi naviguer avec la touche tabulation et les touches fléchées.');
    });
});