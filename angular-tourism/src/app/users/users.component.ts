import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { CityService } from '../services/city.service';
import * as Excel from "exceljs";

declare var jQuery: any;
export interface User{
	email:string,
	full_name:string,
	active:boolean,
	points:string,
	rang:string,
	gender:string,
	id:string,
	country_id:string,
	city_id:string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	countries$: Observable<User[]>;
	total$: Observable<number>;
  
	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
	list: User[];
	countryList:any;
	cityList:any;

	currentUser = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;

	constructor(private userService: UserService,
		public countryService:CountryService, public cityService:CityService,
		private router: Router) 
	{
	
	 }

	ngOnInit(): void {
		
		jQuery('.addUser').show();
		this.retrieveUsers();
		
	}
	
	retrieveUsers(): void {
		this.countryService.getAll()
		.subscribe(
			data => {
			this.countryList = data;
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
	
		this.userService.getAll()
			.subscribe(
				data => {
					this.list = data;
					console.log(this.list);
					for(var i = 0;i < this.list.length;i++){
						if(this.list[i].country_id != null && this.list[i].country_id != undefined && this.list[i].country_id != ''){
							this.list[i].country_id = this.countryList.find(s=>s.id == this.list[i].country_id).name_en;

						}
						
						if(this.list[i].city_id != null
							&& this.list[i].city_id != undefined && this.list[i].city_id != ''
							){

						this.list[i].city_id = this.cityList.find(s=>s.id == this.list[i].city_id).name_en;
						}
					}
					
					console.log(this.list);
				},
				error => {
					console.log(error);
				});
		
	}
	// public onSort({column, direction}: SortEvent) {
	// 	// resetting other headers
	// 	console.log("column");
	// 	this.headers.forEach(header => {
	// 	  if (header.sortable !== column) {
	// 		header.direction = '';
	// 	  }
	// 	});
	
	// 	this.service.sortColumn = column;
	// 	this.service.sortDirection = direction;
	//   }
	refreshList(): void {
		this.retrieveUsers();
	}
	
	searchUser(): void {
		
		this.userService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
			
	}
	public user_xl() {
		
		const workbook = new Excel.Workbook();
		const worksheet = workbook.addWorksheet("My Sheet");
	
		worksheet.columns = [
		  { header: "Id", key: "id" ,width: 10 },
		  { header: "Email", key: "email" ,width: 30 },
		  { header: "Full name", key: "full_name" ,width: 30 },
		  { header: "Status", key: "active" ,width: 10 },
		  { header: "Points", key: "points" ,width: 10 },
		  { header: "Rang", key: "rang" ,width: 10 },
		  { header: "Gender", key: "gender" ,width: 10 },
		  { header: "Country", key: "country_id" ,width: 30 },
		  { header: "City", key: "city_id" ,width: 30 },

		];
		var j = 1;
	  // worksheet.getRow(1).height = 200;
	   for(var i = 0 ;i<this.list.length;i++){
		worksheet.addRow(
			{
				id:j,
				email:this.list[i].email,
	            full_name:this.list[i].full_name,
				active:this.list[i].active == true ? "active" : "not active",
				points:this.list[i].points,
				rang:this.list[i].rang,
				gender:this.list[i].gender,
				country_id:this.list[i].country_id,
				city_id:this.list[i].city_id
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
	
	confirmWindow(message, userId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteUser(userId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDeleteUser(userId) {
		
		this.confirmWindow('Are you sure to delete this user?', userId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteUser(userId): void {
		
		this.userService.delete(userId)
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
