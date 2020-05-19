import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // In the real project, those keys and enpoint should be import from config files
  // For quick development for this test, I put it directly into this service

  PROJECT_KEY = 'e209c1155738e7c287ff2add312d1e43';
  SECRET_KEY = 'Key41fb232d71af108dec0788b78f62aae8';
  API_ENDPOINT = 'https://api.paymentwall.com/api/payment-systems/';
  COUNTRY_CODE = 'VN';

  constructor(private http: HttpClient) { }

  getPayment() {
    return this.http.get(this.API_ENDPOINT + `?key=${this.PROJECT_KEY}&country_code=${this.COUNTRY_CODE}`);
  }
}
