import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleSliderService } from '../services/article-slider.service';
import { ArticleService } from '../services/article.service';
import { UploadFilesService } from '../services/upload-files.service';
import { Slider } from '../slider/slider.component';
declare var jQuery: any;

@Component({
  selector: 'app-articles-slider',
  templateUrl: './articles-slider.component.html',
  styleUrls: ['./articles-slider.component.css'],
})
export class ArticlesSliderComponent implements OnInit {
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  model = {
    _id: '',
    article_id: '',
    active: '',
    list: ([] = ['']),
    is_main: false,
    name: '',
  };
  is_main: '';
  fileInfos: Observable<any>;
  listImg: Slider[] = [];
  editingList: String[] = [];
  editMode: any;
  list_sights: any;
  editId: any;
  deleted: any;
  listSl: String[] = [];
  uploadedWhenEditing = false;

  constructor(
    private uploadService: ArticleSliderService,
    private sightService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.editId = null;
    this.editMode = false;
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editId = params['id'];
        this.editMode = true;
      }
    });

    if (this.editMode) {
      console.log();
      this.uploadService.get(this.editId).subscribe(
        (data) => {
          this.model = data;
          // this.model.list = data.url.split(",");
          console.log(data);
          // this.listImg = data.url.split(",");
          // this.fileInfos =data;
          this.uploadService.getContent(this.model._id).subscribe(
            (data) => {
              console.log(data);

              for (var i = 0; i < data.length; i++) {
                var ss = <Slider>{
                  is_main: false,
                  url: '',
                  _id: '',
                };
                ss.url = data[i].url[0];
                ss.is_main = data[i].is_main;
                ss._id = data[i]._id;
                console.log(ss);
                this.listImg.push(ss);
                // console.log( this.listImg);
              }
            },
            (error) => {
              console.log(error);
            }
          );
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
  selectFiles(event): void {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }
  Change(event, url) {
    console.log(event.target.id);
    this.is_main = event.target.id;
    if (url == 's') {
      this.uploadService.setMain(this.is_main, this.editId).subscribe(
        (event) => {
          location.reload();
        },
        (err) => {
          this.is_main = event.target.id;
        }
      );
    }
    console.log(this.is_main);
  }
  delete(id) {
    console.log(id);
    this.uploadService.deleteContent(id).subscribe(
      (event) => {
        location.reload();
      },
      (err) => {}
    );
  }
  uploadFiles(): void {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log(this.selectedFiles[i]);
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx, file): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      (event) => {
        console.log(event);
        if (event.statusCode === 200) {
          this.progressInfos[idx].percentage = 100;
          var ss = <Slider>{
            is_main: false,
            url: '',
            _id: '',
          };
          ss.url =
            'http://185.113.134.76:8080/my_uploaded_files/' +
            event.uploadedFile.filename;
          ss.is_main = false;
          console.log(
            'http://185.113.134.76:8080/my_uploaded_files/' +
              event.uploadedFile.filename
          );
          console.log(ss.url);
          this.listImg.push(ss);
          if (this.editMode) {
            this.editingList.push(
              'http://185.113.134.76:8080/my_uploaded_files/' +
                event.uploadedFile.filename
            );
          }
          if (this.editMode) {
            this.uploadedWhenEditing = true;
          }
        }
      },
      (err) => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      }
    );
  }
  saveAr(): void {
    var d = new Date();
    console.log(this.listImg.toString());
    const data = {
      url: this.listImg.toString(),
      active: this.model.active,
      article_id: this.model.article_id,
      //is_main:this.is_main
      create_date: d.getTime() + d.getTimezoneOffset() * 60000,
      name: this.model.name,
    };
    console.log(data);
    if (!this.editMode) {
      for (var i = 0; i < this.listImg.length; i++) {
        this.listSl.push(this.listImg[i].url);
      }
      this.uploadService.create(data).subscribe(
        (response) => {
          const content = {
            is_main: this.is_main,
            id: response._id,
            url: this.listSl.toString(),
            create_date: Date.now(),
          };
          this.uploadService.createContent(content).subscribe(
            (response) => {
              console.log(response);
              this.router.navigate(['/articleSlider_list']);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (this.uploadedWhenEditing) {
        for (var i = 0; i < this.editingList.length; i++) {
          this.listSl.push(this.editingList[i]);
        }
      }
      console.log(data);
      this.uploadService.update(this.editId, data).subscribe(
        (response) => {
          if (this.listSl.length > 0) {
            const content = {
              is_main: this.is_main,
              id: response._id,
              url: this.listSl.toString(),
              create_date: Date.now(),
            };
            this.uploadService.createContent(content).subscribe(
              (response) => {
                console.log(response);
                this.router.navigate(['/articleSlider_list']);
              },
              (error) => {
                console.log(error);
              }
            );
          }
          this.router.navigate(['/articleSlider_list']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  deleteImg(id) {}
}
