import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
	
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
	
	favor_articles = [];
	favor_articles_format = [];
	
	editId: string;
	editMode: boolean;
	
	submitted = false;
	
	constructor(private userService: UserService, private articleService: ArticleService, private countryService: CountryService, private cityService: CityService, private route: ActivatedRoute) {

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
						this.favor_articles = response.favourite_articles;
						this.user.comments_count = 0;
						this.user.articles_count = this.favor_articles.length;
						this.user.sights_count = 0;
						
						for (var i = 0; i < this.favor_articles.length; i++) {
								
							console.log(this.favor_articles[i]);
							var this_art = this.articleService.get(this.favor_articles[i]).subscribe(
								response1 => {
									
									var this_favor = {
										
										id: response1.id,
										title: response1.main_header_en
										
									};
									
									this.favor_articles_format.push(this_favor);
									
								}
							);
							
						}

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
	
}
