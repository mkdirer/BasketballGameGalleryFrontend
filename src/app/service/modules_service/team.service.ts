import { Team } from './../../models/team.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export const baseUrl = 'https://backend-basketball-game-gallery.onrender.com/api/teams';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(baseUrl);
  }
  get(id: any): Observable<Team> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByName(name: any): Observable<Team[]> {
    return this.http.get<Team[]>(`${baseUrl}?name=${name}`);
  }
}
