import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount.service';
import { CompanyService } from 'src/app/services/company.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { TagService } from 'src/app/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.css']
})
export class DiscountFormComponent implements OnInit {
	 
	list_companies: any;
	list_countries: any;
	list_cities: any;
	list_tags: any;
	
	editId: string;
	editMode: boolean;
	
	discount = {
		
		image_url: '',
		country_id: '',
		city_id: '',
		main_header_en: '',
		main_header_ru: '',
		main_header_kz: '',
		main_header_es: '',
		main_header_zh: '',
		available_date: '',
		available_date_end: '',
		tags: {},
		company_id: '',
		description_en: '',
		description_ru: '',
		description_kz: '',
		description_es: '',
		description_zh: '',
		sdescription_en: '',
		sdescription_ru: '',
		sdescription_kz: '',
		sdescription_es: '',
		sdescription_zh: '',
		gallery_images: '',
		proceed_url: '',
		is_active: true,
		
	};
		
	languages = [
		
		{"code": "en", "name": "English"},
		{"code": "ru", "name": "Russian"},
		{"code": "kz", "name": "Kazakh"},
		{"code": "es", "name": "Spanish"},
		{"code": "zh", "name": "Chinese"}

	];
	
	currentLanguage = 'en';
	
	constructor(private discountService: DiscountService, private companyService: CompanyService, private tagService: TagService, private countryService: CountryService, private cityService: CityService, private router: Router, private route: ActivatedRoute) {

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
			
			this.discountService.get(this.editId).subscribe(
					response => {
						
						this.discount = response;
						this.onChangeCountry(this.discount.country_id);
						this.discount.city_id = response.city_id;
						
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
				
		this.tagService.getAll()
			.subscribe(
				data => {
					this.list_tags = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
				
		this.companyService.getAll()
			.subscribe(
				data => {
					this.list_companies = data;
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
	 
	saveDiscount(): void {
		
		const data = {
			
			image_url: this.discount.image_url,
			country_id: this.discount.country_id,
			city_id: this.discount.city_id,
			main_header_en: this.discount.main_header_en,
			main_header_ru: this.discount.main_header_ru,
			main_header_kz: this.discount.main_header_kz,
			main_header_es: this.discount.main_header_es,
			main_header_zh: this.discount.main_header_zh,
			available_date: this.discount.available_date,
			available_date_end: this.discount.available_date_end,
			tags: this.discount.tags,
			company_id: this.discount.company_id,
			sdescription_en: this.discount.sdescription_en,
			sdescription_ru: this.discount.sdescription_ru,
			sdescription_kz: this.discount.sdescription_kz,
			sdescription_es: this.discount.sdescription_es,
			sdescription_zh: this.discount.sdescription_zh,
			description_en: this.discount.description_en,
			description_ru: this.discount.description_ru,
			description_kz: this.discount.description_kz,
			description_es: this.discount.description_es,
			description_zh: this.discount.description_zh,
			gallery_images: '',
			proceed_url: this.discount.proceed_url,
			is_active: this.discount.is_active,
			
		};
		
		if (!this.editMode) {
		
			this.discountService.create(data).subscribe(
				response => {
					this.router.navigate(['/discounts']);
				},
				error => {
					console.log(error);
				});
				
		}
		else {

			this.discountService.update(this.editId, data).subscribe(
				response => {
					this.router.navigate(['/discounts']);
				},
				error => {
					console.log(error);
				});			
			
		}
		
	}

}
