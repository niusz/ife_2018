var colorList = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'yellow']


/**
 * 绘制坐标抽和刻度
 */
function drawCsys(xCount, yMax, ctx, startx, starty, xlength, ylength){

     //绘制坐标抽
     ctx.beginPath();
     ctx.moveTo(startx, starty);
     ctx.lineTo(startx + xlength, starty);
     ctx.stroke();

     ctx.beginPath();
     ctx.moveTo(startx, starty);
     ctx.lineTo(startx, starty - ylength);
     ctx.stroke();

     //绘制横坐标刻度
     for(var i = 0; i < xCount; i++){
        xScale = startx + Math.floor(xlength / xCount * (i + 1));
        ctx.beginPath();
        ctx.fillText(i + 1, xScale -5, starty + 10);
        ctx.moveTo(xScale, starty);
        ctx.lineTo(xScale, starty - 10);
        ctx.stroke();
    }

    //绘制纵坐标刻度
    for(var i = 0; i < 6; i++){
        var showY = Math.floor(ylength / 5) * i;
        var showR = Math.floor(yMax / 5) * i;
        ctx.beginPath();
        ctx.fillText(showR, startx - 30, starty - showY);
        ctx.moveTo(startx, starty - showY);
        ctx.lineTo(startx + 10, starty - showY);
        ctx.stroke();
    }
}

/**
 * 绘制折线图
 */
function drawLineChart(data, color, ctx, startx, starty, xlength, ylength){
    var dataDist = transDataToVector(data, ylength); // 转换y坐标值为像素
    
    //将原始数据的值，转换为左上角为原点的坐标值
    var xList = [];
    var yList = [];
    var len = dataDist.length;
    for(var i = 0; i < len; i++){
        xScale = startx + Math.floor(xlength / dataDist.length) * (i + 1);
        xList.push(xScale);
    }
    for(var i = 0; i < len; i++){
        yScale = starty - dataDist[i];
        yList.push(yScale);
    }

    //通过xList和yList绘制折线图
    ctx.beginPath();
    ctx.moveTo(xList[0], yList[0]);
    for(var i3 = 1; i3 < len; i3++){
        ctx.lineTo(xList[i3], yList[i3]);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.lineJoin = 'round';

    //绘制圆形节点
    for(var i = 0; i < len; i++){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(xList[i], yList[i], 2.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

/**
 * 绘制不同颜色折线图例
 */
function setLegend(idenList, ctx, colorList, startx, starty, xlength, ylength){
    for(var i = 0; i < idenList.length; i++){
        var x = startx + xlength;
        var y = starty - ylength + 30 + 30 * i;
        ctx.lineWidth = 5;
        ctx.strokeStyle = colorList[i];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.stroke();
        ctx.fillStyle = colorList[i];
        ctx.fillText(idenList[i] ,x + 35, y); //文字
    }
}

/**
 * 获取列表最大值
 */
function maxFromList(list){
    var max = list[0]
    for(var i = 1; i < list.length; i++){
        if(list[i] > list[i-1]){
            max = list[i];
        }
    }
    return max;
}

/**
 * 获取多组列表中的最大值
 */
function maxFromMoreList(lists){
    var maxsList = [];
    var maxs;
    for(var i = 0; i < lists.length; i++){
        var result = maxFromList(lists[i]);
        maxsList.push(result);
    }
    maxs = maxFromList(maxsList);
    return maxs;
}

/**
 * 将原始数据按坐标轴比例转换为canvas像素大小 
 */
function transDataToVector(data, ylength){
    var list = [];
    var max = maxFromList(data);
    for(var j = 0; j < data.length; j++){
        var result = Math.floor((data[j] / max) * ylength);
        list.push(result);
    }
    return list;
}

/**
 * 获取需要绘制折线的多组列表
 */
function getListsFromSource(dataSuorce){
    var list = [];
    for(var i = 0; i < sourceData.length; i++){
        list.push(sourceData[i].sale);
    }
    return list;
}

/**
 * 1、获取列表最大值
 * 2、绘制坐标抽
 * 3、绘制折线图
 */
window.addEventListener('load', function(){
    var canvas = this.document.getElementById('product-draw');
    ctx = canvas.getContext('2d');
    var startx = 100;
    var starty = 450;
    var xlength = 800;
    var ylength = 400;
    var lineNumber = 3; // 指定要随机展示的折线图条数

    //从源数据中随机抽取3条绘制曲线
    var dataRandom = [];
    var dataList = [];
    var colorRandom = [];
    var idenList = [];
    for(var i = 0; i < sourceData.length; i++){
        dataRandom.push(i);
    }
    if(lineNumber > sourceData.length){
        lineNumber = sourceData.length; //最大的折线条数不能超过sourceData中的数量
    }

    dataRandom.sort(function(){return 0.5 - Math.random();}); //随机抽取三列
    colorList.sort(function(){return 0.5 - Math.random();}); //随机获取三种颜色
    for(var i = 0; i < lineNumber; i ++){
        dataList.push(sourceData[dataRandom[i]].sale); //将sale列表装进dataList中
        idenList.push(sourceData[dataRandom[i]].product + '-' + sourceData[dataRandom[i]].region); //将商品名和地区名一并装进idenList中
        colorRandom.push(colorList[i]); //将前三种颜色装进去
    }
    var max = maxFromMoreList(dataList);

    var xCount = dataList[0].length;
    drawCsys(xCount, max, ctx, startx, starty, xlength, ylength);
    for(var i = 0; i < dataList.length; i++){
        var data = dataList[i];
        drawLineChart(data, colorRandom[i], ctx, startx, starty, xlength, ylength);
    } 

    setLegend(idenList, ctx, colorRandom, startx, starty, xlength, ylength);

}, false);