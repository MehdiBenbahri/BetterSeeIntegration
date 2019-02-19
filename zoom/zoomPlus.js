var Page = document.body;
document.body.zoom = 1;

if (Page.style.zoom  == 1){
    Page.style.zoom  = 2;

}
else if(Page.style.zoom == 2){
    Page.style.zoom  = 3;
}
else if(Page.style.zoom  == 3){
    Page.style.zoom  = 4;
}
else{
    if (Page.style.zoom === 4){
        Page.style.zoom  = 2;
    }
    else{
        Page.style.zoom  = 1;
    }

}