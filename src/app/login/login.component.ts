import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup
  constructor(private  formBuilder : FormBuilder, private http:HttpClient,
    private toastrService: ToastrService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email   : [''],
      password: ['']
    })
  }

  login(){
this.http.post<any>("http://localhost:3000/api/auth/login",  this.loginForm.value)
.subscribe(res => {
  if (res.success) {
    localStorage.setItem('token', res.data.token);
    this.loginForm.reset();
    this.toastrService.success('Success!', 'Successfully Logged In');
    this.router.navigate(['user-profile']);
    } else {
      this.toastrService.error('Error!', res.message);
  }
}, err =>{
  this.toastrService.error('Error!', 'Something went wrong');
})
  }

}
