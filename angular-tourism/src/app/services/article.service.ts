import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://185.113.134.76:8080/api/articles';

@Injectable({
  providedIn: 'root'
})

export class ArticleService { 

  constructor(private http: HttpClient) { }

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

  find(query): Observable<any> {
    return this.http.get(baseUrl + '/?query=' + query);
  }
  findByTag(query): Observable<any> {
    return this.http.get(baseUrl + '/?tag=' + query);
  }
  findByCountry(query): Observable<any> {
    return this.http.get(baseUrl + '/?country=' + query);
  }
  checkSession(): Observable<any> {
	  return this.http.get('http://185.113.134.76:8080/check');
  }
  
}
