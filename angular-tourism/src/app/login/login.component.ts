import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	admin = {		
		email: '',
	};
	
  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  
  processLogin(): void {
	  
	this.loginService.process(this.admin)
		.subscribe(
			data => {

				if (data.status == 200) {
					this.router.navigate(['']);						
				}
					
			},
			error => {
				console.log(error);
			});
  }

}
