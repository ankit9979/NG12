import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html'
})
export class UserProfileEditComponent implements OnInit {
  baseURL = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  public profileForm !: FormGroup;
  currentUser: any = {};
  preview = ''
  submitted = false;

  constructor(private formBuilder : FormBuilder,
    public authService: AuthService,
    private http : HttpClient,
    private router : Router,
    private toastrService: ToastrService
  ) {
      this.authService.getUserProfile().subscribe((res) => {

        this.profileForm.setValue({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          upload:'',
          profilePicture:''
        });
      });
  }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group(
      {
        firstname     : [''],
        lastname      : [''],
        upload        : [''],
        profilePicture: [null]
      })
  }


  // Getter to access form control
  get myForm() {
    return this.profileForm.controls;
  }
  onFileSelected(event:any){
    const file = (event.target).files[0];
    this.profileForm.patchValue({
      profilePicture: file,
    });
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  save() {

    var formData: any = new FormData();
        formData.append('firstname', this.profileForm.value.firstname);
        formData.append('lastname', this.profileForm.value.lastname);
        formData.append('profilePicture', this.profileForm.value.profilePicture);
        this.http.post<any>(this.baseURL+'/users/update', formData)
        .subscribe((res) => {
        this.toastrService.success('Success!', 'Profile Updated');
            this.profileForm.reset();
            this.router.navigate(['user-profile']);
          },
          (err) => {
            if (err.error)   this.toastrService.error('Message Error!', err.error.message);
          })
      }
}
