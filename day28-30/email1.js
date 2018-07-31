/**
 * 定义初始化变量
 */
var postfixList = ['163.com', '126.com', 'qq.com', '263.net'];
var emailInput = document.getElementById('email-input');
var emailSugWrapper = document.getElementById('email-sug-wrapper');
var nowSelectTipIndex = 0;

/**
 * 获得用户输入内容
 * 
 * @param {input元素} 输入类型为text的input元素
 * @returns {字符串} 返回去掉前后空格的字符串
 */
function getInput(input){
    var result = input.value;
    return result.trim(' ');
}

/**
 * 返回一个带有邮件后缀的li的list列表
 * 
 * @param {postfixList} 输入类型为邮件后缀列表
 * @param {str} 用户输入的内容
 * var liCount = 0;用来计算邮件列表是否包含@后面内容，一个都不包含，则返回全部
 * 利用nowSelectTipIndex，返回选中的背景色。
 * @returns {字符串} li下拉列表
 * 
 */
function prompt(str, postfixList){
    var liList = [];
    var index = str.indexOf('@');
    if(index < 0){
        for(var i = 0; i < postfixList.length; i++){
            var liObj = createLi(str + '@' + postfixList[i])
            liList.push(liObj);
        }
    }else{
        var subBefore = str.substring(0, index + 1);
        var subAfter = str.substring(index + 1);
        var liCount = 0;
        for(var i = 0; i < postfixList.length; i++){
            if(postfixList[i].indexOf(subAfter) >= 0){
                var liObj = createLi(subBefore + postfixList[i]);
                liList.push(liObj);
                liCount ++;
            }
        }
        if(!liCount){
            for(var i = 0; i < postfixList.length; i++){
                var liObj = createLi(subBefore + postfixList[i]);
                liList.push(liObj);
            }
        }
    }
    for(var j = 0; j < liList.length; j++){
        if(j === nowSelectTipIndex){
            liList[j].className = 'select';
        }
    }
    return liList;
}

/**
 * li节点生成函数
 * 
 * @param {str} li的内容
 * @param {li} 返回带str的li节点
 */
function createLi(str){
    var liObj = document.createElement('li');
    var node = document.createTextNode(str);
    liObj.appendChild(node);
    return liObj;
}

/**
 * 将li列表对象添加到ul上
 * 
 * @param {*} liList li对象列表
 * @param {*} ulObj ul对象名称
 * 先将ulObj所有的子元素删除
 */
function addLiToUl(liList, ulObj){
    ulObj.innerHTML = '';
    for(var i = 0; i < liList.length; i++){
        ulObj.appendChild(liList[i]);
    }
}

/**
 * 根据输入内容，控制下拉框的显示和隐藏状态
 * 
 */
function isState(str, ulObj){
    if(str){
        ulObj.style.visibility = 'visible';
    }else{
        ulObj.style.visibility = 'hidden';
    }
}

/**
 * 输入框的监听状态，需要监听input事件
 */
emailInput.addEventListener('input', function(){
    var str = getInput(emailInput);
    var liList = prompt(str, postfixList);
    addLiToUl(liList, emailSugWrapper);
    isState(str, emailSugWrapper);
}, false);

/**
 * 输入框的监听状态，监听keydown事件，利用keyCode区分
 */
emailInput.addEventListener('keydown', function(event){
    var key = event.keyCode;
    var str = getInput(emailInput);
    var liList = prompt(str, postfixList);

    if(key !== 38 && key !== 40 && key !== 13){
        nowSelectTipIndex = 0;
    }
    if(key == 38){
        if(nowSelectTipIndex == 0){
            nowSelectTipIndex = liList.length - 1;
            var liList = prompt(str, postfixList);
            addLiToUl(liList, emailSugWrapper);
        }else{
            nowSelectTipIndex = nowSelectTipIndex - 1;
            var liList = prompt(str, postfixList);
            addLiToUl(liList, emailSugWrapper);
        }
    }
    if(key == 40){
        if(nowSelectTipIndex == liList.length - 1){
            nowSelectTipIndex = 0;
            var liList = prompt(str, postfixList);
            addLiToUl(liList, emailSugWrapper);
        }else{
            nowSelectTipIndex = nowSelectTipIndex + 1;
            var liList = prompt(str, postfixList);
            addLiToUl(liList, emailSugWrapper);
        }
    }
    if(key == 13){
        emailInput.value = liList[nowSelectTipIndex].firstChild.nodeValue;
        isState(null, emailSugWrapper);
    }
    if(key == 27){
        emailInput.select();
    }
}, false);

/**
 * 下拉列表的点击事件监听
 */
emailSugWrapper.addEventListener('click', function(event){
    var liObj = event.target;
    emailInput.value = liObj.firstChild.nodeValue;
    isState(null, emailSugWrapper);
    emailInput.focus();
}, false);

/**
 * 页面加载，焦点在输入框上。
 */
window.addEventListener('load', function(){
    emailInput.focus();
    emailSugWrapper.style.width = emailInput.offsetWidth + 'px';
}, false);




