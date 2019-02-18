/*
    Si on a le focus sur la popup et qu'on utilise la touche "tab"
    il faut lire la description du bouton.
 */

//on récupère tout les éléments avec un attribut "title" :

var indexVocal = 0;
indexDalto = 0;
var tabVocal = ["lecture de la sélection courante", "lecture du texte de page", "pause ou reprendre", "stop", "zoomer plus", "zoomer moins", "vitesse de lecture", "afficher les options daltonisme"];
var tabDalto = ["retirer tout les filtres daltonisme", "filtre Achromatomalie", "Achromatomalie (forte)", "Deutéranopie", "Deutéranomalie", "Protanopie", "Protanomalie", "Tritanopie", "Tritanomalie"];
$(document).keydown(function (e) {
    var speeki = window.speechSynthesis;

    if (e.which === 9) {
        if (document.activeElement.tagName === "BODY") {
            var sp = new SpeechSynthesisUtterance("lecture de la sélection");
            speeki.speak(sp);
        }

        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "BUTTON") {

            var nextElemen = document.activeElement.nextElementSibling;
            if (nextElemen === null) {
                 console.log(document.activeElement.type);
                if (document.activeElement.type === "range") {

                    var sp = new SpeechSynthesisUtterance("afficher les options pour daltoniens");
                    speeki.speak(sp);
                    indexDalto--;
                } else if (document.activeElement.type === "radio") {
                    var sp = new SpeechSynthesisUtterance("vitesse de lecture");
                    speeki.speak(sp);
                    indexDalto--;
                } else {

                    var sp = new SpeechSynthesisUtterance("vitesse de lecture");
                    speeki.speak(sp);
                    indexDalto--;
                }

            } else {
                var sp = new SpeechSynthesisUtterance(nextElemen.title);
                speeki.speak(sp);
                indexDalto--;
            }

        }


    }
});