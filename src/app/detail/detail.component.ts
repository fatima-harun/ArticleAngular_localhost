import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../article.service';
import { Post } from '../post.model';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  postId!: number;
  post!: Post;
  comments: Comment[] = [];

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.postId = +this.route.snapshot.paramMap.get('postId')!;
    this.loadPost(this.postId);
    this.loadComments(this.postId);
  }

  loadPost(id: number) {
    this.articleService.find(id).subscribe(
      (data: Post) => {
        this.post = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'article', error);
      }
    );
  }

  loadComments(postId: number) {
    this.articleService.getComments(postId).subscribe(
      (data: Comment[]) => {
        this.comments = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }
}
