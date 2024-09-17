import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() alertType:string = 'info';
  @Input() alertMessage:string = 'sample message';
  @Input() alertEnable:boolean = false;
  alertClass:string = '';

  ngOnChanges(){
    if(this.alertEnable){
      this.alertClass = `alert alert-${this.alertType} alert-dismissible fade show`;
    } else {
      this.alertClass = `alert alert-${this.alertType} alert-dismissible fade hide`;
    }
  }
}
