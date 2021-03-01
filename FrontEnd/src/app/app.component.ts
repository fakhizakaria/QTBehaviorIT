import { Component, OnInit } from '@angular/core';
import { TargetService } from './target.service';
import { ChartOptions, ChartType, ChartDataSets, ChartPoint } from 'chart.js';
import { Target } from './target';

type Point = {x:number,y:number};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  behavior: Target[] = [];
  score!: Target;

  constructor(private targetServic: TargetService){}

  ngOnInit(): void {
    this.targetServic.setupSocketConnection();
    this.targetServic.getRandomBehavior().subscribe((behavior: any) => {
      this.behavior = behavior;
      this.bubbleChartData = [
        {
          data: behavior.map(this.pointToChartPoint)
        }
      ]
    });
    this.targetServic.getBehaviorScore().subscribe((score: any) => {
      this.score = score;
    })
  }

  private pointToChartPoint({ x, y }: Point): ChartPoint { 
    return { x, y, r: 10 };
  }


// Chart Config
public bubbleChartOptions: ChartOptions = {
  responsive: true,
  scales: {
    xAxes: [{
      ticks: {
        min: -10,
        max: 10,
      },
      gridLines:{
        display:true
      }
    }],
    yAxes: [{
      ticks: {
        min: -10,
        max: 10,
      },
      gridLines:{
        display:true
      }
    }]
  },
};

public bubbleChartType: ChartType = 'bubble';
public bubbleChartLegend = false;

public bubbleChartData: ChartDataSets[] = [
  {
    data: [],
  },
];

}
