import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { TagService } from 'src/app/services/tag.service';
import { CountryService } from 'src/app/services/country.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
	
	list_countries: any;
	list_tags: any;
	list: any;
	currentUser = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;

	constructor(private articleService: ArticleService, private tagService: TagService, private countryService: CountryService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.addArticle').show();
		this.retrieveArticles();
		
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
	
	}
	
	retrieveArticles(): void {
		
		this.articleService.getAll()
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
		this.retrieveArticles();
	}
	
	searchArticle(): void {
		
		this.articleService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	confirmWindow(message, articleId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteArticle(articleId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDeleteArticle(articleId) {
		
		this.confirmWindow('Are you sure to delete this article?', articleId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteArticle(articleId): void {
		
		this.articleService.delete(articleId)
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

		this.articleService.findByCountry(country)
			.subscribe(
				data => {
					this.list = data;
				},
				error => {
					console.log(error);
				});
		
	}
	
	onChangeTag(tag): void {

		this.articleService.findByTag(tag)
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
