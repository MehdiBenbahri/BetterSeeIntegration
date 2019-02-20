var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.surligne{ background-color : rgba(215, 104, 44, 0.2); !important; border:1px dashed #b04d30 !important; font-size : 25px;}';
document.getElementsByTagName('head')[0].appendChild(style);

function highlightSelection() {
    var userSelection = window.getSelection().getRangeAt(0);
    highlightRange(userSelection);

}

function highlightRange(range) {
    var newNode = document.createElement("span");

    newNode.setAttribute(
        "class",
        "surligne"
    );
    range.surroundContents(newNode);

}
highlightSelection();
