import { HttpClient,HttpHeaders,
  HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html'
})

export class PostAddComponent implements OnInit {
  baseURL = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  preview = ''
  submitted = false;
  public postForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private toastrService: ToastrService,
    private http : HttpClient, private router : Router) { }
    fileName =''
  ngOnInit(): void {
    this.postForm = this.formBuilder.group(
      {
        description: ['', [Validators.required]],
        upload:[''],
        post_img:[null],
      }
    )
  }

  get myForm() {
    return this.postForm.controls;
  }

  onFileSelected(event:any){
    const file = (event.target).files[0];
    this.postForm.patchValue({
      post_img: file,
    });
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {

  var formData: any = new FormData();
      formData.append('description', this.postForm.value.description);
      formData.append('post_img', this.postForm.value.post_img);

      this.http.post<any>(this.baseURL+'/posts/add', formData)
      .subscribe((res) => {
          this.toastrService.success('Success!', 'Post Added');
          this.postForm.reset();
          this.router.navigate(['posts']);
        },
        (err) => {
          if (err.error)this.toastrService.error('Error!', err.error.message);
        })
    }
}
