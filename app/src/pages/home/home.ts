import { Component,ViewChild,ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Sensor } from '../../providers/sensor';
import echarts from 'echarts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public sensors:any;


public a:any=1;
    temperatures:any[]=[];//定义温度数组 
     times:any[]=[]; //定义时间数组 

  constructor(public navCtrl: NavController,public sensorService: Sensor) {}

  ionViewDidEnter(){
 
    this.loadCharts();
  }
  loadCharts(){
    var myChart = echarts.init(<HTMLCanvasElement> document.getElementById('myChart'));
    this.sensorService.getSensor().then((data) => {  
        for (var i in data){
         this.temperatures.push(data[i].temperature);
         this.times.push(data[i].time);
       
    
        } 
    });
    myChart.setOption({

     tooltip:{},
        dataZoom:[ //缩放
          {
            type: 'slider',//加入滑块
            start: 1,
            end: 100
          },
          {
            type: 'inside',//支持鼠标缩放
            start: 1,
            end: 100
          }
        ],
        xAxis: { //x轴的设置
            //name:mydate,//x轴标题，显示日期，临时这样做，体现出这是哪天的数据
            //nameGap:'55',
            //nameRotate:'-45',
            data: this.times//x轴所使用的数据数组，前面用ajax方法得到
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
       
            data: this.temperatures
        }]
    });

  }


}
