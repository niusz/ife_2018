//员工类
function Staff(objs){
    var objs = objs || {};
    this.id = objs.id || '01'; 
    this.name = objs.name || 'Pony';
    this.salary = objs.salary || '5000';
}
Staff.prototype.work = function(){
    console.log('完成一次工作')
}

//厨师类
var cookerInstance = (function(){
    var temp;
    function Cooker(objs){
        Staff.call(this, objs);
    }
    Cooker.prototype.work = function(menuList){
        console.log(this.name + '厨师' + '做好菜了' );
        return;
    };

    return{
        name: 'Cooker',
        getCooker: function(objs){
            if(!temp){
                temp = new Cooker(objs);
            }
            return temp;
        }
    };
})();

//服务员类
var waiterInstance = (function(){
    var temp;
    function Waiter(objs){
        Staff.call(this, objs);
    };
    Waiter.prototype.work = function(elem){
        if(elem instanceof Array){
            var list = [];
            for(var i = 0; i < elem.length; i++){
                list.push(elem[i].name)
            }
            console.log(this.name + '服务员记录客人点的菜:' + list.toString());
        }else{
            console.log(this.name + '服务员准备上菜');
        }
     };
     return{
        getWaiter: function(objs){
            if(!temp){
                temp = new Waiter(objs);
            }
            return temp;
        }
    };  
}
)();

//顾客类
function Customer(id){
    var ids = id;
    this.id = ids || 1;
}
Customer.prototype.order = function(){
    console.log(this.id + '顾客点菜');
    //生成0-20的随机数，然后随机点菜
    var count = Math.ceil(Math.random()*20);
    var menusCount = menus.length;
    var list = [];
    for(var i = 0 ; i < count; i++){
        var j = Math.floor(Math.random()*10);
        list.push(menus[j]);
    }
    return list;
}
Customer.prototype.eat = function(){
    console.log(this.id + '顾客吃饭');  
}
Customer.prototype.leave = function(menuList){
    var count = menuList.length;
    console.log('过了' + count + '秒后，' + this.id + '顾客吃完离开了');
    return count * 1000; //根据点菜多少返回时间离开
}

//菜品类
function Menu(objs){
    var objs = objs;
    this.name = objs.name || '土豆丝';
    this.cost = objs.cost || '5';
    this.price = objs.price || '10';
}
//菜品对象列表
var menus = [
    {name: '土豆丝', cost: '5', price: '10'},
    {name: 'A', cost: '6', price: '10'},
    {name: 'B', cost: '7', price: '20'},
    {name: 'C', cost: '8', price: '30'},
    {name: 'D', cost: '9', price: '40'},
    {name: 'E', cost: '10', price: '50'},
    {name: 'F', cost: '11', price: '60'},
    {name: 'G', cost: '12', price: '70'},
    {name: 'H', cost: '13', price: '80'},
    {name: 'I', cost: '14', price: '90'},
]

//顾客、服务员、厨师之间的交流
var num = 0;
function run(){
    var c1 = new Customer(); // 顾客对象
    var w1 = waiterInstance.getWaiter(); //服务员单例对象
    var cook1 = cookerInstance.getCooker({id:'02', name: 'Tom', salary: '10000'}); //厨师单例对象
    var cmenu = c1.order(); //客人随机点的菜
    w1.work(cmenu); //服务员点菜
    cook1.work(cmenu); //厨师做菜
    w1.work(); //服务员上菜
    c1.eat(); //客人吃饭
    c1.leave(cmenu); //客人离开
    console.log('--------------');
    var t = window.setTimeout(run, 1000);
    num = num + 1;
    if(num > 2){
        clearTimeout(t);
    }
}

run();






