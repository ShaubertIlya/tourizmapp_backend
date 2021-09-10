import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArService } from 'src/app/services/ar.service';
import { SightService } from 'src/app/services/sight.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { UploadFileService } from '../upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

const URL = 'http://185.113.134.76:8080/api/upload';
const fileUrl = 'http://185.113.134.76/uploads/';

@Component({
  selector: 'app-ar-form',
  templateUrl: './ar-form.component.html',
  styleUrls: ['./ar-form.component.css'],
})
export class ArFormComponent implements OnInit {
  list_sights: any;
  files: any[];
  uploaded: boolean;
  file: any;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  @ViewChild('UploadFileInput2', { static: false })
  uploadFileInput2: ElementRef;
  fileUploadForm2: FormGroup;
  fileInputLabel2: string;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  editId: string;
  editMode: boolean;

  ar = {
    file_url: '',
    file_url2: '',
    sight_id: '',
    main_header_en: '',
    main_header_ru: '',
    main_header_kz: '',
    main_header_es: '',
    main_header_zh: '',
    is_active: true,
    version: 0,
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
    audio_kz: '',
    audio_en: '',
    audio_ru: '',
  };

  languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'kz', name: 'Kazakh' },
    { code: 'es', name: 'Spanish' },
    { code: 'zh', name: 'Chinese' },
  ];

  currentLanguage = 'en';
  file2: string;
  files2: any;
  EvenDown = false;
  constructor(
    private arService: ArService,
    private uploadService: UploadFileService,
    private formBuilder: FormBuilder,
    private sightService: SightService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });
    this.fileUploadForm2 = this.formBuilder.group({
      uploadedImage2: [''],
    });
    this.uploaded = null;
    this.editId = null;
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editId = params['id'];
        this.editMode = true;
      }
    });

    if (this.editMode) {
      this.arService.get(this.editId).subscribe(
        (response) => {
          this.ar = response;
          this.ar.sight_id = response.sight_id;
          this.file = response.file_url;
          this.file2 = response.file_url2;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.sightService.getAll().subscribe(
      (data) => {
        this.list_sights = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveAr(): void {
    var d = new Date();
    const data = {
      file_url: this.ar.file_url,
      file_url2: this.ar.file_url2,
      sight_id: this.ar.sight_id,
      main_header_en: this.ar.main_header_en,
      main_header_ru: this.ar.main_header_ru,
      main_header_kz: this.ar.main_header_kz,
      main_header_es: this.ar.main_header_es,
      main_header_zh: this.ar.main_header_zh,
      is_active: this.ar.is_active,
      version: this.ar.version,
      audio_kz: this.ar.audio_kz,
      audio_en: this.ar.audio_en,
      audio_ru: this.ar.audio_ru,
      description_en: this.ar.description_en,
      description_ru: this.ar.description_ru,
      description_kz: this.ar.description_kz,
      description_es: this.ar.description_es,
      description_zh: this.ar.description_zh,
      sdescription_en: this.ar.sdescription_en,
      sdescription_ru: this.ar.sdescription_ru,
      sdescription_kz: this.ar.sdescription_kz,
      sdescription_es: this.ar.sdescription_es,
      sdescription_zh: this.ar.sdescription_zh,
      create_date: d.getTime() + d.getTimezoneOffset() * 60000,
    };
    console.log(data);
    if (!this.editMode) {
      this.arService.create(data).subscribe(
        (response) => {
          this.router.navigate(['/ar']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      const formData = new FormData();
      formData.append(
        'uploadedFile',
        this.fileUploadForm.get('uploadedImage').value
      );
      formData.append('agentId', '007');

      this.arService.UploadImage(formData).subscribe(
        (response) => {
          console.log(response);
          if (response.statusCode === 200) {
            // Reset the file input
            this.uploadFileInput.nativeElement.value = '';
            this.fileInputLabel = undefined;
            console.log(response);
            this.ar.file_url = response.uploadedFile.path;
            this.file =
              'http://185.113.134.76:8080/my_files/' +
              response.uploadedFile.filename;
          }
        },
        (er) => {
          console.log(er);
          alert(er.error.error);
        }
      );
    }
  }

  onFileChange2(event) {
    this.files2 = event.target.files;
    console.log(this.files2);
  }
  onFileSelect2(event) {
    const file = event.target.files[0];
    this.fileInputLabel2 = file.name;
    console.log(this.fileUploadForm2.get('uploadedImage2'));
    this.fileUploadForm2.get('uploadedImage2').setValue(file);
  }
  onFormSubmit2() {
    if (!this.fileUploadForm2.get('uploadedImage2').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append(
      'uploadedFile',
      this.fileUploadForm2.get('uploadedImage2').value
    );

    this.arService.UploadImage(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput2.nativeElement.value = '';
          this.fileInputLabel2 = undefined;
          console.log(response);
          this.ar.file_url2 = response.uploadedFile.path;
          this.file2 =
            'http://185.113.134.76:8080/my_files/' +
            response.uploadedFile.filename;
        }
      },
      (er) => {
        console.log(er);
        alert(er.error.error);
      }
    );
  }
}
