import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SightService } from '../services/sight.service';
import { UploadFilesService } from '../services/upload-files.service';
export interface Slider{
  url:string,
  is_main:boolean,
  _id:string
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  model = {
    _id:"",
    sight_id:'',
    active:'',
    list : [] = [''],
    is_main:false,
    name:''
  }
  is_main:'';
  fileInfos: Observable<any>;
  listImg: Slider[] = [];
  editingList: String[] = [];
  editMode: any;
  list_sights: any;
  editId: any;
  deleted:any;
  listSl:String[] = [];
  uploadedWhenEditing = false;
  constructor(private uploadService: UploadFilesService, private sightService: SightService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.editId = null;
    this.editMode = false;
		this.route.params.subscribe(params => {
			if (params['id']) {
						
				this.editId = params['id'];
				this.editMode = true;
				
			}
		});
     
     
      if(this.editMode){
        console.log();
     
        this.uploadService.get(this.editId).subscribe(
          data => {
            this.model = data;
            // this.model.list = data.url.split(",");
             console.log(data);
            // this.listImg = data.url.split(",");
            // this.fileInfos =data;
            this.uploadService.getContent(this.model._id).subscribe(
              data => {
                console.log(data);
              
                for(var i = 0;i<data.length;i++){
                  var ss = <Slider>{
                    is_main:false,
                    url:'',
                    _id:''
                  }
                  ss.url = data[i].url[0];
                  ss.is_main = data[i].is_main;
                  ss._id = data[i]._id;
                  console.log(ss);
                   this.listImg.push(ss);
                  // console.log( this.listImg);
                }
              }, error => {
                console.log(error);
              });
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
  uploadFiles(): void {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log( this.selectedFiles[i]);
      this.upload(i, this.selectedFiles[i]);
    }
  }
  Change(event,url) {
    console.log(event.target.id)
    this.is_main = event.target.id;
    if(url == 's'){
    this.uploadService.setMain(this.is_main,this.editId).subscribe(
      event => {
        location.reload();
    
    },
    err => {
      this.is_main = event.target.id;
    });
  }
  console.log(this.is_main);
  }
  delete(id){
console.log(id);
this.uploadService.deleteContent(id).subscribe(
  event => {
    location.reload();

},
err => {

});
  }
  upload(idx, file): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file).subscribe(
      event => {
        console.log(event);
        if (event.statusCode === 200) {
          this.progressInfos[idx].percentage = 100;
          var ss = <Slider>{
            is_main:false,
            url:'',
            _id:''
          }
          ss.url = "http://185.113.134.76:8080/my_uploaded_files/"+event.uploadedFile.filename;
          ss.is_main = false;
          console.log("http://185.113.134.76:8080/my_uploaded_files/"+event.uploadedFile.filename);
          console.log(ss.url);
           this.listImg.push(ss);
           if (this.editMode) {
           this.editingList.push("http://185.113.134.76:8080/my_uploaded_files/"+event.uploadedFile.filename);
           }
           if (this.editMode) {  this.uploadedWhenEditing = true;}
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }
  saveAr(): void {
    console.log(this.listImg.toString());
		const data = {
			url: this.listImg.toString(),
			active: this.model.active,
      sight_id: this.model.sight_id,
      //is_main:this.is_main
          name:this.model.name
		};

		console.log(data);
		if (!this.editMode) {
		for(var i =0;i<this.listImg.length;i++){
      this.listSl.push(this.listImg[i].url);
    }
			this.uploadService.create(data).subscribe(
				response => {
         const content = {
          is_main:this.is_main,
          id: response._id,
          url: this.listSl.toString(),
          create_date:Date.now()
          }
          this.uploadService.createContent(content).subscribe(
            response => {
              console.log(response);
              this.router.navigate(['/slider_list']);
            },
            error => {
              console.log(error);
            });
				},
				error => {
					console.log(error);
				});
				
		}
		else {
      if(this.uploadedWhenEditing){
      for(var i =0;i<this.editingList.length;i++){
        this.listSl.push(this.editingList[i]);
      }
    }
console.log(data);
			this.uploadService.update(this.editId, data).subscribe(
				response => {
          console.log()
          if(this.listSl.length>0){
          const content = {
            is_main:this.is_main,
            id: response._id,
            url: this.listSl.toString(),
            create_date:Date.now()
            }
            console.log(content)
            this.uploadService.createContent(content).subscribe(
              response => {
                console.log(response);
                this.router.navigate(['/slider_list']);
              },
              error => {
                console.log(error);
              });
            }
					this.router.navigate(['/slider_list']);
				},
				error => {
					console.log(error);
				});			
			
		}
    
	}
  deleteImg(id){

  }

  
}
