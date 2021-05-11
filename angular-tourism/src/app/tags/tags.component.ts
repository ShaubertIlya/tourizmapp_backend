import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

	list: any;
	query: '';

	constructor(private tagService: TagService, private router: Router) { }

	ngOnInit(): void {
		
		jQuery('.tagsList').hide();
		jQuery('.addTag').show();
		this.retrieveList();
		
	}
	
	retrieveList(): void {
		
		this.tagService.getAll()
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
		this.retrieveList();
	}
	
	searchTag(): void {
		
		this.tagService.find(this.query)
			.subscribe(
				data => {
					this.list = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
		
	}
	
	confirmWindow(message, recId, yesCallback, noCallback) {
		
		jQuery('div.fade').show();
		jQuery('div.fade').addClass('show');
		jQuery('p.confirm').text(message);
		jQuery('#confirmWindow').show();
		
		jQuery('a.confirm').click(function() {
			this.deleteRecord(recId);
			yesCallback();
		}.bind(this));
		jQuery('a.decline').click(function() {
			noCallback();
		});
		
	}
	
	askDelete(recId) {
		
		this.confirmWindow('Are you sure to delete this tag?', recId, function() {
			jQuery('div.fade').click();
		}, function() {
			jQuery('div.fade').click();
		});

	}
	
	deleteRecord(recId): void {
		
		this.tagService.delete(recId)
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
