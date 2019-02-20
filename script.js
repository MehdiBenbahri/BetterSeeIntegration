/*Animation des éléments : */
$("#optionDocu").hide();
$("#optionPropos").hide();
$("#optionParam").effect("slide", {direction: "down"});


$("#btnParam").click(function () {
    $("#optionPropos").hide("slide", {direction: "up"});
    $("#optionDocu").hide("slide", {direction: "up"});
    $("#optionParam").show("slide", {direction: "down"});
});
$("#btnDocu").click(function () {
    $("#optionPropos").hide("slide", {direction: "up"});
    $("#optionParam").hide("slide", {direction: "up"});
    $("#optionDocu").show("slide", {direction: "down"});
});
$("#btnPropos").click(function () {
    $("#optionParam").hide("slide", {direction: "up"});
    $("#optionDocu").hide("slide", {direction: "up"});
    $("#optionPropos").show("slide", {direction: "down"});
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
//Jquery qui vérifi tous les boutons radios dès qu'ils changent
/*$('input:radio').on('change', function() {

    //La vérification du null permet juste de virer une erreur alakon
    if ((document.getElementById('avoui') !== null) && document.getElementById('avoui').checked === true) {
        //On sauvegarde cette option dans chrome, y compris en sync.
        chrome.storage.sync.set({
            'avoui': 1
        }, function() {});
        chrome.storage.sync.set({
            'avnon': 0
        }, function() {});
        chrome.tts.speak('Oui');
        //Je ferme déjà vu qu'un aveugle n'est pas daltonien ni malvoyant...
        window.close();
    } else if ((document.getElementById('avnon') !== null) && (document.getElementById('avnon').checked === true)) {
        chrome.storage.sync.set({
            'avnon': 1
        }, function() {});
        chrome.storage.sync.set({
            'avoui': 0
        }, function() {});
        chrome.tts.speak('Non');
        //Je me TP au deuxieme menu option qui demande si la personne est mal voyante et/ou daltonienne.
        window.location.href = "option2.html";
    } else if ((document.getElementById('mvoui') !== null) && document.getElementById('mvoui').checked === true) {
        chrome.storage.sync.set({
            'mvoui': 1
        }, function() {});
        chrome.storage.sync.set({
            'mvnon': 0
        }, function() {});
        chrome.tts.speak('Oui');
    } else if ((document.getElementById('mvnon') !== null) && document.getElementById('mvnon').checked === true) {
        chrome.storage.sync.set({
            'mvoui': 0
        }, function() {});
        chrome.storage.sync.set({
            'mvnon': 1
        }, function() {});
        chrome.tts.speak('Non');
    } else if ((document.getElementById('doui') !== null) && document.getElementById('doui').checked === true) {
        chrome.storage.sync.set({
            'doui': 1
        }, function() {});
        chrome.storage.sync.set({
            'dnon': 0
        }, function() {});
        chrome.tts.speak('Oui');
    } else if ((document.getElementById('dnon') !== null) && document.getElementById('dnon').checked === true) {
        chrome.storage.sync.set({
            'doui': 0
        }, function() {});
        chrome.storage.sync.set({
            'dnon': 1
        }, function() {});
        chrome.tts.speak('Non');
    } else if ((document.getElementById('radio-0') !== null) && document.getElementById('radio-0').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 1
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-1') !== null) && document.getElementById('radio-1').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 1
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-2') !== null) && document.getElementById('radio-2').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 1
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-3') !== null) && document.getElementById('radio-3').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 1
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-4') !== null) && document.getElementById('radio-4').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 1
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-5') !== null) && document.getElementById('radio-5').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 5
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-6') !== null) && document.getElementById('radio-6').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 1
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-7') !== null) && document.getElementById('radio-7').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 1
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 0
        }, function() {});
    } else if ((document.getElementById('radio-8') !== null) && document.getElementById('radio-8').checked === true) {
        chrome.storage.sync.set({
            'radio-0': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-1': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-2': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-3': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-4': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-5': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-6': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-7': 0
        }, function() {});
        chrome.storage.sync.set({
            'radio-8': 1
        }, function() {});
    }

    if (document.getElementById('sbmtmal') !== null) {
        document.getElementById("sbmtmal").addEventListener("click", function() {
            chrome.storage.sync.get(['doui'], function(result) {
                if (result.doui === 1) {
                    //Je me TP à la troisième option : le menu daltonien
                    window.location.href = "option3.html";
                } else {
                    window.close();
                }
            });
        });
    }
});

if (document.getElementById('submitdalt') !== null) {
    alert('ok');
    document.getElementById("submitdalt").addEventListener("click", function() {
        window.close();
    });
}
*/


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