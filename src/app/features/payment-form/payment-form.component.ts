import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../core/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  constructor(private paymentService: PaymentService) {
    this.showPayment();
  }

  ngOnInit(): void {
  }

  showPayment() {
    this.paymentService.getPayment().subscribe(data => {
      console.log(data);
    });
  }

}
