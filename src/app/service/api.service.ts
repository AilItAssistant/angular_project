import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_SERVER = "http://localhost:4000/api";

  constructor(private http: HttpClient) { }

  public getApi(api: string): Observable <any> {
    return this.http.get<any>(this.API_SERVER + api)
  }
}