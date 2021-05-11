import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  list_countries: any;
	list_cities: any;
	

	comment = {
	  text:'',
	  answer:'',
    comment:'',
    object:'',
    status:true,
    rating:0,
    createDate:'',
    gender:'',
    userToken:''
	};
	
	editId: string;
	editMode: boolean;
	
	submitted = false;
	
	constructor(private commentService: CommentService
		,private userService:UserService, private route: ActivatedRoute) {

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
						this.comment = response;
											
						
					},
					error => {
						console.log(error);
					});
		
		}
		
	
		
	}
	

	
	savecomment(): void {
		var d= new Date();
		const data = {

    //   text:this.comment.text,
      
    //   content_id:this.comment.object,
      status:this.comment.status,
	  answer:this.comment.answer,
      create_date:d.getTime()+d.getTimezoneOffset() * 60000
    //   rating:this.comment.rating,
    //   createDate:this.comment.date,
    //   gender:this.comment.gender,
    //   userToken:this.comment.userToken
			
		};
		
		if (!this.editMode) {
		
			this.commentService.create(data)
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

			this.commentService.update(this.editId, data)
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
	
	newcomment(): void {
		
		this.submitted = false;
		this.comment = {
      text:'',
	  answer:'',
      comment:'',
      object:'',
      status:true,
      rating:0,
      createDate:'',
      gender:'',
      userToken:''
    };
	}

}
