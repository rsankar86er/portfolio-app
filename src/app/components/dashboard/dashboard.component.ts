import { Component } from '@angular/core';
import { AssetAllocationComponent } from '../asset-allocation/asset-allocation.component';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { Data, DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AssetAllocationComponent, StockChartComponent, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  data: Data[] = [];
  assetAllocationData : any;
  performanceData : any;
  isLoading:boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    
    this.dataService.getData().subscribe(
      (response: Data[]) => {
        this.data = response;
        const result = this.calculatePercentageByAssetType(response);
        const result1 = this.accumulatePricesByDate(response);
        this.assetAllocationData = result;
        this.performanceData = result1;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
   
  }

// Function to accumulate prices by date
accumulatePricesByDate(data:any) {
  return data.reduce((accumulator:any, entry:any) => {
    if (accumulator[entry.purchaseDate]) {
      accumulator[entry.purchaseDate] += entry.purchasePrice;
    } else {
      accumulator[entry.purchaseDate] = entry.purchasePrice;
    }
    return accumulator;
  }, {});
}

  calculatePercentageByAssetType(data:any) {


    let finalTotal = 0;

    // Step 1: Calculate total value for each asset type
    const totalValueByType = data.reduce((acc:any, item:any) => {
      const { assetType, purchasePrice, purchaseQuantity } = item;
      const totalValue = purchasePrice;
      if (!acc[assetType]) {
        acc[assetType] = { totalValue: 0, prices: {} };
      }
      acc[assetType].totalValue += totalValue;
      acc[assetType].prices[purchasePrice] = (acc[assetType].prices[purchasePrice] || 0) + totalValue;
      return acc;
    }, {});

  
    // Step 2: Calculate percentage for each asset price within its asset type
    const percentagesByType = Object.keys(totalValueByType).map(assetType => {
      const typeData = totalValueByType[assetType];
      const tvalue = typeData.totalValue;
      finalTotal = finalTotal + typeData.totalValue;
      return { assetType, tvalue}
    }).flat();

    const assetPercentage = percentagesByType.map(asset => {
      const percentage = asset.tvalue / finalTotal*100;
      const assetType = asset.assetType;
      return {assetType, percentage}
    })
  
    return assetPercentage;
  }

}
