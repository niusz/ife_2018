// 邮箱后缀，获取元素对象
var postfixList = ['163.com', '126.com', 'qq.com', '263.net'];
var emailInput = document.getElementById('email-input');
var emailSug = document.getElementById('email-sug');

//监听输入事件
//keyup连续按，只触发一次事件
//keypress，不触发上下左右和esc键，
//keydown，都触发
//input，不触发上下左右、enter、esc或者其他特殊符号键
emailInput.addEventListener('keypress', function(){
    console.log('event handle');
}, false);

//获取用户输入
function getInput(){
    var result = emailInput.value;
    return result.trim(' ');
}