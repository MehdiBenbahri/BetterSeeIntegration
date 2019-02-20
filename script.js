
/*Icon*/
chrome.browserAction.setIcon({path:"img/logobettersee.png"});
/*Animation des éléments : */
$("#optionDocu").hide();
$("#optionPropos").hide();
$("#optionParam").effect("slide", {direction: "down"});

$("#btnParam").click(function () {
    $("#optionPropos").hide("slide", {direction: "up"});
    $("#optionDocu").hide("slide", {direction: "up"});
    $("#optionParam").show("slide", {direction: "down"});
    chrome.tts.speak("onglet paramètre");
    $("#video").get(0).pause();
});
$("#btnDocu").click(function () {
    $("#optionPropos").hide("slide", {direction: "up"});
    $("#optionParam").hide("slide", {direction: "up"});
    $("#optionDocu").show("slide", {direction: "down"});
    chrome.tts.stop();
    $("#video").get(0).play();
});
$("#btnPropos").click(function () {
    $("#optionParam").hide("slide", {direction: "up"});
    $("#optionDocu").hide("slide", {direction: "up"});
    $("#optionPropos").show("slide", {direction: "down"});
    chrome.tts.speak("onglet à propos");
    $("#video").get(0).pause();
});

$("#opBtn").effect("bounce", {
    time: 10,
    distance: 20
}, "slow");
$("#para").effect("bounce", {
    time: 10,
    distance: 20
}, "slow");
$(".animGauche").effect("slide", {direction: 'down'}, 500);
$("#vitesse").effect("slide", {direction: 'right'}, 500);
$("#btnoptiondalt").effect("slide", {direction: 'down'}, 500);

var pagecourante = window.location.href;
pagecourante = pagecourante.split("/").pop();

/*Injecte un script */
function injectScript(fileName) {
    chrome.tabs.executeScript({
        file: fileName
    });
}
$("#para").click(function(){
    chrome.tabs.create({
        url: "option.html"
    }, function(tab) {
    });
});

/*  PAGE PARAMETRES */
$("#filtreDalto").change(function () {
    if ($("#filtreDalto").prop("checked")) {
        chrome.storage.sync.set({dalto: "on"}, function () {
        });

    } else {
        chrome.storage.sync.set({dalto: "off"}, function () {
        });
    }
});
$("#lectureClav").change(function () {
    if ($("#lectureClav").prop("checked")) {
        chrome.storage.sync.set({lect: "on"}, function () {
        });
    } else {
        chrome.storage.sync.set({lect: "off"}, function () {
        });
    }
});
/* Suppression ou remise en place des éléments en fonction de la réponse */

chrome.storage.sync.get(['dalto'], function (result) {
    if (result.dalto === "off"){
        $("#partDalto").hide();
    }
    else{
        $("#partDalto").show();
    }
});
//ici il s'agit du script
chrome.storage.sync.get(['lect'], function (result) {
    if (result.lect === "off"){

    }
    else{

        injectScript("script/keyHighlight.js");
    }
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === 'lecture') {
        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            var userLang = navigator.language || navigator.userLanguage;
            chrome.tts.speak(
                selection[0], {
                    onEvent: function (event) {
                        for (j = 0; j < event.charIndex; j++) {
                            console.log(event.charIndex);
                        }
                        if (event.type == 'start') {
                            injectScript("script/highlight.js");
                        } else if (event.type == 'end') {

                            injectScript("script/unhightlight.js");
                        } else if (event.type == 'interrupted') {
                            injectScript("script/unhightlight.js");
                        } else if (event.type == 'error') {

                            injectScript("script/unhightlight.js");
                            chrome.tts.stop();
                        }
                    },
                    'rate': parseInt(rate, 10)
                }
            );

        });
    } else if (command === 'page') {
        chrome.tabs.executeScript({
            code: "document.body.innerText;"
        }, function (selection) {
            var userLang = navigator.language || navigator.userLanguage;
            chrome.tts.speak(selection[0], {
                'lang': userLang,
                'rate': parseInt(rate, 10)
            });
        });
    } else if (command === 'pause') {
        chrome.tts.pause();
        document.getElementById('resume').style.display = "inline";
        document.getElementById('pause').style.display = "none";
    } else if (command === 'resume') {
        chrome.tts.resume();
        document.getElementById('resume').style.display = "none";
        document.getElementById('pause').style.display = "inline";

    } else if (command === 'stop') {
        injectScript("script/unhightlight.js");
        chrome.tts.stop();
    } else if (command === 'zoomplus') {
        injectScript("zoom/zoomPlus.js");
    } else if (command === 'zoommoins') {
        injectScript("zoom/zoomMoins.js");
    } else if (command === 'inversion') {
        var invers = 0;
        chrome.storage.sync.get(['invers'], function (result) {
            if (result.invers === undefined || result.invers == 0) {
                chrome.tabs.executeScript({
                    code: `document.body.style='filter: invert(1)';`
                });
                chrome.storage.sync.set({
                    'invers': 1
                }, function () {
                });
            } else {
                chrome.tabs.executeScript({
                    code: `document.body.style='filter: invert(0)';`
                });
                chrome.storage.sync.set({
                    'invers': 0
                }, function () {
                });
            }
        });
    }
});



function changeIcone() {
    if (document.getElementById("micro").className === "ft fas fa-microphone-slash fa-2x colorRed") {
        document.getElementById("micro").className = "ft fas fa-microphone fa-2x colorGreen"
    } else {
        document.getElementById("micro").className = "ft fas fa-microphone-slash fa-2x colorRed"
    }
}



//rate est la vitesse de lecture. défini de base à 1
var rate = 1.0;

if (document.getElementById('rate') !== null) {
    document.getElementById("rate").addEventListener("change", function () {
        rate = document.getElementById("rate").value;

    });
}
//Inversion des couleurs
if (document.getElementById('inversion') !== null) {
    document.getElementById("inversion").addEventListener("click", function () {
        var invers = 0;
        chrome.storage.sync.get(['invers'], function (result) {
            if (result.invers === undefined || result.invers == 0) {
                chrome.tabs.executeScript({
                    code: `document.body.style='filter: invert(1)';`
                });
                chrome.storage.sync.set({
                    'invers': 1
                }, function () {
                });
            } else {
                chrome.tabs.executeScript({
                    code: `document.body.style='filter: invert(0)';`
                });
                chrome.storage.sync.set({
                    'invers': 0
                }, function () {
                });
            }
        });

    });
}
/* button play lis tout le texte de la page */
if (document.getElementById('play') !== null) {
    document.getElementById("play").addEventListener("click", function () {

        chrome.tabs.executeScript({
            code: "document.body.innerText;"
        }, function (selection) {
            var userLang = navigator.language || navigator.userLanguage;
            chrome.tts.speak(selection[0], {
                'lang': userLang,
                'rate': parseInt(rate, 10)
            });
        });
    });
}

/*Ce que l'utilisateur selection, il le lis*/
if (document.getElementById('readOnSelect') !== null) {
    document.getElementById("readOnSelect").addEventListener("click", function () {

        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            var userLang = navigator.language || navigator.userLanguage;
            chrome.tts.speak(
                selection[0], {
                    onEvent: function (event) {
                        for (j = 0; j < event.charIndex; j++) {
                            console.log(event.charIndex);
                        }
                        if (event.type == 'start') {
                            injectScript("script/highlight.js");
                        } else if (event.type == 'end') {

                            injectScript("script/unhightlight.js");
                        } else if (event.type == 'interrupted') {
                            injectScript("script/unhightlight.js");
                        } else if (event.type == 'error') {

                            injectScript("script/unhightlight.js");
                            chrome.tts.stop();
                        }
                    },
                    'rate': parseInt(rate, 10)
                }
            );

        });

    });
}

/*Zoom sur la page */
if (document.getElementById('zoomPlus') !== null) {
    document.getElementById("zoomPlus").addEventListener("click", function () {
        injectScript("zoom/zoomPlus.js");
    });
}

/*Zoom moins */
if (document.getElementById('zoomMoins') !== null) {
    document.getElementById("zoomMoins").addEventListener("click", function () {
        injectScript("zoom/zoomMoins.js");
    });
}

if (document.getElementById('pause') !== null) {
    document.getElementById("pause").addEventListener("click", function () {
        chrome.tts.pause();
        document.getElementById('resume').style.display = "inline";
        document.getElementById('pause').style.display = "none";
    });
}

if (document.getElementById('resume') !== null) {
    document.getElementById("resume").addEventListener("click", function () {
        chrome.tts.resume();
        document.getElementById('resume').style.display = "none";
        document.getElementById('pause').style.display = "inline";
    });
}

if (document.getElementById('stop') !== null) {
    document.getElementById("stop").addEventListener("click", function () {
        injectScript("script/unhightlight.js");
        chrome.tts.stop();
    });
}
injectScript("script/nettoyage.js");