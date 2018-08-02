/**
 * thList应该动态生成，根据checkbox判断。
 */
// var thList = ['商品','地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];


/**
 * 生成一组checkbox的函数
 * 
 * @param {container} 包装生成的多选框的容器
 * @param {checkboxObj} 需要生成的多选框的列表或对象
 * @param {objType} 生成列表的类型名称，自定义类型
 */
function produceCheckbox(container, checkboxObj, objType){
    var checkAll = document.createElement('input');
    var labelAll = document.createElement('label');
    var textAll = document.createTextNode('全选');
    checkAll.checkType = 'all';
    checkAll.type = 'checkbox';
    checkAll.checked = false;
    checkAll.value = '全选';
    labelAll.appendChild(checkAll);
    labelAll.appendChild(textAll);
    container.appendChild(labelAll);
    
    for(var sub1 in checkboxObj){
        var checkSub = document.createElement('input');
        var labelSub = document.createElement('label');
        var textSub = document.createTextNode(checkboxObj[sub1]);
        checkSub.checkType = 'subcheck';
        checkSub.type = 'checkbox';
        checkSub.className = 'sub';
        checkSub.checked = false;
        checkSub.customType = objType;
        checkSub.value = checkboxObj[sub1];
        labelSub.appendChild(checkSub);
        labelSub.appendChild(textSub);
        container.appendChild(labelSub);
    }

    var checklist = container.getElementsByClassName('sub');
    setFirstSelect(checklist);

    var data = getDataFromSelect();
    var table = newTable(data);
    tableWrapper.innerHTML = '';
    tableWrapper.appendChild(table);

    container.addEventListener('click', function(event){
        var checkboxs = this.getElementsByTagName('input');
        var current = event.target;

        if(current.type === 'checkbox'){
            var type = current.checkType;
            if(type === 'all'){
                if(!current.checked){
                    for(var sub2 in checkboxs){
                        checkboxs[sub2].checked = '';
                    }
                }else{
                    for(var sub2 in checkboxs){
                        checkboxs[sub2].checked = 'checked';
                    }
                }
            }else{
                var subchecks = container.getElementsByClassName('sub');
                var list = [];
                var count = 0;
                for(var i = 0; i < subchecks.length; i++){
                    if(subchecks[i].checked){
                        count ++;
                        list.push(subchecks[i]);
                    }
                }
                if(count == 0){
                    current.checked = 'checked';
                }else if(count == subchecks.length){
                    checkAll.checked = 'checked';
                }else{
                    checkAll.checked = false;
                }
            }

            //以下是根据上述选择checkbox动态生成表格。
            var data = getDataFromSelect();
            var table = newTable(data);         
            tableWrapper.innerHTML = '';
            tableWrapper.appendChild(table);
        }
    }, false);
}

/**
 * 根据选择框获取数据
 * 
 * @returns 返回对象列表
 */
function getDataFromSelect(){
    var regionList = [];
    var productList = [];
    var dataList = [];
    for(var i = 0; i < regions.length; i++){
        if(regions[i].checked){
            regionList.push(regions[i].value);
        }
    }
    for(var j = 0; j < products.length; j++){
        if(products[j].checked){
            productList.push(products[j].value);
        }
    }
    for(var k = 0; k < sourceData.length; k++){
        if(isContain(sourceData[k].region, regionList)){
            if(isContain(sourceData[k].product, productList)){
                dataList.push(sourceData[k]);
            }
        }
    }
    return dataList;
}

/**
 * 元素是否包含在列表中
 * 
 */
function isContain(value, list){
    for(var i = 0; i < list.length; i++){
        if(list[i] === value){
            return true;
        }
    }
    return false;
}

/**
 * 默认将第一个checkbox设置选中状态
 * 
 */
function setFirstSelect(selectList){
    selectList[0].checked = 'checked'
    for(var i = 1; i < selectList.length; i++){
        selectList[i].checked = false;
    }
}

/**
 * 
 * @param {Array} selectList checkbox对象列表
 */
function getCheckCount(selectList){
    var count = 0;
    for(var i = 0; i < selectList.length; i++){
        if(selectList[i].checked){
            count ++;
        }
    }
    return count;
}

/**
 * 动态生成1-12月份列表
 */
function createMonth(){
    var monthList = [];
    for(var i = 1; i < 13; i++){
        var temp = i + '月';
        monthList.push(temp);
    }
    return monthList;
}

/**
 * 动态生成表头需要的列表
 * 
 * 当地区数大于1且商品数为1，地区为第一列，否则都是商品为第一列
 */
function createThList(){
    var thList = [];
    var regionCount = getCheckCount(regions);
    var productCount = getCheckCount(products);
    if(productCount > 1 && regionCount == 1){
        thList.push('地区');
        thList.push('商品');
    }else{
        thList.push('商品');
        thList.push('地区');
    }
    thList = thList.concat(createMonth());
    return thList;
}

/**
 * 动态生成表格table表头
 * 
 * @param {表头名称} thList
 */
function newTableTh(){
    var thList = createThList();
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
 * 动态添加表格数据
 * 
 * 考虑动态填充，多维列表的情况
 * 这是dataSource是按顺序排列的情况，实际可能还需要自己写排序算法
 * 
 * 判断当前值，若前面存在，就不添加属性，若前面不存在，则添加属性
 */
function newTable(data){
    var table = newTableTh();
    var thList = createThList();
    for(var i = 0; i < data.length; i++){
        var tr = document.createElement('tr');
        var index;
        if(thList[0] === '地区'){
            index = 'region';
            var td = document.createElement('td');
            var text = document.createTextNode(data[i]['region']);
            td.appendChild(text);
            tr.appendChild(td);
        }
        for(var pro in data[i]){
            if(data[i][pro] instanceof Array){
                for(var subPro in data[i][pro]){
                    var td = document.createElement('td');
                    var text = document.createTextNode(data[i][pro][subPro]);
                    td.appendChild(text);
                    tr.appendChild(td);
                }
            }else{
                if(pro != index){
                    var td = document.createElement('td');
                    var text = document.createTextNode(data[i][pro]);
                    td.appendChild(text);
                    tr.appendChild(td);
                }
            }
        }
        table.appendChild(tr);
     
        // // 合并单元格
        // var combineTd = [];
        // var trs = table.getElementsByTagName('tr');       
        // for(var i2 = 1  ; i2 < trs.length; i2++){
        //     combineTd.push(trs[i2].getElementsByTagName('td')[0]);
        // }
        // var temp = combineTd[0];
        // var count = 1;
        // for(var i3 = 1; i3 < combineTd.length; i3++){
        //     var first = combineTd[i3-1].firstChild;
        //     var end = combineTd[i3].firstChild;
        //     if(first == end){  
        //         count ++;
        //         temp.rowSpan = count;
        //         combineTd[i3].removeChild(combineTd[i3].firstChild);
        //     }else{
        //         count = 1;
        //         temp = combineTd[i3 + 1];
        //     }
        // }

    }
    var tds = []; //除了表头，第一列数据
    var trs = table.getElementsByTagName('tr');
    var count = 1;
    for(var k1 = 1; k1 < trs.length; k1++){
        tds.push(trs[k1].getElementsByTagName('td')[0]);
    }
    var temp = tds[0];
    for(var k2 = 1; k2 < tds.length; k2++){
        if(temp.textContent === tds[k2].textContent){
            tds[k2].parentElement.removeChild(tds[k2]);
            count ++;
            temp.rowSpan = count;
        }else{
            temp = tds[k2];
            count = 1;
        }
    }
    return table;
}

/**
 * 页面加载事件
 */
window.addEventListener('load', function(){
    var region = document.getElementById('region-redio-wrapper');
    var product = document.getElementById('product-redio-wrapper');
    var checkList1 = ['华东', '华南', '华北'];
    var checkList2 = ['手机', '笔记本', '智能音箱'];
    produceCheckbox(region, checkList1, 'region');
    produceCheckbox(product, checkList2, 'product');
}, false);
var tableWrapper = document.getElementById('table-wrapper')
var regions = document.getElementById('region-redio-wrapper').getElementsByClassName('sub');
var products = document.getElementById('product-redio-wrapper').getElementsByClassName('sub');