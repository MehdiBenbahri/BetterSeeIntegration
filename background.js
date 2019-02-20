chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
        url: "option.html"
    }, function(tab) {
    });
});