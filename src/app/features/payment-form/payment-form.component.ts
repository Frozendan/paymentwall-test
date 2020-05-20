import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../core/payment.service';
import { Country } from '../../core/models/country.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  countries: Country[];
  paymentMethod: {};
  paymentForm: FormGroup;
  constructor(private paymentService: PaymentService,
              private fb: FormBuilder) {
    this.showPayment();
    this.getListCountry();
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      // amount: ['', Validators.required],
      country: ['', Validators.required],
      // paymentMethod: ['', Validators.required],
      // cardName: ['', Validators.required],
      // cardNumber: ['', [Validators.required, cardNumberValidator]],
      // cardExp: ['', [Validators.required, cardExpDateValidator]],
      // cardCVV: ['', Validators.required],
    });
  }

  showPayment() {
    this.paymentService.getPayment().subscribe(data => {
      this.paymentMethod = data;
      console.log(data);
    });
  }

  getListCountry() {
    this.paymentService.getCountryList().subscribe(data => {
      this.countries = data;
      console.log(data)
    });
  }

  onSubmit(){
    console.log(123);
  }

}
