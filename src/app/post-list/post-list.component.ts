import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  showCreateForm: boolean = false;
  newPost = { title: '', content: '', published: true };

  constructor(
    private postService: PostService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }

  onDeletePost(id: number) {
    this.postService.deletePost(id).subscribe(
      (response) => {
        this.posts = this.posts.filter((post) => post.id !== id);
        console.log(`Post with id ${id} deleted`);
      },
      (error) => {
        console.error('Error deleting post', error);
      }
    );
  }

  onEditPost(id: number) {
    this.router.navigate(['/edit-post', id]);
  }

  onCreatePost() {
    const { title, content } = this.newPost;

    if (title && content) {
      const newPost = { title, content, published: true };

      this.http.post('http://127.0.0.1:8000/posts', newPost).subscribe(
        (response: any) => {
          this.posts.push(response);
          console.log('New post created:', response);
          this.toggleCreateForm();
        },
        (error) => {
          console.error('Error creating post', error);
        }
      );
    }
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;

    if (!this.showCreateForm) {
      this.newPost.title = '';
      this.newPost.content = '';
    }
  }
}
