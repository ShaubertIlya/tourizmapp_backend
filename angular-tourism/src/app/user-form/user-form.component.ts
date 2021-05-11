import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
	
	list_countries: any;
	list_cities: any;
	
	user = {
		
		email: '',
		password: '',
		password1: '',
		full_name: '',
		active: 'true',
		join_date: '',
		country_id: '',
		city_id: '',
		avatar_url: '',
		gender: 'male',
		points: 0,
		rang: 'new',
		comments_count: 0,
		articles_count: 0,
		sights_count: 0,
		
	};
	
	editId: string;
	editMode: boolean;
	
	submitted = false;
	
	constructor(private userService: UserService, private countryService: CountryService, private cityService: CityService, private route: ActivatedRoute) {

	}

	ngOnInit(): void {

		this.editId = null;
		this.route.params.subscribe(params => {
			if (params['id']) {
						
				this.editId = params['id'];
				this.editMode = true;
				
			}
		});
		
		if (this.editMode) {
			
			this.userService.get(this.editId)
				.subscribe(
					response => {
						
						this.user = response;
						this.onChangeCountry(this.user.country_id);
						this.user.city_id = response.city_id;						
						
					},
					error => {
						console.log(error);
					});
		
		}
		
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
	
	onChangeCountry(countryId) {
		
		this.cityService.getAllByCountry(countryId).subscribe(
			data => {
				this.list_cities = data;
			}
		)
		
	}
	
	saveUser(): void {
		var d = new Date();
		const data = {

			email: this.user.email,
			password: this.user.password,
			password1: this.user.password1,
			full_name: this.user.full_name,
			active: this.user.active,
			join_date: this.user.join_date,
			country_id: this.user.country_id,
			city_id: this.user.city_id,
			avatar_url: this.user.avatar_url,
			gender: this.user.gender,
			points: this.user.points,
			rang: this.user.rang,
			comments_count: 0,
			articles_count: 0,
			sights_count: 0,
			create_date:d.getTime()+d.getTimezoneOffset() * 60000
			
		};
		
		if (!this.editMode) {
		
			this.userService.create(data)
				.subscribe(
					response => {
						console.log(response);
						if(response.status == 500){
							this.submitted = false;
							alert(response.message);
						}else{
						this.submitted = true;
						}
					},
					error => {
						console.log(error);
						this.submitted = false;
						alert(error.message);
					});
				
		}
		else {

			this.userService.update(this.editId, data)
				.subscribe(
					response => {
						console.log(response);
						this.submitted = true;
					},
					error => {
						console.log(error);
						this.submitted = false;
					});			
			
		}
		
	}
	
	newUser(): void {
		
		this.submitted = false;
		this.user = {

			email: '',
			password: '',
			password1: '',
			full_name: '',
			active: 'true',
			join_date: '',
			country_id: '',
			city_id: '',
			avatar_url: '',
			gender: 'male',
			points: 0,
			rang: 'new',
			comments_count: 0,
			articles_count: 0,
			sights_count: 0,
			
			
		};
		
	}

}
