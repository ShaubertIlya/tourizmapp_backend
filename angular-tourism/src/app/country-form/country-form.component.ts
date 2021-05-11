import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

declare var jQuery: any;

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})

export class CountryFormComponent implements OnInit {
	
	editId: string;
	editMode: boolean;
  
	country = {
	
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
		{"code": "zh", "name": "Chinese"}

	];
	
	constructor(private countryService: CountryService, private router: Router, private route: ActivatedRoute) {

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
			
			this.countryService.get(this.editId).subscribe(
					response => {
						this.country = response;
					},
					error => {
						console.log(error);
					});
		
		}
		
	}
	
	saveCountry(): void {
		var d = new Date();
		const data = {

			name_en: this.country.name_en,
			name_ru: this.country.name_ru,
			name_kz: this.country.name_kz,
			name_es: this.country.name_es,
			name_zh: this.country.name_zh,
			is_active: this.country.is_active,
			create_date:d.getTime()+d.getTimezoneOffset() * 60000,
			iata:this.country.iata
		};
		
		if (!this.editMode) {
		
			this.countryService.create(data).subscribe(
					response => {
						this.router.navigate(['/countries']);
					},
					error => {
						console.log(error);
					});
				
		}
		else {

			this.countryService.update(this.editId, data).subscribe(
					response => {
						this.router.navigate(['/countries']);
					},
					error => {
						console.log(error);
					});			
			
		}
		
	}

}
