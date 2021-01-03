import { Component, OnInit } from '@angular/core';
import { ArService } from 'src/app/services/ar.service';
import { SightService } from 'src/app/services/sight.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';   

const URL = 'http://185.113.134.76:8080/api/upload';
const fileUrl = 'http://185.113.134.76/uploads/';

@Component({
  selector: 'app-ar-form',
  templateUrl: './ar-form.component.html',
  styleUrls: ['./ar-form.component.css']
})
export class ArFormComponent implements OnInit {
	 
	list_sights: any;
	files: any[];
	uploaded: boolean;
	
	public uploader: FileUploader = new FileUploader({
		
		url: URL,
		itemAlias: 'file'
		
	});
	
	editId: string;
	editMode: boolean;
	
	ar = {
		
		file_url: '',
		sight_id: '',
		main_header_en: '',
		main_header_ru: '',
		main_header_kz: '',
		main_header_es: '',
		main_header_zh: '',
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
	
	constructor(private arService: ArService, private sightService: SightService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): void {
		
		this.uploader.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.uploader.onCompleteItem = (item: any, status: any) => {
			
			this.ar.file_url = fileUrl + status;
			this.uploaded = true;
			console.log('Uploaded File Details:', item);
			
		};
		
		this.uploaded = null;
		this.editId = null;
		this.route.params.subscribe(params => {
			if (params['id']) {
						
				this.editId = params['id'];
				this.editMode = true;
				
			}
		});
		
		if (this.editMode) {
			
			this.arService.get(this.editId).subscribe(
					response => {
						
						this.ar = response;
						this.ar.sight_id = response.sight_id;
						
					},
					error => {
						console.log(error);
					});
		
		}
	  
		this.sightService.getAll()
			.subscribe(
				data => {
					this.list_sights = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
	  
	}
	
	onFileChange(event) {
		
		this.files = event.target.files;
		console.log(this.files);
		
	}
	
	saveAr(): void {
		
		const data = {
			
			file_url: this.ar.file_url,
			sight_id: this.ar.sight_id,
			main_header_en: this.ar.main_header_en,
			main_header_ru: this.ar.main_header_ru,
			main_header_kz: this.ar.main_header_kz,
			main_header_es: this.ar.main_header_es,
			main_header_zh: this.ar.main_header_zh,
			is_active: this.ar.is_active,
			
		};
		
		if (!this.editMode) {
		
			this.arService.create(data).subscribe(
				response => {
					this.router.navigate(['/ar']);
				},
				error => {
					console.log(error);
				});
				
		}
		else {

			this.arService.update(this.editId, data).subscribe(
				response => {
					this.router.navigate(['/ar']);
				},
				error => {
					console.log(error);
				});			
			
		}
		
	}

}
