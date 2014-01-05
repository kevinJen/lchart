(function (window) {
    //define a global var
    var Xchart = Xchart || {};
    var cs = cs || {};
   
    //judge a value is not a number
    var isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    //get max value in a array
    function caluateMaxValue(arr) {
        if (!isArray(arr)) return;
        var maxValue = arr[0];
        for (var i = 1, max = arr.length; i < max; i++) {
            if (typeof (arr[i]) !== "number") return;
            if (maxValue < arr[i]) {
                maxValue = arr[i];
            }
        }
        return maxValue;
    }
    //select dom element by id
    function selById(id) {
        if (!id) return;
        return document.getElementById(id);
    }
    //get brush
    function createBrush(canvasId) {
        return selById(canvasId).getContext("2d");
    }
    
   
    var coodinateSys = function (canvas) {
        var opt = getCanvasOption(canvas);
        cs.opt = opt;
        var coordinateOption = {
            "basePoint": { "x": 30, "y": opt.height - 50 },
            "horizontalDistance": opt.width,
            "verticalDistance": opt.height
        };
        cs.basePoint = {
            "x": coordinateOption.basePoint.x,
            "y": coordinateOption.basePoint.y

        }

        cs.hEndPoint = [cs.basePoint.x + coordinateOption.horizontalDistance, cs.basePoint.y];
        cs.vEndPoint = [cs.basePoint.x, cs.basePoint.y];

        cs.getBasePoint = function () {
            return cs.basePoint;
        }
        cs.getVendPoint = function () {
            return {
                "x": cs.vEndPoint[0],
                "y": cs.vEndPoint[1]
            }
        }
        cs.getHendPoint = function () {
            return {
                "x": cs.hEndPoint[0],
                "y": cs.hEndPoint[1]
            }
        }
        cs.brush = createBrush(canvas);
        //return cs;
    };
  



    function paintBar(barDatas) {
        if (!barDatas) return;
        var labels=barDatas.labels;
        var dataArr=barDatas.dataSet;       
        var bu = cs.brush;
        var rectWidth = 25;
        var max = dataArr.length;
        var barSpace = rectWidth * max + 20;
        //get bars count
        for (var i=0; i < max; i++) {
            bu.fillStyle = dataArr[i].fillColor;
            bu.strokeStyle = dataArr[i].strokeColor;
            var b = dataArr[i].data;
            for (var k = 0, m = b.length; k < m; k++) {
                bu.fillRect((rectWidth + 2) * i + barSpace + barSpace * k, cs.basePoint.y, rectWidth, -b[k]);
                bu.font = "15px Arial";
                bu.fillText(labels[k], barSpace + k * barSpace, cs.basePoint.y + 20);
                bu.fillText(b[k], (rectWidth + 2) * i + barSpace + barSpace * k, cs.basePoint.y - b[k]);
            }
            bu.font = "10px Arial";
            bu.fillText(dataArr[i].name, cs.opt.width / 2 + 35 * i, cs.basePoint.y + 38);
            bu.fillRect(cs.opt.width / 2 + 35 * i, cs.basePoint.y + 40, 35, 9);
        }
        
    }


    function paintLine(lineDatas) {
        if (!lineDatas) return;
        var labels = lineDatas.lables;
        var datasArr = lineDatas.dataSet;
        var bu = cs.brush;
        for (var i = 0, maxi = datasArr.length; i < maxi; i++) {
            var line = datasArr[i];
            var space = cs.opt.width / (line.data.length + 1);
            var bu = cs.brush;
            bu.beginPath();
            bu.moveTo(cs.basePoint.x, cs.basePoint.y);
           bu.strokeStyle = line.strokeColor;
           
            var datas = line.data;
            for (var k = 0, max = datas.length; k < max; k++) {
                bu.lineTo(space + k * space, cs.basePoint.y - datas[k]);
                //bu.fillStyle = line.fillColor;
                bu.fillStyle = line.strokeColor;
                bu.font = "15px Arial";
                bu.fillText(labels[k], space + k * space, cs.basePoint.y + 20);
                bu.fillText(datas[k], space + k * space, cs.basePoint.y - datas[k]);
            }
            bu.stroke();
            bu.fillStyle = line.strokeColor;
            bu.font = "10px Arial";
            bu.fillText(datasArr[i].name, cs.opt.width / 2 + 35 * i, cs.basePoint.y + 38);
            bu.fillRect(cs.opt.width / 2 + 35 * i, cs.basePoint.y + 40, 35, 9);
         
        }

    }
 

    function paintPie(pieData) {
        var bu = cs.brush;
        var startPoint = 0;
        var xAxis = cs.opt.width / 2;
        var yAxis = cs.opt.height / 2;
        var radius = (xAxis >= yAxis ? yAxis : xAxis);
        for (var i = 0; i < pieData.length; i++) {
            bu.fillStyle = pieData[i].color;
            bu.beginPath();
            bu.moveTo(xAxis, yAxis);
            bu.arc(xAxis, yAxis, radius, startPoint, startPoint + Math.PI * 2 * (pieData[i].value / 180), false);
            bu.fill();
            //bu.fillText(pieData[i].value, , );
            startPoint += Math.PI * 2 * (pieData[i].value / 180);
        }
    }



    //return canvas option as width and height
    function getCanvasOption(canvas) {
        var canvasOpt = canvasOpt || {};
        var canvas = selById(canvas);
        var width = canvas.width;
        var height = canvas.height;
        canvasOpt.width = width;
        canvasOpt.height = height;
        return canvasOpt;
    }


    function initCoordinateSys(canvasId) {
        coodinateSys(canvasId);        
        var brush = cs.brush;
        //x keep the same,y increase
        brush.strokeStyle = "black";
        brush.beginPath();
        brush.moveTo(cs.basePoint.x, cs.basePoint.y); 
        brush.lineTo(cs.hEndPoint[0], cs.hEndPoint[1]);     
        brush.stroke();
  
        brush.moveTo(cs.basePoint.x, cs.basePoint.y);    
        brush.lineTo(cs.vEndPoint[0], -cs.vEndPoint[1]);  
        brush.stroke();
    }
  

    //method can be called by user;
    Xchart = {
        add: function (x, y) {
            alert(x + y);
        },
        XchartById: function (eleId) {
            return selById(eleId);
        },
        test: function (canvasId) {
            paintCoordinate(canvasId);
        },
        t: function (canvasId) {
            initCoordinateSys(canvasId);
        },
        paintLines: function (canvasId, datas) {
            initCoordinateSys(canvasId);
            paintLine(datas);
        },
        paintBars: function (canvasId, datas) {
            initCoordinateSys(canvasId);
            paintBar(datas);
        },
        paintPies: function (canvasId, datas) {
            initCoordinateSys(canvasId);
            paintPie(datas);
        }

    }

    window.Xchart = Xchart;

})(window);