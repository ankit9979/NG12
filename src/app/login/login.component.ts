import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup
  constructor(private  formBuilder : FormBuilder, private http:HttpClient,
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email :[''],
      password : ['']
    })
  }

  login(){
this.http.post<any>("http://localhost:3000/api/auth/login",  this.loginForm.value)
.subscribe(res => {
  if(res.success){
    console.log(res);
    alert("Logged In Success")
    this.loginForm.reset();
  //  this.router.navigate(['posts']);
    } else {
    alert(res.message)
  }

}, err =>{
  alert("Somethign went wrong")
})
  }

}
