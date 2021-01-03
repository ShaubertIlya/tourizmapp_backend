import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

	list_countries: any;
	list: any;
	query: '';

	constructor(private cityService: CityService, private countryService: CountryService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addCity').show();
		this.retrieveList();
		
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
	
	retrieveList(): void {
		
		this.cityService.getAll()
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
		this.retrieveList();
	}
	
	filterByCountry(countryId): void {
		
		this.cityService.getAllByCountry(countryId).subscribe(
				response => {
					this.list = response;
				},
				error => {
					console.log(error);
				});
		
	}
	
	searchCity(): void {
		
		this.cityService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	confirmWindow(message, recId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteRecord(recId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDelete(recId) {
		
		this.confirmWindow('Are you sure to delete this city?', recId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteRecord(recId): void {
		
		this.cityService.delete(recId)
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
