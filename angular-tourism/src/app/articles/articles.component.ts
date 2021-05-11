import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { TagService } from 'src/app/services/tag.service';
import { CountryService } from 'src/app/services/country.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SightService } from '../services/sight.service';
import { CommentService } from '../services/comment.service';
import * as Excel from "exceljs";
import { DatePipe } from '@angular/common';

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
	list_sights: any;
	list_comments: any;

	constructor(private articleService: ArticleService,private commentService: CommentService,private sightService: SightService, private tagService: TagService, private countryService: CountryService, private router: Router) { }

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
		this.sightService.getAll()
			.subscribe(
				data => {
					this.list_sights = data;
					console.log(data);
					
				},
				error => {
					console.log(error);
				});
		this.commentService.getAll()
			.subscribe(
				data => {
					this.list_comments = data;
					
					console.log(this.list_comments);
				},
				error => {
					console.log(error);
				});
		
		this.articleService.getAll()
			.subscribe(
				data => {
					this.list = data;
					for (var i = 0; i < this.list.length; i++) {
						
						if(this.list[i].sight_id != undefined && this.list_sights.find(s=>s.id == this.list[i].sight_id) != undefined){
							this.list[i].sight_id = this.list_sights.find(s=>s.id == this.list[i].sight_id).name_en;
				
						}
						if(this.list_comments != undefined && this.list_comments.find(s=>s.content_id == this.list[i].id) != undefined){
							this.list[i].comments = this.list_comments.filter(s=>s.content_id == this.list[i].id).length;
							console.log(this.list[i]);
						}
					}
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
	public article_xl() {
		
		const workbook = new Excel.Workbook();
		const worksheet = workbook.addWorksheet("My Sheet");
	
		worksheet.columns = [
		  { header: "Id", key: "id" ,width: 10 },
		  { header: "НАЗВАНИЕ", key: "main_header_en" ,width: 30 },
		  { header: "ДОСТОПРЕМИЧАТЕЛЬНОСТЬ", key: "sight_id" ,width: 30 },
		  { header: "ДАТА", key: "create_date" ,width: 30 },
		  { header: "ПРОСМОТРЫ", key: "views_count" ,width: 10 },
		  { header: "РЕЙТИНГ", key: "rating" ,width: 10 },
		  { header: "КОМЕНТАРИИ", key: "comments" ,width: 10 },
		  { header: "ОЦЕНКИ", key: "likes_count" ,width: 10 },
		  { header: "СТАТУС", key: "is_active" ,width: 30 },

		];
		var j = 1;
		const datePipe = new DatePipe('en-EN');
	  // worksheet.getRow(1).height = 200;
	   for(var i = 0 ;i<this.list.length;i++){
	const myFormattedDate = datePipe.transform(this.list[i].create_date, 'dd-MM-yyyy H:mm:ss');
		worksheet.addRow(
			{	
				id:j,
				main_header_en:this.list[i].main_header_en,
	            sight_id:this.list[i].sight_id,
				create_date:myFormattedDate,
				views_count:this.list[i].views_count,
				rating:this.list[i].rating,
				comments:this.list[i].comments,
				likes_count:this.list[i].likes_count,
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
