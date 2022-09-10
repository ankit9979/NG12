import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
})

export class UserProfileComponent implements OnInit {
    currentUser: any = {};
  
    constructor(
        public authService: AuthService,
        private router : Router,
        private http : HttpClient,
    ) {
        this.authService.getUserProfile().subscribe((res) => {
        this.currentUser = res.data;
        });
    }

    
  update(){
    this.router.navigate(['edit-profile']);
  }

    ngOnInit() {}
}