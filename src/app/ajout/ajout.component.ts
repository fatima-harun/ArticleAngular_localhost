import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ajout',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent {

  
  // private fb = inject(FormBuilder);

  // formGroup = this.fb.group({
  //   title: ['', [Validators.required, Validators.maxLength(300)]],
  //   body: ['', [Validators.required]],
  //   userId: [1] // Ajout d'un userId par défaut
  // });

  // constructor(
  //   public articleService: ArticleService,
  //   private router: Router
  // ) { }

  // // Implémenter la fonction submit définie dans le formulaire
  // submit(event: Event) {
  //   event.preventDefault();
  //   if (this.formGroup.valid) {
  //     // Assurez-vous que les valeurs sont définies et non nulles
  //     const formValue = {
  //       title: this.formGroup.get('title')?.value || '',
  //       body: this.formGroup.get('body')?.value || '',
  //       userId: this.formGroup.get('userId')?.value || 1
  //     };

  //     this.articleService.create(formValue).subscribe((res: any) => {
  //       console.log('Article créée avec succés!');
  //       this.router.navigateByUrl('ajout');
  //     });
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }

  // isFieldValid(fieldName: string) {
  //   const formControl = this.formGroup.get(fieldName);
  //   return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  // }
}
