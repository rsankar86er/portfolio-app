import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-asset-allocation',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './asset-allocation.component.html',
  styleUrl: './asset-allocation.component.css'
})


export class AssetAllocationComponent {

  @Input() assetAllocationData:any;
  assetData:any[] = [];
  
  ngOnChanges():void{
      Object.entries(this.assetAllocationData).map((assetD:any)=>{
        const a = assetD[1].assetType;
        const p = assetD[1].percentage;
        this.assetData.push({asset:a,y:p});
      });
  }


  chartOptions = {
	  animationEnabled: true,
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{asset}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: this.assetData
	  }]
	}	
}
