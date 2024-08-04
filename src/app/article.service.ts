import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from './post.model';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  find(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsUrl}?postId=${postId}`).pipe(
      catchError(this.errorHandler)
    );
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, this.httpOptions);
  }

  update(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
