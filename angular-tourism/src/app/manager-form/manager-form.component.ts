import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html',
  styleUrls: ['./manager-form.component.css']
})
export class ManagerFormComponent implements OnInit {
	
	manager = {
		
		email: '',
		password: '',
		password1: '',
		active: 'true',
		roles:"",
		
	};
	role:any;
	roleId:any;
	editId: string;
	editMode: boolean;
	
	submitted = false;
	
	constructor(private managerService: ManagerService, private route: ActivatedRoute) {
	
	}

	ngOnInit(): void {
		this.managerService.getRoles().subscribe(
			response => {
				
				this.role = response;
				console.log(this.role);
			},
			error => {
				console.log(error);
			});
		this.editId = null;
		this.route.params.subscribe(params => {
			if (params['id']) {
						
				this.editId = params['id'];
				this.editMode = true;
				
			}
			if (params['role']) {
						
				this.roleId = params['role'];
				
				
			}
		});
		
		if (this.editMode) {
			console.log("editmode");
			this.managerService.get(this.editId)
				.subscribe(
					response => {
						console.log(response);
						this.manager = response;
						// if(this.role.find(s=>s.name==this.roleId) != null 
						// || this.role.find(s=>s.name==this.roleId) != undefined){
						// 	this.manager.roles = this.role.find(s=>s.name==this.roleId)._id;
						// }
						
						this.manager.roles = response.roles;
						
						console.log(this.manager.roles);
					},
					error => {
						console.log(error);
					});
		
		}
		
	}
	
	saveManager(): void {
		console.log(this.manager.roles);
var d = new Date();
		const data = {
			email: this.manager.email,
			password: this.manager.password,
			password1: this.manager.password1,
			active: this.manager.active,
			roles:this.manager.roles,
			create_date:d.getTime()+d.getTimezoneOffset() * 60000
		};
		console.log(data);
		if (!this.editMode) {
		console.log(data);
			this.managerService.create(data)
				.subscribe(
					response => {
						console.log(response);
						this.submitted = true;
					},
					error => {
						console.log(error);
					});
				
		}
		else {

			this.managerService.update(this.editId, data)
				.subscribe(
					response => {
						console.log(response);
						this.submitted = true;
					},
					error => {
						console.log(error);
					});			
			
		}
		
	}
	
	newManager(): void {
		
		this.submitted = false;
		this.manager = {

			email: '',
			password: '',
			password1: '',
			active: 'true',
			roles:''
		};
		
	}

}
