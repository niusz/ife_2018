var areaValue = ['area-hd', 'area-hn', 'area-hb'];
var areaText = ['华东', '华南', '华北'];

var goodsValue = ['goods-sj', 'goods-bjb', 'goods-znyx'];
var goodsText = ['手机', '笔记本', '智能音响'];

var monthValue = ['month1', 'month2', 'month3', 'month4', 'month5', 'month6', 'month7', 'month8', 'month9', 'month10', 'month11', 'month12'];
var monthValue = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

var thList = ['地区', '商品', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

/**
 * 页面加载时，动态加载页面元素
 */
window.addEventListener('load', function(){

    var selectArea = newListObj('region-select', areaValue, areaText);
    selectArea.name = '地区';
    document.body.appendChild(selectArea);

    var selectGoods = newListObj('goods-select', goodsValue, goodsText);
    selectGoods.name = '商品';
    document.body.appendChild(selectGoods);

    var selectMonth = newListObj('month-select', monthValue, monthValue);
    selectMonth.name = '月份';
    document.body.appendChild(selectMonth);

    var tableNode = newTable(thList);
    console.log(tableNode);
    document.body.appendChild(tableNode);

    var tableResult = [];

    selectArea.addEventListener('change', function(){
        var selectObj = document.getElementsByTagName('select');
        var tableResult = getAllSelect(selectObj);
        console.log(tableResult);
    }, false);
    selectGoods.addEventListener('change', function(){
        var selectObj = document.getElementsByTagName('select');
        var tableResult = getAllSelect(selectObj);
        console.log(tableResult);
    }, false);
    selectMonth.addEventListener('change', function(){
        var selectObj = document.getElementsByTagName('select');
        var tableResult = getAllSelect(selectObj);
        console.log(tableResult);
    }, false);

}, false);

/**
 * 动态生成select，加载在html页面中
 * 
 * @param {String} selectId 
 * @param {Array} optList 
 * @param {Array} textList 
 */
function newListObj(selectId, valueList, textList){
    var selectObj = document.createElement('select');
    selectObj.id = selectId;
    for(var i = 0; i < valueList.length; i++){
        var opt = document.createElement('option');
        var testNode = document.createTextNode(textList[i]);
        opt.appendChild(testNode);
        opt.value = valueList[i];     
        selectObj.appendChild(opt);
    }
    return selectObj;
}

/**
 * 动态生成表格table
 */
function newTable(thList){
    var table = document.createElement('table');
    var trNode = document.createElement('tr');
    for(var i = 0; i < thList.length; i++){
        var thNode = document.createElement('th');
        var textNode = document.createTextNode(thList[i]);
        thNode.appendChild(textNode);
        trNode.appendChild(thNode);
    }
    table.appendChild(trNode);
    return table;
}

/**
 * 获取选中的select值
 */
function getOneSelect(selectObj){
    var options = selectObj.options;
    var index = selectObj.selectedIndex;
    return options[index].text;
}

/**
 * 获取页面所有select的值集合
 * 
 * @returns 返回值集合列表
 */
function getAllSelect(list){
    var SelectList = [];
    for(var i = 0; i < list.length; i++){
        SelectList.push(getOneSelect(list[i]));
    }
    return SelectList;
}

/**
 * 
 * @param {*} list 
 */
function getDateFromSelect(list){

}