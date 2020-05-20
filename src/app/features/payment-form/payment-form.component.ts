import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaymentService, validateCardNumber, validateExpiredDate} from '../../core/payment.service';
import { Country } from '../../core/models/country.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild('content')
  content: ElementRef;

  countries: any = [];
  paymentMethod: any = [];
  paymentForm: FormGroup;
  currentCurrency: '';
  constructor(private paymentService: PaymentService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      country: ['', Validators.required],
      amount: ['', [Validators.required]],
      paymentMethod: ['', Validators.required],
      cardholderName: ['', Validators.required],
      creditCardNumber: ['', [Validators.required, validateCardNumber]],
      expDate: ['', [Validators.required, validateExpiredDate]],
      cvv: ['', Validators.required],
    });
    this.initListCountry();
    this.showPayment();
    this.paymentForm.get('country').valueChanges.subscribe(data => {
      this.getCurrency(data);
    });
  }

  async initListCountry() {
    try {
      this.countries = await this.paymentService.getCountryList().toPromise();
      const currCountry: any = await this.paymentService.getCountryByGeolocation().toPromise();
      this.paymentForm.patchValue({ country: currCountry.code });
    } catch (e) {
      console.log(e);
    }
  }

  getCurrency(code){
    const filteredCountry: any = this.countries.filter((country: any) => country.alpha2Code === code);
    this.currentCurrency = filteredCountry[0].currencies[0].code;
  }

  showPayment() {
    this.paymentService.getPayment().subscribe(data => {
      this.paymentMethod = data;
      console.log(data);
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  onSubmit(){
    if (this.paymentForm.invalid) {
      return;
    }
    this.openModal(this.content);
  }

}
