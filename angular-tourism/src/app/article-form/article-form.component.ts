import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { TagService } from 'src/app/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SightService } from '../services/sight.service';
import { ArticleSliderService } from '../services/article-slider.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
	@ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
	fileUploadForm: FormGroup;
	fileInputLabel: string;
	list_countries: any;
	list_cities: any;
	list_tags: any;
	
	editId: string;
	editMode: boolean;
	image:any;
	article = {
		
		image_url: '',
		country_id: '',
		city_id: '',
		main_header_en: '',
		main_header_ru: '',
		main_header_kz: '',
		main_header_es: '',
		main_header_zh: '',
		avg_rating: 0,
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
		sight_id:'',
		views_count:0,
		slider_id:''
	};
		
	languages = [
		
		{"code": "en", "name": "English"},
		{"code": "ru", "name": "Russian"},
		{"code": "kz", "name": "Kazakh"},
		{"code": "es", "name": "Spanish"},
		{"code": "deu", "name": "Chinese"}

	];
	
	currentLanguage = 'en';
	list_sights: any;
	list_slider: any;
	
	constructor(private articleService: ArticleService,private slider:ArticleSliderService,private sightService: SightService,private formBuilder: FormBuilder, private tagService: TagService, private countryService: CountryService, private cityService: CityService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): void {
		this.fileUploadForm = this.formBuilder.group({
			uploadedImage: ['']
		  });
		this.editId = null;
		this.route.params.subscribe(params => {
			if (params['id']) {
						
				this.editId = params['id'];
				this.editMode = true;
				
			}
		});
		this.sightService.getAll()
			.subscribe(
				data => {
					this.list_sights = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		this.slider.getAll()
				.subscribe(
					data => {
						this.list_slider = data;
						console.log(data);
					},
					error => {
						console.log(error);
					});
		if (this.editMode) {
			
			this.articleService.get(this.editId).subscribe(
					response => {
						
						this.article = response;
						this.onChangeCountry(this.article.country_id);
						this.article.city_id = response.city_id;
						this.image = this.article.image_url;
						console.log(this.article);
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
	onFileSelect(event) {
		const file = event.target.files[0];
		this.fileInputLabel = file.name;
		this.fileUploadForm.get('uploadedImage').setValue(file);
	  }
	onFormSubmit() {
	
		if (!this.fileUploadForm.get('uploadedImage').value) {
		  alert('Please fill valid details!');
		  return false;
		}
	
		const formData = new FormData();
		formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
		formData.append('agentId', '007');
	
		this.articleService.UploadImage(formData).subscribe(response => {
			console.log(response);
			if (response.statusCode === 200) {
			  // Reset the file input
			  this.uploadFileInput.nativeElement.value = "";
			  this.fileInputLabel = undefined;
			  console.log(response);
			  this.article.image_url = response.uploadedFile.path;
			  this.image = "http://185.113.134.76:8080/my_uploaded_files/"+response.uploadedFile.filename
			}
			}, er => {
			console.log(er);
			alert(er.error.error);
			});
	
	  }
	saveArticle(): void {
		var d = new Date();
		const data = {
			
			image_url:  this.article.image_url,
			country_id: this.article.country_id,
			city_id: this.article.city_id,
			main_header_en: this.article.main_header_en,
			main_header_ru: this.article.main_header_ru,
			main_header_kz: this.article.main_header_kz,
			main_header_es: this.article.main_header_es,
			main_header_zh: this.article.main_header_zh,
			avg_rating: this.article.avg_rating,
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
			sight_id:this.article.sight_id,
			views_count:this.article.views_count,
			create_date:d.getTime()+d.getTimezoneOffset() * 60000,
			slider_id:this.article.slider_id
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
