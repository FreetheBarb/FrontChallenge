import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import User from "../interfaces/user.interface";
import UserRequest from "../interfaces/userRequest.interface";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/user`);
  }
  createUsers(user: User): Observable<UserRequest>{
    return this.http.post<UserRequest>(`${this.BASE_URL}/user/create`, user);
  }
  deleteUsers(userID: string): Observable<UserRequest>{
    return this.http.delete<UserRequest>(`${this.BASE_URL}/user/delete?userID=${userID}`);
  }
  updateUsers(userID: string, user: User): Observable<UserRequest>{
    return this.http.put<UserRequest>(`${this.BASE_URL}/user?userID=${userID}`, user);
  }
}
