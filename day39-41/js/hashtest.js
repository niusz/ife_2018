var btns = document.getElementsByTagName('button');
var contABC =  document.getElementById('contABC');
var contDEF =  document.getElementById('contDEF');

function setHash(){
    var parseHash = window.location.hash;
    var contABCList = [];
    for(var i = 0; i < 3; i++){
        contABCList.push(btns[i].id);
    }
    var contDEFList = [];
    for(var i = 3; i < btns.length; i++){
        contDEFList.push(btns[i].id);
    }
    console.log(contDEFList);

    var value = parseHash.replace('#', '');
    if(contABCList.indexOf(value) > -1){
        contABC.innerHTML = value;
    }
    if(contDEFList.indexOf(value) > -1){
        contDEF.innerHTML = value;
    }
}

//点击按钮，改变hash值
for(var i = 0; i < btns.length; i++){
    btns[i].addEventListener('click', function(){
        window.location.hash = this.id;
    }, false);
}

//hash值改变，利用setHash函数重新渲染
window.addEventListener('hashchange', function(){
    setHash();
}, false);

window.addEventListener('load', function(){
    setHash();
}, false);