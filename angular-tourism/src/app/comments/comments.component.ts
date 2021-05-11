import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CommentService } from '../services/comment.service';
import { DiscountService } from '../services/discount.service';
import { SightService } from '../services/sight.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
declare var jQuery: any;
export interface IComment{
	text: string,
    content_id: string,
    rating: string,
    status:boolean,
    answer:string,
    userToken:string
}
export interface ISight{
	id:'',
image_url: '',
		country_id: '',
		city_id: '',
		name_en: '',
		name_ru: '',
		name_kz: '',
		name_es: '',
		name_zh: '',
		rating: 0,
		likes_count: 0,
		tags: {},
		related_sights: '',
		description_en: '',
		description_ru: '',
		description_kz: '',
		description_es: '',
		description_zh: '',
		sdescription_en: '',
		sdescription_ru: '',
		sdescription_kz: '',
		sdescription_es: '',
		sdescription_zh: '',
		gallery_images: '',
		longitude: '',
		latitude: '',
		is_active: true,
	}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

 
	list:[IComment];
	sight:[ISight];
	user:any;
	article:any;
	discount:any;
  contentId='';
	currentcomment = null;
	currentIndex = -1;
	query = '';
	loggedIn = false;
  fill = false;
	constructor(private commentService: CommentService, private sightService: SightService
    , private articleService: ArticleService, private discountService: DiscountService, private userService: UserService
     ,private router: Router,private tokenStorage: TokenStorageService) { }

	ngOnInit(): void {
		if (this.tokenStorage.getToken() == null) {
			this.router.navigate(['/login']);
		  }
		jQuery('.addcomment').show();
		this.retrievecomments();
		
	}
	
	retrievecomments(): void {
		var t= 0;
		this.userService.getAll()
		.subscribe(
			data => {
				this.user = data;
   
				console.log(this.user);
			},
			error => {
				console.log(error);
			});
		this.commentService.getAll()
			.subscribe(
				data => {
					this.list = data;
					for(var i = 0; i<this.list.length;i++){
					
					if(this.user.find(s=>s.id == this.list[i].userToken) != undefined)
					{console.log(this.list[i].userToken);
						this.list[i].userToken = this.user.find(s=>s.id == this.list[i].userToken).id;
					console.log(this.list[i].userToken);}
						
					//	this.list.find(s=>s.).content_id
					}
					console.log(this.list);
				},
				error => {
					console.log(error);
				});
		
	}
	
	refreshList(): void {
		this.retrievecomments();
	}
	
	searchcomment(): void {
		
		this.commentService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	confirmWindow(message, commentId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deletecomment(commentId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDeletecomment(commentId) {
		
		this.confirmWindow('Are you sure to delete this comment?', commentId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deletecomment(commentId): void {
		
		this.commentService.delete(commentId)
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
