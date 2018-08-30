//获取页面元素
var cookerElem = document.getElementById('cooker');
var clientElem = document.getElementById('client');
var waiterElem = document.getElementById('waiter');
var cashNumber = document.getElementById('cash-number');
var message = document.getElementById('client-list');


/**
 * 实现顾客按照list列表自动点菜、吃饭、结账流程
*/
var fwy = waiterInstance.getWaiter('fyw', 4000);//服务员实例
var cs = cookerInstance.getCooker('cs', 6000);//厨师实例
var gk = new Client(5);//顾客实例
function runOne(client){
    showMessage(clientList);
    (function(){
        waiterElem.className = 'cs';
        waiterElem.getElementsByTagName('div')[0].innerHTML = '等厨师...';
        clientElem.getElementsByTagName('div')[0].innerHTML = '在点菜...';
        cookerElem.getElementsByTagName('div')[0].innerHTML = '看菜单...';
        return client.order();
    })().then(fwy.work).then(function(list){
        for(var i = 0; i < list.length; i++){
            cs.work(list[i]).then(fwy.work);
        }
        waiterElem.className = 'sc';
        waiterElem.getElementsByTagName('div')[0].innerHTML = '在送餐...';
        clientElem.getElementsByTagName('div')[0].innerHTML = '在等上菜...';
        cookerElem.getElementsByTagName('div')[0].innerHTML = '在做菜...';
        return new Promise(function(resolve, reject){
            resolve(list);
        })
    }).then(client.eat).then(function(para){
        waiterElem.className = 'gk';
        waiterElem.getElementsByTagName('div')[0].innerHTML = '服务或结账...';
        clientElem.getElementsByTagName('div')[0].innerHTML = '在吃饭...';
        cookerElem.getElementsByTagName('div')[0].innerHTML = '休息中...';
        setTimeout(function(){
            clientElem.getElementsByTagName('div')[0].innerHTML = '结账中...';
        }, 1000)
        fwy.getPay(para).then(showCash);
        showMessage(clientList);
        var shift = clientList.shift();
        if(shift){
            var client = new Client(shift.id);
            console.log('-----------------');
            setTimeout(runOne, 3000, client); //利用自迭代实现异步中的同步
        }else{
            console.log('客户列表为空');
        }
    });
}
runOne(gk);

/**
 * 从clientList中显示正在排队的客户列表
 */
function showMessage(list){
    var ulElem = document.createElement('ul');
    message.innerHTML = '';
    for(var i = 0; i < list.length; i++){
        var liElem = document.createElement('li');
        var liText = document.createTextNode(list[i].id);
        liElem.appendChild(liText);
        ulElem.appendChild(liElem);
    }
    message.appendChild(ulElem);
}

/**
 * 显示现金列表
 * 先获取原来的现金数值，等待客户结账后，再相加
 */
function showCash(newNumber){
    var p = cashNumber.getElementsByTagName('p')[0]
    var currentNumber = parseInt(p.textContent);
    var result = currentNumber + newNumber;
    p.innerHTML = '';
    p.innerHTML = result;
}