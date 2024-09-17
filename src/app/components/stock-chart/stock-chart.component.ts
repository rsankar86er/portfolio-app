import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.css'
})
export class StockChartComponent {
  
  @Input() performanceData:any;
  assetData:any[] = [];
  
  ngOnChanges():void{
      Object.entries(this.performanceData).map((value:any)=>{
        const year = value[0];
        const price = value[1];
        this.assetData.push({label:year,y:price});
      });
  }

  chartOptions = {
	  animationEnabled: true,
    axisY: {
			labelFormatter: (e: any) => {
				var suffixes = ["", "K", "M", "B", "T"];
 
				var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
				if(order > suffixes.length - 1)
					order = suffixes.length - 1;
 
				var suffix = suffixes[order];
				return "Rs. " + (e.value / Math.pow(1000, order)) + " "+suffix;
			}
		},
	  data: [{
		type: "line",
    xValueFormatString: "YYYY",
    yValueFormatString: "$#,###.##",
		dataPoints: this.assetData
	  }]
	}	
}
