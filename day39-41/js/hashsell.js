var inputs = document.getElementsByClassName('sub'); //子选框

/**
 * 获取所有选中状态，返回其value串，用&隔开
 */
function getChecked(containerObj){
    var inputs = containerObj.getElementsByClassName('sub');
    var result = ''
    for(var i = 0; i < inputs.length; i++){
        if(inputs[i].checked){
            if(!result){
                result = inputs[i].value;
            }else{
                result = result + '&' + inputs[i].value;
            }
        }
    }
    return result;
}

/**
 * 将选中状态新渲染成hash，通过函数防止变量污染
 */
function runHash(){
    for(var i = 0; i < inputs.length; i ++){
        inputs[i].addEventListener('change', function(){
            var paraStr = getChecked(document.body);
            window.location.hash = encodeURI(paraStr);
        }, false);
    }
}

/**
 * 刷新时，通过hash判断全选是否应该勾选上
 */
function allChecked(){
    var hash = decodeURI(window.location.hash);
    var checkall1 = region.getElementsByClassName('checkall')[0];
    var checkall2 = product.getElementsByClassName('checkall')[0];
    checkall1.checked = true;
    checkall2.checked = true;

    for(var i = 0; i < checkList1.length; i++){
        if(hash.indexOf(checkList1[i]) < 0){
            checkall1.checked = false;
        }
    }

    for(var i = 0; i < checkList2.length; i++){
        if(hash.indexOf(checkList2[i]) < 0){
            checkall2.checked = false;
        }
    }

}

/**
 * 页面加载，checkbox变化，反应到hash中
 * 获取当前hash，反应到对应的checkbox中，使刷新或copy url新打开不变
 */
window.addEventListener('load', function(){
    runHash();
    var para = decodeURI(this.window.location.hash).replace('#', ''); 
    var hashList = para.split('&');
    for(var i = 0; i < inputs.length; i++){
        if(hashList.indexOf(inputs[i].value) > -1){//假如在hash里，就让input选中
            inputs[i].checked = true;
        }else{
            inputs[i].checked = false;
        }
    }
    allChecked();
    var data = getDataFromSelect();
    var table = newTable(data);
    tableWrapper.innerHTML = '';
    tableWrapper.appendChild(table);


}, false);

