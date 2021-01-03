import { Component, OnInit } from '@angular/core';
import { ArService } from 'src/app/services/ar.service';
import { SightService } from 'src/app/services/sight.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-ar',
  templateUrl: './ar.component.html',
  styleUrls: ['./ar.component.css']
})
export class ArComponent implements OnInit {
	
	list_sights: any;
	list: any;
	rec_to_name: any;
	query = '';
	loggedIn = false;

	constructor(private arService: ArService, private sightService: SightService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addAr').show();
		this.retrieveAr();

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
	
	retrieveAr(): void {
		
		this.arService.getAll()
			.subscribe(
				data => {
					this.list = data;
					//var rec_to_name = this.rec_to_name;
					for (var i = 0; i < data.length; i++) {
						
						this.sightService.get(data[i].sight_id).subscribe(
							data1 => {
								this.rec_to_name = data1.name_en;
							});
						
					}
					console.log(this.rec_to_name);
					//this.list = data;
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
				},
				error => {
					console.log(error);
				});
		
	}

}
