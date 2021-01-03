import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { TagService } from 'src/app/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
	 
	list_countries: any;
	list_cities: any;
	list_tags: any;
	
	editId: string;
	editMode: boolean;
	
	article = {
		
		image_url: '',
		country_id: '',
		city_id: '',
		main_header_en: '',
		main_header_ru: '',
		main_header_kz: '',
		main_header_es: '',
		main_header_zh: '',
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
	
	constructor(private articleService: ArticleService, private tagService: TagService, private countryService: CountryService, private cityService: CityService, private router: Router, private route: ActivatedRoute) {

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
			
			this.articleService.get(this.editId).subscribe(
					response => {
						
						this.article = response;
						this.onChangeCountry(this.article.country_id);
						this.article.city_id = response.city_id;
						
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
	 
	saveArticle(): void {
		
		const data = {
			
			image_url: this.article.image_url,
			country_id: this.article.country_id,
			city_id: this.article.city_id,
			main_header_en: this.article.main_header_en,
			main_header_ru: this.article.main_header_ru,
			main_header_kz: this.article.main_header_kz,
			main_header_es: this.article.main_header_es,
			main_header_zh: this.article.main_header_zh,
			rating: 0,
			likes_count: 0,
			tags: this.article.tags,
			related_sights: '',
			sdescription_en: this.article.sdescription_en,
			sdescription_ru: this.article.sdescription_ru,
			sdescription_kz: this.article.sdescription_kz,
			sdescription_es: this.article.sdescription_es,
			sdescription_zh: this.article.sdescription_zh,
			description_en: this.article.description_en,
			description_ru: this.article.description_ru,
			description_kz: this.article.description_kz,
			description_es: this.article.description_es,
			description_zh: this.article.description_zh,
			gallery_images: '',
			is_active: this.article.is_active,
			
		};
		
		if (!this.editMode) {
		
			this.articleService.create(data).subscribe(
				response => {
					this.router.navigate(['/articles']);
				},
				error => {
					console.log(error);
				});
				
		}
		else {

			this.articleService.update(this.editId, data).subscribe(
				response => {
					this.router.navigate(['/articles']);
				},
				error => {
					console.log(error);
				});			
			
		}
		
	}

}
