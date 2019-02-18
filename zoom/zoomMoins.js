var Page = document.body;


if (Page.style.zoom  == 1){
    Page.style.zoom  = 0;

}
else if(Page.style.zoom == 2){
    Page.style.zoom  = 1;
}
else if(Page.style.zoom  == 3){
    Page.style.zoom  = 2;
}
else if(Page.style.zoom  == 4){
    Page.style.zoom  = 3;
}
else{
    Page.style.zoom  = 1;
}