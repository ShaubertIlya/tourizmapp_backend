import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountSliderService {
  private baseUrl2 = 'http://185.113.134.76:8080';
  private baseUrl = 'http://185.113.134.76:8080/api/discountSlider';
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('uploadedImage', file);

	return this.UploadImage(formData);
  }
  UploadImage(formData):Observable<any>{
	return this.http
	 .post<any>('http://185.113.134.76:8080/uploadfile', formData);
   }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl2}/api/discountSlider`);
  }
  getContent(id): Observable<any> {
	return this.http.get("http://185.113.134.76:8080/api/getSliderContent" + '/' + id);
}
setMain(sightId,editId): Observable<any> {
    return this.http.get("http://185.113.134.76:8080/api/slider/updateMain/"+sightId+"/"+editId);
  }
  createContent(data): Observable<any> {
	return this.http.post("http://185.113.134.76:8080/api/slider/saveContent", data);
}
  deleteContent(id): Observable<any> {
	return this.http.delete("http://185.113.134.76:8080/api/sliderContent" + '/' + id);
}
  getAll(): Observable<any> {
		return this.http.get(this.baseUrl);
	}
	
	getAllBySight(sightId): Observable<any> {
		return this.http.get(this.baseUrl + '/?sightId=' + sightId);
	}
	get(id): Observable<any> {
		return this.http.get(this.baseUrl + '/' + id);
	}

	create(data): Observable<any> {
		return this.http.post(this.baseUrl, data);
	}

	update(id, data): Observable<any> {
		return this.http.put(this.baseUrl + '/' + id, data);
	}

	delete(id): Observable<any> {
		return this.http.delete(this.baseUrl + '/' + id);
	}

	deleteAll(): Observable<any> {
		return this.http.delete(this.baseUrl);
	}

	find(query): Observable<any> {
		return this.http.get(this.baseUrl + '/?query=' + query);
	}
}
