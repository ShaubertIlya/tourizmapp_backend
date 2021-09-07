import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SightService } from 'src/app/services/sight.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { TagService } from 'src/app/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ReactiveFormsModule } from '@angular/forms';
import { DiscountService } from '../services/discount.service';
import { UploadFilesService } from '../services/upload-files.service';

@Component({
  selector: 'app-sight-form',
  templateUrl: './sight-form.component.html',
  styleUrls: ['./sight-form.component.css'],
})
export class SightFormComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  list_countries: any;
  list_cities: any;
  list_tags: any;

  editId: string;
  editMode: boolean;
  image: any;
  isUploaded: boolean = false;
  sight = {
    image_url: '',
    country_id: '',
    city_id: '',
    name_en: '',
    views_count: 0,
    name_ru: '',
    name_kz: '',
    name_es: '',
    name_zh: '',
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
    longitude: '',
    latitude: '',
    is_active: true,
    discount_id: {},
    slider_id: '',
  };

  languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'kz', name: 'Kazakh' },
    { code: 'es', name: 'Spanish' },
    { code: 'zh', name: 'Chinese' },
  ];

  currentLanguage = 'en';
  list_discount: any;
  list_slider: any;

  constructor(
    private sightService: SightService,
    private uploadService: UploadFilesService,
    private discountService: DiscountService,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });
    this.editId = null;
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editId = params['id'];
        this.editMode = true;
      }
    });

    if (this.editMode) {
      this.sightService.get(this.editId).subscribe(
        (response) => {
          this.sight = response;
          this.onChangeCountry(this.sight.country_id);
          this.sight.city_id = response.city_id;
          this.image = this.sight.image_url;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.countryService.getAll().subscribe(
      (data) => {
        this.list_countries = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.uploadService.getAll().subscribe(
      (data) => {
        this.list_slider = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.discountService.getAll().subscribe(
      (data) => {
        this.list_discount = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.tagService.getAll().subscribe(
      (data) => {
        this.list_tags = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChangeCountry(countryId) {
    this.cityService.getAllByCountry(countryId).subscribe((data) => {
      this.list_cities = data;
    });
    var d = new Date();
    console.log(d.getTime() - d.getTimezoneOffset() * 3600 * 6);
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
    formData.append(
      'uploadedImage',
      this.fileUploadForm.get('uploadedImage').value
    );
    formData.append('agentId', '007');

    this.sightService.UploadImage(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = '';
          this.fileInputLabel = undefined;
          console.log(response);
          this.sight.image_url = response.uploadedFile.path;
          this.image =
            'http://185.113.134.76:8080/my_uploaded_files/' +
            response.uploadedFile.filename;
          this.isUploaded = true;
        }
      },
      (er) => {
        console.log(er);
        alert(er.error.error);
      }
    );
  }

  saveSight(): void {
    var d = new Date();
    const data = {
      isUploaded: this.isUploaded,
      image_url: this.sight.image_url,
      country_id: this.sight.country_id,
      city_id: this.sight.city_id,
      name_en: this.sight.name_en,
      name_ru: this.sight.name_ru,
      name_kz: this.sight.name_kz,
      name_es: this.sight.name_es,
      name_zh: this.sight.name_zh,
      avg_rating: this.sight.avg_rating,
      views_count: this.sight.views_count,
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
      create_date: d.getTime() - d.getTimezoneOffset() * 3600 * 3600,
      discount_id: this.sight.discount_id,
      slider_id: this.sight.slider_id,
    };
    console.log(data);
    console.log(this.sight.slider_id);
    if (!this.editMode) {
      this.sightService.create(data).subscribe(
        (response) => {
          this.router.navigate(['/sights']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.sightService.update(this.editId, data).subscribe(
        (response) => {
          this.router.navigate(['/sights']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
