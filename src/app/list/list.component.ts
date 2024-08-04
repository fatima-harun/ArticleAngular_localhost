import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Post } from '../post.model';  // Assurez-vous d'importer le modèle Post

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: Post[] = [];
  formGroup: FormGroup;
  editingPost?: Post; // Article en cours d'édition

  constructor(
    private articleservice: ArticleService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(300)]],
      body: ['', [Validators.required]],
      userId: [1]
    });
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.articleservice.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  submit(event: Event) {
    event.preventDefault();

    if (this.formGroup.valid) {
      const formValue: Post = {
        title: this.formGroup.get('title')?.value || '',
        body: this.formGroup.get('body')?.value || '',
        id: this.editingPost?.id ?? 0 // Utiliser l'id de l'article en cours d'édition ou une valeur par défaut (0) si non défini
      };

      if (this.editingPost) { // Si `editingPost` est défini, on est en mode modification
        this.articleservice.update(this.editingPost.id, formValue).subscribe(() => {
          console.log('Article modifié avec succès!');
          const index = this.posts.findIndex((p) => p.id === this.editingPost?.id);
          if (index !== -1) {
            this.posts[index] = formValue;
          }
          this.resetForm();
        });
      } else { // Sinon, on est en mode ajout
        this.articleservice.create(formValue).subscribe((newPost: Post) => {
          console.log('Article créé avec succès!', newPost);
          this.posts.unshift(newPost);
          this.resetForm();
        });
      }
    } else {
      console.error('Form is invalid');
    }
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  editPost(post: Post) {
    this.editingPost = post;
    this.formGroup.patchValue(post);
  }

  deletePost(id: number) {
    this.articleservice.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  resetForm() {
    this.formGroup.reset({
      title: '',
      body: '',
      userId: 1
    });
    this.editingPost = undefined; // Réinitialiser l'article en cours d'édition
  }
}
