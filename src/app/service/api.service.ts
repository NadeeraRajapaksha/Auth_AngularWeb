import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl : any = 'https://localhost:7134/api/User/';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }
}
