import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

declare var jQuery: any;

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})

export class TagFormComponent implements OnInit {
	
	editId: string;
	editMode: boolean;
  
	tag = {
	
		name_en: '',
		name_ru: '',
		name_kz: '',
		name_es: '',
		name_zh: '',
		is_active: true,
		
	};
	
	languages = [
		
		{"code": "en", "name": "English"},
		{"code": "ru", "name": "Russian"},
		{"code": "kz", "name": "Kazakh"},
		{"code": "es", "name": "Spanish"},
		{"code": "zh", "name": "Chinese"}

	];
	
	constructor(private tagService: TagService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): void {
		
		jQuery('.tagsList').show();
		jQuery('.switchLang').first().click();

		this.editId = null;
		this.route.params.subscribe(params => {
			if (params['id']) {
						
				this.editId = params['id'];
				this.editMode = true;
				
			}
		});
		
		if (this.editMode) {
			
			this.tagService.get(this.editId).subscribe(
					response => {
						this.tag = response;
					},
					error => {
						console.log(error);
					});
		
		}
		
	}
	
	saveTag(): void {
		var d = new Date();
		const data = {

			name_en: this.tag.name_en,
			name_ru: this.tag.name_ru,
			name_kz: this.tag.name_kz,
			name_es: this.tag.name_es,
			name_zh: this.tag.name_zh,
			is_active: this.tag.is_active,
			create_date:d.getTime()+d.getTimezoneOffset() * 60000
			
		};
		
		if (!this.editMode) {
		
			this.tagService.create(data).subscribe(
					response => {
						this.router.navigate(['/tags']);
					},
					error => {
						console.log(error);
					});
				
		}
		else {

			this.tagService.update(this.editId, data).subscribe(
					response => {
						this.router.navigate(['/tags']);
					},
					error => {
						console.log(error);
					});			
			
		}
		
	}

}
