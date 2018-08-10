/**
 * 动态创建表格表头行或内容行，判断是否可编辑
 */
function createTableRow(elemName , list, isEdit){
    var tr = document.createElement('tr');
    var isE = isEdit;
    if(elemName === 'th'){
        isE = false;
    }
    
    if(isE){
        for(var i = 0; i < list.length; i++){
            var tElem = document.createElement(elemName);
            var input = document.createElement('input');
            input.type = 'text';
            input.value = list[i];
            tElem.appendChild(input);
            tr.appendChild(tElem);
        }
    }else{
        for(var i = 0; i < list.length; i++){
            var tElem = document.createElement(elemName);
            var text = document.createTextNode(list[i]);
            var bj = document.createElement('i');
            var qd = document.createElement('i');
            var qx = document.createElement('i');
            bj.className = 'bj';
            qd.className = 'qd';
            qx.className = 'qx';
            tElem.appendChild(text);
            tElem.appendChild(bj);
            tElem.appendChild(qd);
            tElem.appendChild(qx);
            tr.appendChild(tElem);
        }
    }

    return tr;
}


/**
 * 遍历表格内容，返回二维数组
 */
function getDataFromTable(tableObj, isHead){
    var result = [];
    var trs = tableObj.getElementsByTagName('tr');
    var i// 默认不包括表头
    if(isHead){
        i = 0;
    }else{
        i = 1;
    }
    //判断是否为input
    for(i; i < trs.length; i++){
        var temp = [];
        if(trs[i].textContent){
            var subElems = trs[i].children;
            for(var j = 0; j < subElems.length; j++){
                temp.push(subElems[j].textContent);
            }
            result.push(temp);
        }else{
            var inputs = trs[i].getElementsByTagName('input');
            for(var j = 0; j < inputs.length; j++){
                temp.push(inputs[j].value);
            }
            result.push(temp);
        }
    }
    return result;
}
