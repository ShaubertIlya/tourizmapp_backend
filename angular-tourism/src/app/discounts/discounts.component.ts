import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount.service';
import { TagService } from 'src/app/services/tag.service';
import { CountryService } from 'src/app/services/country.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '../services/city.service';
import { SightService } from '../services/sight.service';
import { DatePipe } from '@angular/common';
import * as Excel from "exceljs";

declare var jQuery: any;

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
	
	list_countries: any;
	list_tags: any;
	list: any;
	currentUser = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;
	cityList: any;
	list_sights: any;

	constructor(private discountService: DiscountService,private sightService: SightService,public cityService:CityService, private tagService: TagService, private countryService: CountryService, private router: Router) { }

	ngOnInit(): void {
		this.tagService.getAll()
		.subscribe(
			data => {
				this.list_tags = data;
				console.log(data);
			},
			error => {
				console.log(error);
			});
			this.sightService.getAll()
			.subscribe(
				data => {
					this.list_sights = data;
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
			this.cityService.getAll()
			.subscribe(
				data => {
				this.cityList = data;
				console.log(data);
			},
			error => {
				console.log(error);
			});
		jQuery('.addDiscount').show();
		this.retrieveDiscounts();
		
	
	
	}
	
	retrieveDiscounts(): void {
		
		this.discountService.getAll()
			.subscribe(
				data => {
					this.list = data;
					for(var i = 0;i < this.list.length;i++){
					if(this.list[i].country_id != null && this.list[i].country_id != undefined && this.list[i].country_id != ''){
						this.list[i].country_id = this.list_countries.find(s=>s.id == this.list[i].country_id).name_en;

					}
					if(this.list[i].city_id != null
						&& this.list[i].city_id != undefined && this.list[i].city_id != ''
						){

					this.list[i].city_id = this.cityList.find(s=>s.id == this.list[i].city_id).name_en;
					}
					if(this.list[i].sight_id != undefined && this.list_sights.find(s=>s.id == this.list[i].sight_id) != undefined){
						this.list[i].sight_id = this.list_sights.find(s=>s.id == this.list[i].sight_id).name_en;
						
					}
					console.log(data);
				}
				},
				error => {
					console.log(error);
				});
		
	}
	
	refreshList(): void {
		this.retrieveDiscounts();
	}
	
	searchDiscount(): void {
		
		this.discountService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	public discount_xl() {
		
		const workbook = new Excel.Workbook();
		const worksheet = workbook.addWorksheet("My Sheet");
	
		worksheet.columns = [
		  { header: "Id", key: "id" ,width: 10 },
		  { header: "НАЗВАНИЕ", key: "main_header_en" ,width: 30 },
		  { header: "НАЧАЛО", key: "available_date" ,width: 30 },
		  { header: "КОНЕЦ", key: "available_date_end" ,width: 30 },
		  { header: "СТРАНА", key: "country_id" ,width: 10 },
		  { header: "ГОРОД", key: "city_id" ,width: 10 },
		  { header: "ДОСТОПРЕМИЧАТЕЛЬНОСТЬ", key: "sight_id" ,width: 10 },
		  { header: "СТАТУС", key: "is_active" ,width: 30 },

		];
	
		var j = 1;
		const datePipe = new DatePipe('en-EN');
	  // worksheet.getRow(1).height = 200;
	   for(var i = 0 ;i<this.list.length;i++){
		const available_date = datePipe.transform(this.list[i].available_date, 'dd-MM-yyyy H:mm:ss');
	const available_date_end = datePipe.transform(this.list[i].available_date_end, 'dd-MM-yyyy H:mm:ss');
		worksheet.addRow(
			{	
				id:j,
				main_header_en:this.list[i].main_header_en,
	            available_date:available_date,
				available_date_end:available_date_end,
				country_id:this.list[i].country_id,
				city_id:this.list[i].city_id,
				sight_id:this.list[i].sight_id,
				is_active:this.list[i].is_active == true ? "active" : "not active",
			}
		);
		console.log(j);
		j++;
		
	   }
   
	  
	
		workbook.xlsx.writeBuffer().then((data: any) => {
		  console.log("buffer");
		  const blob = new Blob([data], {
			type:
			  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		  });
		  let url = window.URL.createObjectURL(blob);
		  let a = document.createElement("a");
		  document.body.appendChild(a);
		  a.setAttribute("style", "display: none");
		  a.href = url;
		  a.download = "export.xlsx";
		  a.click();
		  window.URL.revokeObjectURL(url);
		  a.remove();
		});
	}
	confirmWindow(message, discountId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteDiscount(discountId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDeleteDiscount(discountId) {
		
		this.confirmWindow('Are you sure to delete this discount?', discountId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteDiscount(discountId): void {
		
		this.discountService.delete(discountId)
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

		this.discountService.findByCountry(country)
			.subscribe(
				data => {
					this.list = data;
				},
				error => {
					console.log(error);
				});
		
	}
	
	onChangeTag(tag): void {

		this.discountService.findByTag(tag)
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
