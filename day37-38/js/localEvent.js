/**
 * 获取sourceData的表头
 */
function getHead(){
    var list = ['商品', '地区'];
    var monthList = [];
    //利用循环构建月份数组
    for(var i = 1; i < 13; i++){
        var monthElem = i + '月';
        monthList.push(monthElem);
    }
    list = list.concat(monthList);
    return list;
}

/**
 * 获取sourceData的表内容返回列表
 */
function getRow(){
    var result = [];
    for(var i in sourceData){
        var eachResult = [];
        for(var j in sourceData[i]){
            eachResult = eachResult.concat(sourceData[i][j]);
        }
        result.push(eachResult);
    }
    return result;
}

/**
 * 页面加载时，从sourceData中获取数据，生成表格
 */
window.addEventListener('load', function(){
    var tableWrapper = this.document.getElementById('table-wrapper');
    var saveLocalstorage = this.document.getElementById('save-localstorage');

    //生成表格
    var table = document.createElement('table');
    var theadList = getHead();
    var thead = createTableRow('th', theadList, false); // 表头
    table.appendChild(thead);

    if(this.window.localStorage.dataSource){ //假如本地存有数据
        var dataLists = JSON.parse(this.window.localStorage.dataSource);
        console.log('本地');
    }else{ //否则从dataSource.js中取数据
        var dataLists = getRow();
        console.log('外部');
    }
    for(var i = 0; i < dataLists.length; i++){
        var tr = createTableRow('td', dataLists[i], false); //内容，将true换成false，就可以去掉input，不可编辑
        table.appendChild(tr);
    }
    tableWrapper.appendChild(table);

    //按钮保存和删除localStorage数据
    var btnSave = document.createElement('button');
    var btnSaveText = this.document.createTextNode('保存localStorage');
    btnSave.value = 'save';
    btnSave.appendChild(btnSaveText);
    saveLocalstorage.appendChild(btnSave);

    btnSave.addEventListener('click', function(){
        var storage = window.localStorage;
        storage.dataSource = JSON.stringify(getDataFromTable(table));
    }, false);

    var btnDelete = document.createElement('button');
    var btnDeleteText = this.document.createTextNode('删除localStorage');
    btnDelete.value = 'save';
    btnDelete.appendChild(btnDeleteText);
    saveLocalstorage.appendChild(btnDelete);

    btnDelete.addEventListener('click', function(){
        var storage = window.localStorage;
        storage.clear();
    }, false);
   
    //给每个单元格添加onmouse事件，启动编辑
    var tds = document.getElementsByTagName('table')[0].getElementsByTagName('td');
    for(var i = 0; i < tds.length; i++){

        //鼠标移入事件
        tds[i].addEventListener('mouseover', function(e){
            var bjI = this.getElementsByTagName('i')[0];
            var qdI = this.getElementsByTagName('i')[1];
            var qxI = this.getElementsByTagName('i')[2];
            if(qdI.className == 'qd iconfont icon-right_circle'){
                bjI.className ='bj';
            }else{
                bjI.className ='bj iconfont icon-bianji';
            }
        }, false);

        //鼠标移出事件
        tds[i].addEventListener('mouseout', function(){
            var bjI = this.getElementsByTagName('i')[0];
            bjI.className = 'bj';
        }, false);

        //鼠标点击事件
        tds[i].addEventListener('click', function(e){
            var target = e.target;
            var bjI = this.getElementsByTagName('i')[0];
            var qdI = this.getElementsByTagName('i')[1];
            var qxI = this.getElementsByTagName('i')[2];
            var currentValue = this.textContent || this.firstElementChild.value;
            if(!this.oldValue){ //添加一个oldValue属性，保存表格编辑前的内容，用于取消
                this.oldValue = currentValue;
            }


            //点击时，将其他单元格恢复原状
            for(var j = 0; j < tds.length; j++){
                if(this != tds[j]){
                    var cv = tds[j].textContent || tds[j].firstElementChild.value;
                    var textObj = document.createTextNode(cv);
                    tds[j].removeChild(tds[j].firstChild);
                    tds[j].insertBefore(textObj, tds[j].firstChild);
                    var iObj = tds[j].getElementsByTagName('i');
                    iObj[0].className = 'qd';
                    iObj[1].className = 'qx';
                    iObj[2].className ='bj';
                }
            }

            if(target == bjI){ //编辑
                qdI.className = 'qd iconfont icon-right_circle';
                qxI.className = 'qx iconfont icon-quxiao';
                bjI.className ='bj';
                this.removeChild(this.firstChild);
                var input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                this.insertBefore(input, this.firstChild);
                input.focus();

                //给input添加键盘事件
                input.addEventListener('keydown', function(inputE){
                    var keyCode = inputE.keyCode;
                    var that = this.parentElement
                    var currentValue = that.textContent || that.firstElementChild.value;
                    if(!that.oldValue){ //添加一个oldValue属性，保存表格编辑前的内容，用于取消
                        that.oldValue = currentValue;
                    }
                    if(keyCode == 13){ //回车键
                        if(currentValue){
                            var textObj = document.createTextNode(currentValue);
                            that.oldValue = currentValue;
                            that.removeChild(that.firstChild);
                            that.insertBefore(textObj, that.firstChild);
                            qdI.className = 'qd';
                            qxI.className = 'qx';
                            bjI.className ='bj';
                        }else{
                            alert('请输入文字');
                        }
                    }if(keyCode == 27){ //Esc键
                        var textObj = document.createTextNode(that.oldValue);
                        that.removeChild(that.firstChild);
                        that.insertBefore(textObj, that.firstChild);
                        qdI.className = 'qd';
                        qxI.className = 'qx';
                        bjI.className ='bj';
                    }
                }, false);
            
            }else if(target == qdI){ //确定
                // var input = this.getElementsByTagName('input')[0];
                if(currentValue){
                    var textObj = document.createTextNode(currentValue);
                    this.oldValue = currentValue;
                    this.removeChild(this.firstChild);
                    this.insertBefore(textObj, this.firstChild);
                    qdI.className = 'qd';
                    qxI.className = 'qx';
                    bjI.className ='bj';
                }else{
                    alert('请输入文字');
                }
            }else if(target == qxI){ //取消
                var textObj = document.createTextNode(this.oldValue);
                this.removeChild(this.firstChild);
                this.insertBefore(textObj, this.firstChild);
                qdI.className = 'qd';
                qxI.className = 'qx';
                bjI.className ='bj';
            }else {
                e.preventDefault();
                return false;
            }
        }, false);
    }

    //点击页面其他地方，相当于取消按钮，下面这种写法，太耗性能
    // this.window.addEventListener('click', function(windowE){
    //     var we = windowE.target;
    //     var tableChilds = table.children;

    //     for(var j = 0; j < tableChilds.length; j++){
    //         if(we == tableChilds[j]){
    //             windowE.stopPropagation();
    //         }
    //     }
    //     var inputs = this.document.getElementsByTagName('input')
    //     for(var i = 0; i < inputs.length; i++){
    //         var that = inputs[i].parentElement;
    //         var qdii = that.getElementsByTagName('i')[0];
    //         var qxii = that.getElementsByTagName('i')[1];
    //         var bjii = that.getElementsByTagName('i')[2];
    //         var textObj = document.createTextNode(that.oldValue);
    //         that.removeChild(that.firstChild);
    //         that.insertBefore(textObj, that.firstChild);
    //         qdii.className = 'qd';
    //         qxii.className = 'qx';
    //         bjii.className ='bj';
    //     }
    // }, false);

    //给每个输入框添加blur事件
    var inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('blur', function(){
            var localTable = document.getElementsByTagName('table')[0];
            if(this.value){
                window.localStorage.dataSource = JSON.stringify(getDataFromTable(localTable));
                }else{
                alert("请输入值");
            }
        }, false);
    }

}, false);


