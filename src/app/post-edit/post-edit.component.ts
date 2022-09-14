import { HttpClient,HttpHeaders,
  HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html'
})
export class PostEditComponent implements OnInit {
  baseURL = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  preview = ''
  submitted = false;
  public postForm !: FormGroup;
  constructor(private formBuilder : FormBuilder,
    private actRoute: ActivatedRoute, private toastrService: ToastrService,
    private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPost(id);
    this.postForm = this.formBuilder.group(
      {
        description: ['', [Validators.required]],
        upload:[''],
        post_img:[null],
      }
    )
  }


getPost(id:any) {
  this.http.get<any>(this.baseURL+'/posts/view/'+id)
  .subscribe(
    (res) => {
      this.postForm.setValue({
      description: res.data['description'],upload:'',post_img:''
    });},
    (err) => { if (err.error) this.toastrService.error('Error!', err.error.message); }
  )
}
  get myForm() {
    return this.postForm.controls;
  }

  onFileSelected(event:any) {
    const file = (event.target).files[0];
    this.postForm.patchValue({
      post_img: file,
    });

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    var formData: any = new FormData();
        formData.append('description', this.postForm.value.description);
        formData.append('post_img', this.postForm.value.post_img);

        this.http.put<any>(this.baseURL + '/posts/update/' + id, formData)
        .subscribe((res) => {
          this.toastrService.success('Success!', "Post Updated");
            this.postForm.reset();
            this.router.navigate(['posts']);
          },
          (err) => {
            if (err.error) this.toastrService.error('Error!', err.error);
          })
      }

}
