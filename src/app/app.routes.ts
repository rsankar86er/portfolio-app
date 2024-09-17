import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddInvestmentComponent } from './components/add-investment/add-investment.component';

export const routes: Routes = [
    {path:'', component:DashboardComponent},
    {path:'addinvestment',component:AddInvestmentComponent}
];
