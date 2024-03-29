var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.cssKeyCodeClass{ background-color : rgba(215, 104, 44, 0.2); !important; border:1px dashed #b04d30 !important; font-size : 25px; }';
document.getElementsByTagName('head')[0].appendChild(style);

var elems = document.querySelectorAll('p,li,a,button,input,h1,h2,h3,h4,h5,h6,i,b,u,small,label,img');
var index = 0;
document.onkeydown = checkKey;


function checkKey(e) {
    var synth = window.speechSynthesis;
    e = e || window.event;

    if (e.shiftKey) {
        if (synth.speaking){
            synth.cancel();
        }

        //on supprime tout le surlignage avant tout.
        for(var i = 0 ; i < elems.length ; i++){
            elems[i].classList.remove("cssKeyCodeClass");
            elems[i].blur()
        }
        //si l'index est à 0, on ne peut pas le mettre à -1
        if (index !== 0){
            index--;
            elems[index].classList.add("cssKeyCodeClass");
            elems[index].focus();

            if (elems[index].innerText !== "" && typeof(elems[index].innerText) === "string"){

                var msg = new SpeechSynthesisUtterance(elems[index].innerText);
                synth.speak(msg);

            }
            else if (elems[index].tagName === "IMG"){
                if (elems[index].alt !== "" || elems[index].alt !== " " || elems[index].alt !== null || elems[index].alt !== undefined){
                    var msg = new SpeechSynthesisUtterance("image don la description est, " + elems[index].alt);
                    synth.speak(msg);

                }
                else{
                    var msg = new SpeechSynthesisUtterance("image qui n'a pas de description.");
                    synth.speak(msg);
                }

            }
        }

    }
    else if (e.ctrlKey) {
        if (synth.speaking){
            synth.cancel();
        }
        //on supprime tout le surlignage avant tout.
        for(var i = 0 ; i < elems.length ; i++){
            elems[i].classList.remove("cssKeyCodeClass");
            elems[i].blur()
        }

        if (index !== elems.length){

            index++;
            elems[index].classList.add("cssKeyCodeClass")
            elems[index].focus();

            if (elems[index].innerText !== "" && typeof(elems[index].innerText) === "string"){
                if (synth.speaking){
                    synth.cancel();
                }
                var msg = new SpeechSynthesisUtterance(elems[index].innerText);
                synth.speak(msg);

            }
            else if (elems[index].tagName === "IMG"){
                if (elems[index].alt !== "" || elems[index].alt !== " " || elems[index].alt !== null || elems[index].alt !== undefined){
                    var msg = new SpeechSynthesisUtterance("image don la description est, " + elems[index].alt);
                    synth.speak(msg);

                }
                else{
                    var msg = new SpeechSynthesisUtterance("image qui n'a pas de description.");
                    synth.speak(msg);
                }

            }
        }

    }
    else if (e.altKey) {

        if (elems[index].tagName === "IMG"){
            var msg = new SpeechSynthesisUtterance(elems[index].alt);
            synth.speak(msg);
        }
        else{
            var msg = new SpeechSynthesisUtterance(elems[index].innerText);
            synth.speak(msg);
        }

    }

}