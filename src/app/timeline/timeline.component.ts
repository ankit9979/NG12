import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor( private http : HttpClient, private toastrService: ToastrService) { }
  Posts:any = [];
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.http.get<any>('http://localhost:3000/api/posts/allposts')
    .subscribe(
      (res) => { this.Posts = res.data},
      (err) => {if (err.error) this.toastrService.error('Error!', err.error.message);}
    )

  }

}
