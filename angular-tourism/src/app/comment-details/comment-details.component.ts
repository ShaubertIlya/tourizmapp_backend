import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CommentService } from '../services/comment.service';
import { DiscountService } from '../services/discount.service';
import { SightService } from '../services/sight.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {

	list_countries: any;
	list_cities: any;
	
	comment = {
	  text:'',
	  answer:'',
    comment:'',
    content_id:'',
    active:true,
    rating:0,
    createDate:'',
    gender:'',
    userToken:''
	};
	
	favor_articles = [];
	favor_articles_format = [];
	
	editId: string;
	editMode: boolean;
	
	submitted = false;
	discount: any;
	list: any;
	sight: any;
	article: any;
	user: any;
	
	constructor(private commentService: CommentService, private route: ActivatedRoute
		,private userService:UserService, private sightService: SightService
		, private articleService: ArticleService, private discountService: DiscountService) {

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
			
			this.commentService.get(this.editId)
				.subscribe(
					response => {
			this.userService.get(response.userToken)
			  .subscribe(
				  response => {
					this.comment.userToken = response.id;
				  });
				  console.log(response);
              this.comment.text = response.text;
			   this.comment.createDate = response.createDate; 
              this.comment.active = response.status;
              this.comment.gender = response.gender;
			  this.comment.content_id = response.content_name;

              this.comment.rating = response.rating;
				});
			
		this.userService.getAll()
				.subscribe(
					data => {
						this.user = data;
		   
						console.log(this.user);
					},
					error => {
						console.log(error);
					});
	
	
				
		
		
	
	console.log(this.comment);
		
}
		
	}
	

	

}
