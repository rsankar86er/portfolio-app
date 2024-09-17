import { Component } from '@angular/core';
import { DataService, Data } from '../../data.service';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-add-investment',
  standalone: true,
  imports: [CommonModule, AlertComponent, ReactiveFormsModule, NgIf, LoaderComponent],
  templateUrl: './add-investment.component.html',
  styleUrl: './add-investment.component.css'
})
export class AddInvestmentComponent {

  assetForm!: FormGroup;

  alertType:string = 'info';
  alertMessage:string = 'Sample Alert Message';
  alertEnable:boolean = false;
  isLoading:boolean = true;

  constructor(private dataService:DataService, private router:Router, private fb: FormBuilder){

  }


  ngOnInit(): void {
    this.assetForm = this.fb.group({
      assetType: ['', [Validators.required]],
      purchaseQuantity: [0, [Validators.required, Validators.min(1)]],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      purchaseDate: ['', [Validators.required]]
    });
    this.isLoading = false;
  }

  onSubmit() {
    this.isLoading = true;
    if (this.assetForm.valid) {
    this.dataService.postData(this.assetForm.value).subscribe(
      response => {
        this.alertType='success';
        this.alertMessage='Details added Successfully';
        this.alertEnable = true;
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['']);
        }, 2000);
      },
      error => {
        this.alertType='danger';
        this.alertMessage= error;
        this.alertEnable = true;
      }
    );
    }
  }

}
