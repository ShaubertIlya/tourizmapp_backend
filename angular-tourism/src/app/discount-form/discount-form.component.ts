import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DiscountService } from 'src/app/services/discount.service';
import { CompanyService } from 'src/app/services/company.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { TagService } from 'src/app/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SightService } from '../services/sight.service';
import { DiscountSliderService } from '../services/discount-slider.service';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.css'],
})
export class DiscountFormComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  list_companies: any;
  list_countries: any;
  list_cities: any;
  list_tags: any;
  image: any;

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
    views_count: 0,
    available_date: '',
    available_date_end: '',
    avg_rating: 0,
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
    sight_id: '',
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
  list_sights: any;
  list_slider: any;

  constructor(
    private discountService: DiscountService,
    private formBuilder: FormBuilder,
    private slider: DiscountSliderService,
    private sightService: SightService,
    private companyService: CompanyService,
    private tagService: TagService,
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
      this.discountService.get(this.editId).subscribe(
        (response) => {
          this.discount = response;
          this.onChangeCountry(this.discount.country_id);
          this.discount.city_id = response.city_id;
          this.image = this.discount.image_url;
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
    this.slider.getAll().subscribe(
      (data) => {
        this.list_slider = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.countryService.getAll().subscribe(
      (data) => {
        this.list_countries = data;
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

    this.companyService.getAll().subscribe(
      (data) => {
        this.list_companies = data;
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

    this.discountService.UploadImage(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = '';
          this.fileInputLabel = undefined;
          console.log(response);
          this.discount.image_url = response.uploadedFile.path;
          this.image =
            'http://185.113.134.76:8080/my_uploaded_files/' +
            response.uploadedFile.filename;
        }
      },
      (er) => {
        console.log(er);
        alert(er.error.error);
      }
    );
  }

  saveDiscount(): void {
    var d = new Date();
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
      avg_rating: this.discount.avg_rating,
      views_count: this.discount.views_count,
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
      create_date: d.getTime() + d.getTimezoneOffset() * 60000,
      sight_id: this.discount.sight_id,
      slider_id: this.discount.slider_id,
    };
    console.log(this.discount.slider_id);
    if (!this.editMode) {
      this.discountService.create(data).subscribe(
        (response) => {
          this.router.navigate(['/discounts']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.discountService.update(this.editId, data).subscribe(
        (response) => {
          this.router.navigate(['/discounts']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
