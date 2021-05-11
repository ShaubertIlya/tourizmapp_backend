import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SightService } from 'src/app/services/sight.service';
import { TagService } from 'src/app/services/tag.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentService } from '../services/comment.service';
import * as Excel from "exceljs";

declare var jQuery: any;
export interface Sight{
	id:string,
	name_en:string,
	name_ru:string,
	name_es:string,
	name_zh:string,
	is_active:boolean,
	country_id:string,
	rating:string,
	ratecount:string,
	city_id:string
}
@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.css']
})
export class SightsComponent implements OnInit {
	total:any;
	page:any;
	pageSize:any;
	list_countries: any;
	list_cities: any;
	list_tags: any;
	list: Sight[];
	comment:any;
	currentUser = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;
	cityList: any;

	constructor(private commentService: CommentService,private sightService: SightService, private tagService: TagService, private countryService: CountryService, private cityService: CityService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addView').show();
		this.commentService.getAll()
		.subscribe(
			data => {
				this.comment = data;
				
				console.log(this.comment);
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
		this.retrieveSights();
	
		
	
	}
	
	retrieveSights(): void {
		
		this.sightService.getAll()
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
					for(var i = 0; i<this.list.length;i++){
						console.log(this.comment.filter(s=>s.content_id == this.list[i].id));
						this.list[i].ratecount = this.comment.filter(s=>s.content_id == this.list[i].id).length;
						if(this.list[i].country_id != null && this.list[i].country_id != undefined && this.list[i].country_id != ''){
							this.list[i].country_id = this.list_countries.find(s=>s.id == this.list[i].country_id).name_en;

						}
						
						if(this.list[i].city_id != null
							&& this.list[i].city_id != undefined && this.list[i].city_id != ''
							){

						this.list[i].city_id = this.cityList.find(s=>s.id == this.list[i].city_id).name_en;
						}
					}
					this.total = this.list.length;
					this.page = 1;
					this.pageSize = 4;
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
	public sight_xl() {
		
		const workbook = new Excel.Workbook();
		const worksheet = workbook.addWorksheet("My Sheet");
	
		worksheet.columns = [
		  { header: "Id", key: "id" ,width: 10 },
		  { header: "Name en", key: "name_en" ,width: 30 },
		  { header: "Name ru", key: "name_ru" ,width: 30 },
		  { header: "Name es", key: "name_es" ,width: 30 },
		  { header: "Name deu", key: "name_zh" ,width: 30 },
		  { header: "Status", key: "is_active" ,width: 10 },
		  { header: "Country", key: "country_id" ,width: 30 },
		  { header: "City", key: "city_id" ,width: 30 },

		  { header: "Rate count", key: "ratecount" ,width: 10 },
		  { header: "Rate", key: "rating" ,width: 10 },
		];
		var j = 1;
	  // worksheet.getRow(1).height = 200;
	   for(var i = 0 ;i<this.list.length;i++){
		worksheet.addRow(
			{
				id:j,
				name_en:this.list[i].name_en,
	            name_ru:this.list[i].name_ru,
				name_es:this.list[i].name_es,
				name_zh:this.list[i].name_zh,
				is_active:this.list[i].is_active == true ? "active":"not active",
				country_id:this.list[i].country_id,
				city_id:this.list[i].city_id,
				ratecount:this.list[i].ratecount,
				rating:this.list[i].rating


			}
			
		);
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
