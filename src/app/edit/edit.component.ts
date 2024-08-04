import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Post } from '../post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  id!: number;
  post: Post = { id: 0, title: '', body: '' }; // Initialisation de post
  formGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(300)]],
    body: ['', [Validators.required]],
    userId: [1] // Note: userId n'est pas dans le modèle Post
  });

  constructor(
    public articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['postId'];
    this.articleService.find(this.id).subscribe((data: Post) => {
      this.formGroup.patchValue(data);
      this.post = data;
      console.log(this.post);
    });
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.formGroup.valid) {
      const formGroupValue: Post = {
        id: this.id, // Utilisation de l'id actuel
        title: this.formGroup.get('title')?.value || '',
        body: this.formGroup.get('body')?.value || ''
      };

      this.articleService.update(this.id, formGroupValue).subscribe((res: any) => {
        console.log('Article modifié avec succès!');
        this.router.navigateByUrl('list');
      });
    } else {
      console.error('Form is invalid');
    }
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }
}
