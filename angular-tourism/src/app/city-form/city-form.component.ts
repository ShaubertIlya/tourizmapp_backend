import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SightService } from '../services/sight.service';

declare var jQuery: any;

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})

export class CityFormComponent implements OnInit {
	
	list_countries: any;
	editId: string;
	editMode: boolean;
  
	city = {
	
		country_id: 0,
		name_en: '',
		name_ru: '',
		name_kz: '',
		name_es: '',
		name_zh: '',
		is_active: true,
		iata:''
		
	};
	
	languages = [
		
		{"code": "en", "name": "English"},
		{"code": "ru", "name": "Russian"},
		{"code": "kz", "name": "Kazakh"},
		{"code": "es", "name": "Spanish"},
		{"code": "deu", "name": "Chinese"}

	];
	list_sights: any;
	
	constructor(private cityService: CityService, private countryService: CountryService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): void {

		this.editId = null;
		this.route.params.subscribe(params => {
			if (params['id']) {
						
				this.editId = params['id'];
				this.editMode = true;
				
			}
		});
	
		if (this.editMode) {
			
			this.cityService.get(this.editId).subscribe(
					response => {
						this.city = response;
					},
					error => {
						console.log(error);
					});
		
		}
		
		this.countryService.getAll()
			.subscribe(
				data => {
					this.list_countries = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	saveCity(): void {
		var d= new Date();
		const data = {
			
			country_id: this.city.country_id,
			name_en: this.city.name_en,
			name_ru: this.city.name_ru,
			name_kz: this.city.name_kz,
			name_es: this.city.name_es,
			name_zh: this.city.name_zh,
			is_active: this.city.is_active,
			create_date:d.getTime()+d.getTimezoneOffset() * 60000,
			iata:this.city.iata
			
		};
		
		if (!this.editMode) {
		
			this.cityService.create(data).subscribe(
					response => {
						this.router.navigate(['/cities']);
					},
					error => {
						console.log(error);
					});
				
		}
		else {

			this.cityService.update(this.editId, data).subscribe(
					response => {
						this.router.navigate(['/cities']);
					},
					error => {
						console.log(error);
					});			
			
		}
		
	}

}
