/**
 * 方法一 ，利用splice方法删除列表
 */
function spliceRandom(list, count){
    var result = [];
    for(var i = 0; i < count; i++){
        var random = Math.floor(Math.random() * list.length);
        result.push(list[random]);
        list.splice(random, 1);
    }
    return result;
}

/**
 * 方法二，随机排序
 */
function sortRandom(list, count){
    var result = [];
    list.sort(function(){return 0.5 - Math.random();});
    for(var i = 0; i < count; i++){
        result.push(list[i]);
    }
    return result;
}

/**
 * 不同方法事件函数
 */
function setEvent(func){
    var minObj = document.getElementById('min');
    var maxObj = document.getElementById('max');
    var numberObj = document.getElementById('number');
    var resultObj = document.getElementById('result');
    var timeObj = document.getElementById('costTime');
    start = new Date().getTime();
    var min = parseInt(minObj.value);
    var max = parseInt(maxObj.value);
    var count = parseInt(numberObj.value);
    var resultList = [];
    for(var i = min; i < (max + 1); i++){
        resultList.push(i);
    }
    var result = func(resultList, count); //传入的函数名参数
    end = new Date().getTime();
    cost = end - start;
    resultObj.innerHTML = result.toString();
    timeObj.innerHTML = cost + '毫秒';

}

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');

btn1.addEventListener('click', function(){
    setEvent(spliceRandom);
}, false);
btn2.addEventListener('click', function(){
    setEvent(sortRandom);
}, false);