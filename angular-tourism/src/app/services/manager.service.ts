import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { repeat } from 'rxjs/operators';

const baseUrl = 'http://185.113.134.76:8080/api/managers';
const API_URL = 'http://185.113.134.76:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(baseUrl + '/' + id);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(baseUrl + '/' + id, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(baseUrl + '/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByEmail(email): Observable<any> {
    return this.http.get(baseUrl + '/?email=' + email);
  }
  checkSession(): Observable<any> {
    return this.http.get('http://185.113.134.76:8080/check');
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getRoles(): Observable<any> {
    return this.http.get('http://185.113.134.76:8080/Roles');
  }
}
