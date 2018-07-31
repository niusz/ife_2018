// 邮箱后缀，获取元素对象
var postfixList = ['163.com', '126.com', 'qq.com', '263.net'];
var emailInput = document.getElementById('email-input');
var emailSugWrapper = document.getElementById('email-sug-wrapper');

//获取用户输入
function getInput(){
    var result = emailInput.value;
    return result.trim(' ');
}

//生成提示框中的提示内容，并添加到ul中
function prompt(ulObj, result){
    ulObj.innerHTML = '';
    var index = result.indexOf('@');
    if(index < 0){  //假如输入的字符串不包括@
        createList(postfixList, result, ulObj)
    }else{  //假如输入的字符串包括@
        var emailResult = result.substring((index + 1));  //获取@后面的字符串 
        var subResult = result.substring(0, index);  //获取@前面的字符串
        var count = 0; //识别@后面内容是否包含在邮件列表
        for(var j = 0; j < postfixList.length; j++){
            if(postfixList[j].indexOf(emailResult) >= 0){ 
                var liObj = document.createElement("li");
                var test = document.createTextNode(subResult + '@' + postfixList[j]);
                liObj.appendChild(test);
                ulObj.appendChild(liObj);
                count ++;
            }
        }
        if(!count){
            createList(postfixList, subResult, ulObj);
        }else{
            return;
        }
    }
}

//给定邮件后缀列表，给定前缀，给定ul名称，生成ul下拉列表
function createList(emailList, str, ulObj){
    for(var i = 0; i < emailList.length; i++){
        var liObj = document.createElement("li");
        var test = document.createTextNode(str + '@' + emailList[i]);
        liObj.appendChild(test);
        ulObj.appendChild(liObj);
    }
}

//控制ul的显示/隐藏状态
function smartTips(ulObj, value){
    prompt(ulObj, value);
    if(value){
        isShow(ulObj);     
    }else{
        isHide(ulObj);
    }
}

//显示提示框的具体细节
function isShow(ulObj){
    ulObj.style.visibility = "visible";
}
//隐藏提示框的具体细节
function isHide(ulObj){
    ulObj.style.visibility = "hidden";
}

//清除已选中的，设定第i个为选中。
function resetLi(list,id){
    for(var i = 0; i < list.length; i++){
        list[i].className = 'unselect';
    }
    list[id].className = 'select';
}

//找到选中的li序号，并返回
function selectLiId(list){
    var id = null;
    for(var i = 0; i < list.length; i++){
        if(list[i].className === 'select'){
            id = i;
        }
    }
    return id;
}



//监听输入事件
//keyup连续按，只触发一次事件
//keypress，不触发上下左右和esc键，
//keydown，都触发
//input，不触发上下左右、enter、esc或者其他特殊符号键
emailInput.addEventListener('input', function(event){
    // setSameStyle(emailSugWrapper, emailInput, width);
    var value = getInput();
    smartTips(emailSugWrapper, value);
    emailSugWrapper.style.width = emailInput.offsetWidth  + 'px';   


    // 输入字符串时，默认选中第一个li
    if(!emailSugWrapper.getElementsByTagName('li').length){
        return;
    }
    var liList = emailSugWrapper.getElementsByTagName('li');   
    resetLi(liList, 0);

}, false);

//键盘监控事件
// 一、以下是基于DOM绑定
emailInput.addEventListener('keydown', function(event){
    var kc = event.keyCode;
    if(kc === 27){
        this.select();
    }

    if(!emailSugWrapper.getElementsByTagName('li').length){
        return;
    }
    var liList = emailSugWrapper.getElementsByTagName('li');   
    if(!selectLiId(liList)){
        resetLi(liList, 0);
    }

    if(kc === 38){
        var j = selectLiId(liList);
        if(j != 0){
            resetLi(liList, j - 1);
        }else{
            var end = liList.length - 1;
            resetLi(liList, end);
        }
    }

    if(kc === 40){
        var k = selectLiId(liList);
        if(k != liList.length - 1){
            resetLi(liList, k + 1);
        }else{
            resetLi(liList, 0);
        }
    }

    if(kc === 13){
        var m = selectLiId(liList);
        emailInput.value = liList[m].firstChild.nodeValue;
        isHide(emailSugWrapper);
    }

}, false);


//获取下拉的提示框内容,填充到输入框中
emailSugWrapper.addEventListener('click', function(event){
    emailInput.value = event.target.firstChild.nodeValue;
    isHide(emailSugWrapper);
    emailInput.focus();
}, false);

//载入页面，生成焦点
window.addEventListener('load', function(){
    emailInput.focus();
}, false);




