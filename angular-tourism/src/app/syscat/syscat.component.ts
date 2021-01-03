import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-syscat',
  templateUrl: './syscat.component.html',
  styleUrls: ['./syscat.component.css']
})
export class SyscatComponent implements OnInit {
	
	pages = [
	
		{"url": "/syscat/tags", "name": "Tags"},
		{"url": "/syscat/countries", "name": "Countries"},
		{"url": "/syscat/cities", "name": "Cities"},
		{"url": "/syscat/companies", "name": "Companies"}
	
	];
	
  constructor() { }

  ngOnInit(): void {
  }

}
