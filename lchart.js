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
    
   
    var coodinateSys = function (canvas) {
        var opt=getCanvasOption(canvas);
        var coordinateOption = {
            "basePoint": { "x": 30, "y": opt.height-50 },
            "horizontalDistance": opt.width,
            "verticalDistance": opt.height
        };
        cs.basePoint = {
            "x": coordinateOption.basePoint.x,
            "y": coordinateOption.basePoint.y

        }
       
        cs.hEndPoint = [cs.basePoint.x + coordinateOption.horizontalDistance, cs.basePoint.y];
        cs.vEndPoint = [cs.basePoint.x, cs.basePoint.y ];

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
    var bars = [{
                    fillColor: "rgba(220,0,220,0.8)",
                    strokeColor: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },{
                    fillColor: "rgba(151,187,205,0.8)",
                    strokeColor: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }, {
                    fillColor: "rgba(101,147,195,0.8)",
                    strokeColor: "rgba(151,187,205,1)",
                    data: [208, 40, 140, 190, 123, 27, 400]
                }];



    function paintBar(bu, datasArr) {
        var rectWidth = 25;
        //get bars count
        for (var i=0,max= datasArr.length; i < max; i++) {
            bu.fillStyle = datasArr[i].fillColor;
            bu.strokeStyle = datasArr[i].strokeColor;
            var b = datasArr[i].data;
            for (var k = 0, m = b.length; k < m; k++) {
                bu.fillRect((rectWidth + 2) * i + 100 + 100 * k, cs.basePoint.y, rectWidth, -b[k]);
                bu.font = "15px Arial";
                bu.fillText(b[k], (rectWidth + 2) * i + 100 + 100 * k, cs.basePoint.y - b[k]);
            }
        }
        
    }

  

 
   //test data
    var lines = [{
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",                 
                    data: [28, 48, 40, 19, 96, 27, 100]
                }];
    //test data end

    function paintLine(bu, datasArr) {
        for (var i = 0, maxi = datasArr.length; i < maxi; i++) {
            var line = datasArr[i];
            bu.beginPath();
            bu.moveTo(cs.basePoint.x, cs.basePoint.y);
            bu.strokeStyle = line.strokeColor;
            bu.fillStyle = line.fillColor;
            var datas = line.data;
            for (var k = 0, max = datas.length; k < max; k++) {
                bu.lineTo(100 + k * 100, cs.basePoint.y-datas[k]);
                bu.fillText(datas[k], 100 + k * 100, cs.basePoint.y - datas[k]);
            }
            bu.stroke();
        }

    }
    var pieData = [
              {
                  value: 30,
                  color: "#F38630"
              },
              {
                  value: 50,
                  color: "#E0E4CC"
              },
              {
                  value: 100,
                  color: "#69D2E7"
              }

    ];

    function paintPie(pieData) {
        var canvas = document.getElementById("circle");
        var ctx = canvas.getContext("2d");
        var startPoint = 0;
        for (var i = 0; i < pieData.length; i++) {
            ctx.fillStyle = pieData[i].color;
            ctx.beginPath();
            ctx.moveTo(200, 150);
            ctx.arc(200, 150, 150, startPoint, startPoint + Math.PI * 2 * (pieData[i].value / 180), false);
            ctx.fill();
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
        var s = coodinateSys(canvasId);
        var brush = createBrush(canvasId);
        //水平直线  x keep the same,y increase
        brush.strokeStyle = "red";
        brush.beginPath();
        brush.moveTo(s.basePoint.x,s.basePoint.y);//指定一条线段的起点 
        brush.lineTo(s.hEndPoint[0], s.hEndPoint[1]);     //指定一条线段的终点  
        brush.stroke();
        //垂直线
        brush.moveTo(s.basePoint.x, s.basePoint.y);    //指定一条线段的起点
        brush.lineTo(s.vEndPoint[0], -s.vEndPoint[1]);                  //指定一条线段的终点
        brush.stroke();
        //paintBar(brush);
        paintBar(brush, bars);
        paintLine(brush,lines);
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
            testCoo(canvasId);
        }

    }





    window.Xchart = Xchart;

})(window);