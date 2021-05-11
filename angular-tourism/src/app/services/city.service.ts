import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://185.113.134.76:8080/api/cities';

@Injectable({
  providedIn: 'root'
})

export class CityService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<any> {
		return this.http.get(baseUrl);
	}
	
	getAllByCountry(countryId): Observable<any> {
		return this.http.get(baseUrl + '/?countryId=' + countryId);
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
  
	find(query): Observable<any> {
		return this.http.get(baseUrl + '/?query=' + query);
	}
  
}
