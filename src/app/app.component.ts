import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  number_ticket: any = 0;
  item: any = '';
  data: Array<any> = [];
  socket: any;

  public pieChartLabels: Label[] = [
    'Melbourne',
    'Port Adelaide',
    'Geelong Cats',
    'Brisbane Lions',
    'Western Bulldogs',
    'GWS Giants',
    'Essendon',
  ];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.socket = io();
        this.listen2Events();
  }

  ngOnInit() {
    this.data = new Array();
    this.listen2Events();
  }

  submit() {
    var index = parseInt(this.item);
    this.socket.emit('form', {
      index: index,
      number_ticket: parseInt(this.number_ticket),
    });
    this.number_ticket = 0;
    
  }

  listen2Events() {
    this.data = [];
    this.socket.on('data', (data: any) => {
      for (let i = 0; i < 8; i++) {
        this.pieChartData[i] = data.teams[i].count;
      }
      this.data.push(data);
      console.log(this.data);
    });
  }
}
