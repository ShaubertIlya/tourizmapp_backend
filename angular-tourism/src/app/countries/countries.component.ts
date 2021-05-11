import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

	list: any;
	query: '';

	constructor(private countryService: CountryService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.countriesList').hide();
		jQuery('.addCountry').show();
		this.retrieveList();
		
	}
	
	retrieveList(): void {
		
		this.countryService.getAll()
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
	
	searchCountry(): void {
		
		this.countryService.find(this.query)
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
		
		this.confirmWindow('Are you sure to delete this country?', recId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteRecord(recId): void {
		
		this.countryService.delete(recId)
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
