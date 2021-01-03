import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	list: any;
	currentUser = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;

	constructor(private userService: UserService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addUser').show();
		this.retrieveUsers();
		
	}
	
	retrieveUsers(): void {
		
		this.userService.getAll()
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
