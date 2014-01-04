(function (window) {
    //define a global var
    var Xchart = Xchart || {};
    var cs = cs || {};
    //test datas
    var iData = {
        "label": "s1",
        "data": [3, 23, 12]
    }
    var barChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]

    }
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
    
   
    var coodinateSys = function () {
        
        var coordinateOption = {
            "basePoint": { "x": 30, "y": 500 },
            "horizontalDistance": 800,
            "verticalDistance": 200
        };
        cs.basePoint = {
            "x": coordinateOption.basePoint.x,
            "y": coordinateOption.basePoint.y

        }
        cs.vEndPoint = [cs.basePoint.x, -(cs.basePoint.y + coordinateOption.verticalDistance)];
        cs.hEndPoint = [cs.basePoint.x + coordinateOption.horizontalDistance, cs.basePoint.y];
        
        cs.getBasePoint=function(){
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
        return cs;
    }

    function paintBar(data) {
        var d = [30, 30];
        //var brush = createBrush(canvasId);
        data.fillStyle = "rgba(0, 0, 200, 0.5)";
        data.fillRect(30, 500, 20, -200);
        data.font = "20px Times New Roman";
        data.fillText("HelloCanvas!", 30, 530);
    }

    function paintLine(data) {
        data.beginPath();
        data.moveTo(130, 110);//指定一条线段的起点 
        data.lineTo(390, 140);
        data.lineTo(560, 160);
        data.lineTo(660, 210);
        data.lineTo(680, 310);
        data.lineTo(790, 340); 
        data.stroke();
    }

    function initCoodinateSys(coodSysOption) {
        var s = coodinateSys();
        var brush = createBrush(canvasId);
        //水平直线  x keep the same,y increase
        brush.strokeStyle = "red";
        brush.beginPath();
        brush.moveTo(s.basePoint.x, s.basePoint.y);//指定一条线段的起点 
        brush.lineTo(s.hEndPoint[0], s.hEndPoint[1]);     //指定一条线段的终点  
        brush.stroke();
        //垂直线
        brush.moveTo(s.basePoint.x, s.basePoint.y);    //指定一条线段的起点
        brush.lineTo(s.vEndPoint[0], s.vEndPoint[1]);                  //指定一条线段的终点
        brush.stroke();
    }

    function testCoo(canvasId) {
        var s = coodinateSys();
        var brush = createBrush(canvasId);
        //水平直线  x keep the same,y increase
        brush.strokeStyle = "red";
        brush.beginPath();
        brush.moveTo(s.basePoint.x,s.basePoint.y);//指定一条线段的起点 
        brush.lineTo(s.hEndPoint[0], s.hEndPoint[1]);     //指定一条线段的终点  
        brush.stroke();
        //垂直线
        brush.moveTo(s.basePoint.x, s.basePoint.y);    //指定一条线段的起点
        brush.lineTo(s.vEndPoint[0], s.vEndPoint[1]);                  //指定一条线段的终点
        brush.stroke();
        paintBar(brush);
        paintLine(brush);
    }
  

    //method can be called by user;
    Xchart = {
        add: function (x, y) {
            alert(x + y);
        },
        XchartById: function (eleId) {
            selById(eleId);
        },
        test: function (canvasId) {
            paintCoordinate(canvasId);
        },
        t: function (canvasId) {
            testCoo(canvasId);
        }

    }





    window.Xchart = Xchart;

})(window);