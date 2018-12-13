import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor(
    private http: HttpClient
  ) { }    

  getAll(): Observable<User[]> {
    return this.http.get(`${environment.apiUrl}/api/users/all`).pipe(
      map((res) => {
        this.users = res['data'];
        return this.users;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}

