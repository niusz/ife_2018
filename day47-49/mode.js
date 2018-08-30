//职员类，构造函数+原型
function Staff(name, salary){
    this.name = name;
    this.salary = salary;
}
Staff.prototype.work = function(){
    console.log('完成一次工作');
}

//服务员类，单例模式
var waiterInstance = (function(){
    var temp;
    function Waiter(name, salary){
        Staff.call(this, name, salary);
    };
    Waiter.prototype.work = function(para){ //假如参数是数组，就是点菜，假如不是，就是上菜        
        return new Promise(function(resolve, reject){
            if(para instanceof Array){
                console.log('服务员记顾客点菜');    
            }else{
                console.log('服务员上菜：' + para.dishName);
            }
            resolve(para);
        //    setTimeout(resolve, 1000, para)
        });
    };
    Waiter.prototype.getPay = function(para){
        return new Promise(function(resolve, reject){
            var result = 0;
            for(var i = 0; i < para.length; i++){
                result = result + para[i].price;
            }
            console.log('消费：' + result + '元');
            setTimeout(resolve, 1000, result);
        });
    }

    return{
        getWaiter: function(name, salary){
            if(!temp){
                temp = new Waiter(name, salary);
            }
            return temp;
        }
    };
})();

//厨师类，单例模式
var cookerInstance = (function(){
    var temp;
    function Cooker(name, salary){
        Staff.call(this, name, salary);
    }
    Cooker.prototype.work = function(para){
        return new Promise(function(resolve, reject){
            console.log('厨师做好这道菜：' + para.dishName + ',服务员上菜吧！');
            // setTimeout(resolve, 1000, para);//产生异步错误，先吃饭，再上菜？
            resolve(para);
        })
    };

    return{
        getCooker: function(name, salary){
            if(!temp){
                temp = new Cooker(name, salary);
            }
            return temp;
        }
    }
})();

//顾客类，构造函数+原型
//work方法返回Promise对象
function Client(id){
    this.id = id || 1;
    this.menu = null;
}
//顾客点菜方法
Client.prototype.order = function(){
    var that = this;
    return new Promise(function(resolve, reject){
        var orderTime = 2;
        var dishList = [];
        var nameList = [];
        var dishAllCount = menuList.length;
        var dishCount = Math.ceil(Math.random() * dishAllCount);
        menuList.sort(function(){return 0.5 - Math.random()});//将menuList随机排序，并获取dishCount个菜品
        for(var i = 0; i < dishCount; i++){
            dishList.push(menuList[i]);
            nameList.push(menuList[i].dishName + '(' + menuList[i].price + '元)');
        }
        that.menu = dishList;
        setTimeout(resolve, orderTime * 1000, dishList);//将随机产生的dishList传入resolve参数中
        console.log(that.id+ '顾客点菜需要花费 3 个时间');
        console.log(that.id+ '客户点的菜为:' + nameList);
        // resolve(dishList);

    });
}
//顾客吃饭方法
Client.prototype.eat = function(paraList){
    return new Promise(function(resolve, reject){
        var remain = paraList.slice(0, paraList.length);
        while(remain.length){
            console.log('客户正在吃饭');
            remain.splice(0,1);
        }
        console.log('客户吃完了，服务员算账');
        setTimeout(resolve, 1000, paraList);
        // resolve(paraList);
    });
};

//菜单类集合
var menuList = [
    {dishName:'A', price: 5, time: 1},
    {dishName:'B', price: 10, time: 1},
    {dishName:'C', price: 20, time: 1},
    {dishName:'D', price: 30, time: 1},
    {dishName:'E', price: 40, time: 2},
    {dishName:'F', price: 50, time: 2},
    {dishName:'G', price: 100, time: 2}
];

//客户集合
//可用命令模式，尝试手动添加
var clientList = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4}
]