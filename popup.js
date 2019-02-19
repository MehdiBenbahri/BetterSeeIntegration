chrome.storage.sync.get([
    'avoui',
    'mvnon',
    'mvoui',
    'doui',
    'dnon',
], function(pop) {
    if (pop.avoui === 1) {
        document.getElementById('collapseExample').style.display = 'none';
        document.getElementById('asislect').style.display = 'none';
        document.getElementById('btnoptiondalt').style.display = 'none';
    } else if (pop.doui === 1 && pop.mvnon === 1) {
        document.getElementById('vue').style.display = 'none';
    } else if (pop.mvoui === 1 && pop.dnon === 1) {
        document.getElementById('collapseExample').style.display = 'none';
        document.getElementById('asislect').style.display = 'none';
        document.getElementById('btnoptiondalt').style.display = 'none';
    }
});