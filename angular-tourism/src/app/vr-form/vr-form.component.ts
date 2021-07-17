import { Component, OnInit } from '@angular/core';
import { ArService } from 'src/app/services/ar.service';
import { SightService } from 'src/app/services/sight.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { VrService } from '../services/vr.service';

@Component({
  selector: 'app-vr-form',
  templateUrl: './vr-form.component.html',
  styleUrls: ['./vr-form.component.css'],
})
export class VrFormComponent implements OnInit {
  list_sights: any;
  files: any[];
  uploaded: boolean;

  editId: string;
  editMode: boolean;

  ar = {
    file_url: '',
    file_url2: '',
    version: '',
    sight_id: '',
    main_header_en: '',
    main_header_ru: '',
    main_header_kz: '',
    main_header_es: '',
    main_header_zh: '',
    is_active: true,
  };

  languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'kz', name: 'Kazakh' },
    { code: 'es', name: 'Spanish' },
    { code: 'zh', name: 'Chinese' },
  ];

  currentLanguage = 'en';

  constructor(
    private arService: VrService,
    private sightService: SightService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
          this.ar.file_url = response.file_url;
          this.ar.file_url2 = response.file_url2;
          this.ar.version = response.version;

          this.ar.sight_id = response.sight_id;
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
      version: this.ar.version,
      main_header_en: this.ar.main_header_en,
      main_header_ru: this.ar.main_header_ru,
      main_header_kz: this.ar.main_header_kz,
      main_header_es: this.ar.main_header_es,
      main_header_zh: this.ar.main_header_zh,
      is_active: this.ar.is_active,
      sight_id: this.ar.sight_id,
      create_date: d.getTime() + d.getTimezoneOffset() * 60000,
    };
    console.log(this.ar);
    if (!this.editMode) {
      this.arService.create(data).subscribe(
        (response) => {
          this.router.navigate(['/vr']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log(data);
      this.arService.update(this.editId, data).subscribe(
        (response) => {
          this.router.navigate(['/vr']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
