import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { Managers_sortService } from './manager_sort.service';

declare var jQuery: any;

export interface Manager{
	email:string,
	active:string,
	roles:string[],
	_id:string
}

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
	countries$: Observable<Manager[]>;
	total$: Observable<number>;
  
	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
	list: Manager[];
	currentManager = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;
	role:any;
	roles:any;
	constructor(private tokenStorage: TokenStorageService,public service: Managers_sortService,private managerService: ManagerService, private router: Router) { 
		this.countries$ = service.countries$;
    this.total$ = service.total$;
	}

	ngOnInit(): void {
		if (this.tokenStorage.getToken() == null) {
			this.router.navigate(['/login']);
		  }else{
		  this.roles = this.tokenStorage.getUser().roles;
		  if(this.roles.includes('ROLE_MANAGER')){
			this.router.navigate(['/sights']);
		   }
		}

		jQuery('.addManager').show();

		//this.checkAdmin();
		this.retrieveManagers();
		
	}
	public onSort({column, direction}: SortEvent) {
		// resetting other headers
		console.log("column");
		this.headers.forEach(header => {
		  if (header.sortable !== column) {
			header.direction = '';
		  }
		});
	
		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	  }
	checkAdmin(): void {
		
		this.managerService.checkSession()
			.subscribe(
				data => {

					if (data.status == 400) {
						
						this.loggedIn = false;
						//this.router.navigate(['login']);
						
					}
					if (data.status == 200) {
						this.loggedIn = true;
					}
					
				},
				error => {
					console.log(error);
				});
		
	}
	
 public retrieveManagers(): void {
		this.managerService.getRoles().subscribe(
			response => {
				console.log(response);
				this.role = response;
			},
			error => {
				console.log(error);
			});
		this.managerService.getAll()
			.subscribe(
				data => {
					this.list = data;
					console.log(this.list);
					for (let k = 0; k < this.list.length; k++) {
						
						for (let i = 0; i < this.list[k].roles.length; i++) {
							console.log(this.role.find(s=>s._id==this.list[k].roles[i]).name);
						    console.log(this.list[k].roles[i]);
							//this.list[k].active = this.list[k].active === "true"?"Активный":"Не активный";
							//this.list[k].roleId[i] = this.list[k].roles[i];
							this.list[k].roles[i] = this.role.find(s=>s._id==this.list[k].roles[i]).name;
							
						  }
						  
					}
					console.log(this.list);
				},
				error => {
					console.log(error);
				});
		
	}
	
	refreshList(): void {
		this.retrieveManagers();
	}
	
	searchManager(): void {
		
		this.managerService.findByEmail(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	confirmWindow(message, managerId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteManager(managerId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDeleteManager(managerId) {
		
		this.confirmWindow('Are you sure to delete this manager?', managerId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteManager(managerId): void {
		
		this.managerService.delete(managerId)
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
