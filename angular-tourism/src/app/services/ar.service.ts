import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://185.113.134.76:8080/api/ar';

@Injectable({
  providedIn: 'root',
})
export class ArService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getAllBySight(sightId): Observable<any> {
    return this.http.get(baseUrl + '/?sightId=' + sightId);
  }
  UploadImage(formData): Observable<any> {
    return this.http.post<any>(
      'http://185.113.134.76:8080/uploadfiles',
      formData
    );
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

  find(query): Observable<any> {
    return this.http.get(baseUrl + '/?query=' + query);
  }
}
