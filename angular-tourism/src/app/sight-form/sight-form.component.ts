import { Component, OnInit } from '@angular/core';
import { SightService } from 'src/app/services/sight.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { TagService } from 'src/app/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-sight-form',
  templateUrl: './sight-form.component.html',
  styleUrls: ['./sight-form.component.css']
})
export class SightFormComponent implements OnInit {
	 
	list_countries: any;
	list_cities: any;
	list_tags: any;
	
	editId: string;
	editMode: boolean;
	
	sight = {
		
		image_url: '',
		country_id: '',
		city_id: '',
		name_en: '',
		name_ru: '',
		name_kz: '',
		name_es: '',
		name_zh: '',
		rating: 0,
		likes_count: 0,
		tags: {},
		related_sights: '',
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
		longitude: '',
		latitude: '',
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
	
	constructor(private sightService: SightService, private tagService: TagService, private countryService: CountryService, private cityService: CityService, private router: Router, private route: ActivatedRoute) {

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
			
			this.sightService.get(this.editId).subscribe(
					response => {
						
						this.sight = response;
						this.onChangeCountry(this.sight.country_id);
						this.sight.city_id = response.city_id;
						
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
	  
	}
	
	onChangeCountry(countryId) {
		
		this.cityService.getAllByCountry(countryId).subscribe(
			data => {
				this.list_cities = data;
			}
		)
		
	}
	 
	saveSight(): void {
		
		const data = {
			
			image_url: this.sight.image_url,
			country_id: this.sight.country_id,
			city_id: this.sight.city_id,
			name_en: this.sight.name_en,
			name_ru: this.sight.name_ru,
			name_kz: this.sight.name_kz,
			name_es: this.sight.name_es,
			name_zh: this.sight.name_zh,
			rating: this.sight.rating,
			tags: this.sight.tags,
			sdescription_en: this.sight.sdescription_en,
			sdescription_ru: this.sight.sdescription_ru,
			sdescription_kz: this.sight.sdescription_kz,
			sdescription_es: this.sight.sdescription_es,
			sdescription_zh: this.sight.sdescription_zh,
			description_en: this.sight.description_en,
			description_ru: this.sight.description_ru,
			description_kz: this.sight.description_kz,
			description_es: this.sight.description_es,
			description_zh: this.sight.description_zh,
			longitude: this.sight.longitude,
			latitude: this.sight.latitude,
			gallery_images: '',
			is_active: this.sight.is_active,
			
		};
		
		if (!this.editMode) {
		
			this.sightService.create(data).subscribe(
				response => {
					this.router.navigate(['/sights']);
				},
				error => {
					console.log(error);
				});
				
		}
		else {

			this.sightService.update(this.editId, data).subscribe(
				response => {
					this.router.navigate(['/sights']);
				},
				error => {
					console.log(error);
				});			
			
		}
		
	}

}
