import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

declare var jQuery: any;

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})

export class CompanyFormComponent implements OnInit {
	
	list_countries: any;
	list_cities: any;
	
	editId: string;
	editMode: boolean;
  
	company = {
	
		name_en: '',
		name_ru: '',
		name_kz: '',
		name_es: '',
		name_zh: '',
		image_url: '',
		bin_iin: '',
		country_id: '',
		city_id: '',
		is_active: true,
		webSite:''
	};
	
	languages = [
		
		{"code": "en", "name": "English"},
		{"code": "ru", "name": "Russian"},
		{"code": "kz", "name": "Kazakh"},
		{"code": "es", "name": "Spanish"},
		{"code": "zh", "name": "Chinese"}

	];
	
	constructor(private companyService: CompanyService, private countryService: CountryService, private cityService: CityService, private router: Router, private route: ActivatedRoute) {

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
			
			this.companyService.get(this.editId).subscribe(
					response => {
						
						this.company = response;
						this.onChangeCountry(this.company.country_id);
						this.company.city_id = response.city_id;
						
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
	
	onChangeCountry(countryId) {
		
		this.cityService.getAllByCountry(countryId).subscribe(
			data => {
				this.list_cities = data;
			}
		)
		
	}
	
	saveCompany(): void {
		var d= new Date();
		const data = {

			name_en: this.company.name_en,
			name_ru: this.company.name_ru,
			name_kz: this.company.name_kz,
			name_es: this.company.name_es,
			name_zh: this.company.name_zh,
			image_url: this.company.image_url,
			bin_iin: this.company.bin_iin,
			country_id: this.company.country_id,
			city_id: this.company.city_id,
			is_active: this.company.is_active,
			webSite: this.company.webSite,
			create_date:d.getTime()+d.getTimezoneOffset() * 60000

		};
		
		if (!this.editMode) {
		
			this.companyService.create(data).subscribe(
					response => {
						this.router.navigate(['/companies']);
					},
					error => {
						console.log(error);
					});
				
		}
		else {

			this.companyService.update(this.editId, data).subscribe(
					response => {
						this.router.navigate(['/companies']);
					},
					error => {
						console.log(error);
					});			
			
		}
		
	}

}
