import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})

export class PostsComponent implements OnInit {

  public postForm !: FormGroup;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  Posts:any = [];
  constructor(private formBuilder : FormBuilder, private toastrService: ToastrService,
    private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.getPosts();

  }
  getPosts() {
    this.http.get<any>('http://localhost:3000/api/posts/myposts')
    .subscribe(
      (res) => { this.Posts = res.data},
      (err) => {if (err.error) this.toastrService.error('Error!', err.error.message);}
    )

  }

  removePost(post:any, index:any) {
    if(window.confirm('Are you sure?')) {

      let url = `http://localhost:3000/api/posts/delete/${post._id}`;
      this.http
        .delete(url, { headers: this.headers })
        .subscribe((res) => {
          this.toastrService.success('Success!', 'Post Deleted');
          this.Posts.splice(index, 1);
        },
        (err) => {
          if (err.error) this.toastrService.error('Error!', err.error.message);
        });

    }
  }

}
