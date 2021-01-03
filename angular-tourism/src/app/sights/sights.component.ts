import { Component, OnInit } from '@angular/core';
import { SightService } from 'src/app/services/sight.service';
import { TagService } from 'src/app/services/tag.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.css']
})
export class SightsComponent implements OnInit {
	
	list_countries: any;
	list_cities: any;
	list_tags: any;
	list: any;
	currentUser = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;

	constructor(private sightService: SightService, private tagService: TagService, private countryService: CountryService, private cityService: CityService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addView').show();
		this.retrieveSights();
		
		this.tagService.getAll()
			.subscribe(
				data => {
					this.list_tags = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
	
		this.countryService.getAll()
			.subscribe(
				data => {
					this.list_countries = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
	
	}
	
	retrieveSights(): void {
		
		this.sightService.getAll()
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	refreshList(): void {
		this.retrieveSights();
	}
	
	searchSight(): void {
		
		this.sightService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	confirmWindow(message, deleteId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteSight(deleteId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDeleteSight(deleteId) {
		
		this.confirmWindow('Are you sure to delete this sight?', deleteId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	askEdit(Id) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('#viewWindow').show();
		
		var Router = this.router;
		jQuery('a.editAbout').click(function() {
			window.location.href = '/sight_form/' + Id;
		});
		
	}
	
	deleteSight(deleteId): void {
		
		this.sightService.delete(deleteId)
			.subscribe(
				data => {
					this.list = data;
				},
				error => {
					console.log(error);
				});
				
		this.refreshList();
		
	}
	
	onChangeCountry(country): void {

		this.sightService.findByCountry(country)
			.subscribe(
				data => {
					this.list = data;
				},
				error => {
					console.log(error);
				});
				
		
		this.cityService.getAllByCountry(country).subscribe(
			data => {
				this.list_cities = data;
			}
		)
		
	}
	
	onChangeCity(city): void {

		this.sightService.findByCity(city)
			.subscribe(
				data => {
					this.list = data;
				},
				error => {
					console.log(error);
				});
		
	}
	
	onChangeTag(tag): void {

		this.sightService.findByTag(tag)
			.subscribe(
				data => {
					this.list = data;
				},
				error => {
					console.log(error);
				});
				
		this.refreshList();		
		
	}

}
