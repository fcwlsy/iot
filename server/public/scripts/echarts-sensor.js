$(function(){ 
    var myChart = echarts.init(document.getElementById("container"));//初始化echart，将其渲染在页面id为container的元素中。  
    var temperatures=[];//定义温度数组 
    var times=[]; //定义时间数组 
    
    var mydate="";//定义日期变量
/////开始时，先获取一次数据，并渲染出曲线///用jquery的ajax方法从服务端获取数据库中的传感器数据，压进（push）各自对应的数组中////
    $.ajax({
         type : "get", //使用get方法请求
         async : true, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
         url : "/sensor",//请求发送给服务端的/sensor API访问点。
         dataType : "json", //返回数据形式为json
         success : function(result) { //请求成功时执行该函数内容，result即为服务器返回的json对象
             if (result) {
                        for(var i=0;i<result.length;i++){ //挨个取出数据并填入各自对应的数组               
                            temperatures.push(result[i].temperature); 
                            times.push(result[i].time); 
                          
                            
                        }  
                        mydate=result[result.length-1].date;//得到最后那个数据对应的日期
             }
         
        },
        error : function(errorMsg) { //请求失败时执行该函数
            alert("图表请求数据失败!");
        }
   });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    myChart.setOption({ //填入曲线所用的各个参数值
        title: {
            left: 'center',//标题居中
            text: '传感器数据曲线'
        },
        tooltip: {},
        dataZoom:[ //缩放
          {
            type: 'slider',//加入滑块
            start: 50,
            end: 100
          },
          {
            type: 'inside',//支持鼠标缩放
            start: 50,
            end: 100
          }
        ],
        xAxis: { //x轴的设置
            name:mydate,//x轴标题，显示日期，临时这样做，体现出这是哪天的数据
            nameGap:'55',
            nameRotate:'-45',
            data: times//x轴所使用的数据数组，前面用ajax方法得到
        },
        yAxis: [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value} °C'//y轴数据的显示格式
            },
            splitLine : {show : true}//显示行分割线
        }
    ],

        series: [{//要展示的各个数据点
           
            type: 'line',
           
            data: temperatures
        }]
    });
////////////////////////////设置每隔1秒自动刷新一次数据////////////////////////////////////////////////////////////////////
   setInterval(function () {
        $.ajax({//同样使用ajax得到数据，存入各自的数组中
         type : "get",
         async : true, 
         url : "/sensor",
         dataType : "json", //返回数据形式为json
         success : function(result) { //请求成功时执行该函数内容，result即为服务器返回的json对象
             if (result) {
                    for(var i=0;i<result.length;i++){       
                        temperatures.shift();       
                        temperatures.push(result[i].temperature);
                        times.shift();
                        times.push(result[i].time);   
                     } 
                     mydate=result[result.length-1].date;      
                     myChart.setOption({ //重新给出曲线数据
                        xAxis: {
                            name:mydate,
                            data: times
                        },
                        series: [{       
                            
                            data: temperatures
                        }]
                    });
                    
             }
         
        },
          error : function(errorMsg) {
             //请求失败时执行该函数
            alert("图表请求数据失败!");
         }
   });
    }, 5000);//设置刷新间隔的时间，ms单位
})
