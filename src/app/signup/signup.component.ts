import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private toastrService: ToastrService,
    private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        firstname: [''],
        lastname : [''],
        email    : [''],
        password : [''],
        password2: ['']
      }
    )

  }

  signup() {
    this.http.post<any>('http://localhost:3000/api/auth/register', this.signupForm.value)
    .subscribe((res) => {
        this.toastrService.success('Success!', "Signed Up");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      (err) => {
        if (err.error.message) this.toastrService.error('Error!', err.error.message);
        if (err.error.errors) this.toastrService.error('Error!', err.error.errors[0].msg);
      })
    }

  }
