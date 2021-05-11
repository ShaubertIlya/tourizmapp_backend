import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleSliderService } from '../services/article-slider.service';
import { ArticleService } from '../services/article.service';
import { UploadFilesService } from '../services/upload-files.service';
declare var jQuery: any;

@Component({
  selector: 'app-articles-slider-list',
  templateUrl: './articles-slider-list.component.html',
  styleUrls: ['./articles-slider-list.component.css']
})
export class ArticlesSliderListComponent implements OnInit {

 
  total:any;
	page:any;
	pageSize:any;
	list_sights: any;
	list: any;
	rec_to_name: any;
	query = '';
	loggedIn = false;

	constructor(private arService: ArticleSliderService, private sightService: ArticleService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addAr').show();
		
		this.retrieveAr();

	
	
	
	}
	
	retrieveAr(): void {
		this.sightService.getAll()
		.subscribe(
			data => {
				this.list_sights = data;
				console.log(data);
				this.total = this.list_sights.length;
				this.page = 1;
				this.pageSize = 4;
			},
			error => {
				console.log(error);
			});
		this.arService.getAll()
			.subscribe(
				data => {
					//this.list = data;
					console.log(data);
					//var rec_to_name = this.rec_to_name;
          for (var i = 0; i < data.length; i++) {
						if(this.list_sights.find(s=>s.slider_id == data[i]._id) != undefined){
							data[i].article_id = this.list_sights.find(s=>s.slider_id == data[i]._id).main_header_en;
							
						}
					}
					this.list = data;
				},
				error => {
					console.log(error);
				});
		
	}
	
	refreshList(): void {
		this.retrieveAr();
	}
	
	searchAr(): void {
		
		this.arService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	confirmWindow(message, objectId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteObject(objectId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDelete(objectId) {
		
		this.confirmWindow('Are you sure to delete this AR?', objectId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteObject(objectId): void {
		
		this.arService.delete(objectId)
			.subscribe(
				data => {
					this.list = data;
				},
				error => {
					console.log(error);
				});
				
		this.refreshList();
		
	}
	
	onChangeSight(sightId): void {

		this.arService.getAllBySight(sightId)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
}
