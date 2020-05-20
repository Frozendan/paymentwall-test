import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Country } from '../core/models/country.model';
import { AbstractControl } from '@angular/forms';

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
  API_ALL_COUNTRY_CODES = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) { }

  getCountryList() {
    return this.http.get(this.API_ALL_COUNTRY_CODES)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCountryByGeolocation() {
    return this.http.get<Country>(this.API_COUNTRY_CODE + `?uid=${this.SECRET_KEY}`)
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

// Takes a credit card string value and returns true on valid number
export function validateCardNumber(control: AbstractControl): { [key: string]: any } | null {
// Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(control.value)) { return { incorrect: true }; }

  // The Luhn Algorithm.
  let nCheck = 0, bEven = false;
  const value = control.value.replace(/\D/g, '');

  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n), nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) { nDigit -= 9; }

    nCheck += nDigit;
    bEven = !bEven;
  }
  return (nCheck % 10) == 0 ? null : { incorrect: true };
}

export function validateExpiredDate(control: AbstractControl): { [key: string]: any } | null {
  const date = new Date();
  if (!/^\d{2}\/\d{2}$/g.test(control.value)) { return { incorrect: true }; }
  console.log(control.value);
  let [ month, year ] = control.value.split('/');
  year = 20 + year;
  const expiryDate = new Date(year, month);
  return expiryDate > date ? null : { incorrect: true };
}


