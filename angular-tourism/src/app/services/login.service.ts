import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = 'http://185.113.134.76:8080/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  process(data): Observable<any> {
    console.log(data);
    return this.http.post(baseUrl, data).pipe(catchError(this.handleError.bind(this)));
  }
  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
       console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }

   // return an observable with a meaningful error message to the end user
   return throwError('There is a problem with the service.We are notified & working on it.Please try again later.');
  }
  signOut(): void {
    window.sessionStorage.clear();
  }

}
