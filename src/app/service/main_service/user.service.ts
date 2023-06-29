import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export const API_URL = 'http://localhost:8080/api/test';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + '/all', { responseType: 'text' });
  }
  getUserBoard(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/user');
  }
  getModeratorBoard(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/mod');
  }
  getAdminBoard(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/admin');
  }

  get(id: any): Observable<User> {
    return this.http.get(`${API_URL}/user/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/user/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/user/${id}`);
  }

  findByName(name: any, accessRight: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users?username=${name}?role=${accessRight}`);
  }
  findByEmail(email: any, accessRight: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users?email=${email}?role=${accessRight}`);
  }
}
