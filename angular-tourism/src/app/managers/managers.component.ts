import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

	list: any;
	currentManager = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;

	constructor(private managerService: ManagerService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addManager').show();

		this.checkAdmin();
		this.retrieveManagers();
		
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
	
	retrieveManagers(): void {
		
		this.managerService.getAll()
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
