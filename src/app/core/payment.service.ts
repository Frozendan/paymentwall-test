import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Country } from '../core/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // In the real project, those keys and enpoint should be import from config files
  // For quick development for this test, I put it directly into this service


  SECRET_KEY = 'Key41fb232d71af108dec0788b78f62aae8';
  API_ENDPOINT = 'https://api.paymentwall.com/api/payment-systems/';
  COUNTRY_CODE = 'VN';
  API_COUNTRY_CODE = 'https://api.paymentwall.com/api/rest/country';

  constructor(private http: HttpClient) { }

  getCountryList() {
    return this.http.get<Country[]>(this.API_ALL_COUNTRY_CODES)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCountry() {
    return this.http.get<Country[]>(this.API_COUNTRY_CODE + `?uid=${this.SECRET_KEY}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getPayment() {
    return this.http.get(this.API_ENDPOINT + `?country_code=${this.COUNTRY_CODE}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(err) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client-side error

      errorMessage = `Error: ${err.error.message}`;

    } else {

      // server-side error

      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;

    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
