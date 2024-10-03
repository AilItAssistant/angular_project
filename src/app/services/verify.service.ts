import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class VerifyService {

  constructor(private http: HttpClient, private router: Router) { }
  
  verify = async () => {
  
    let itsTrue: boolean = false;
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });

    this.http.get<any>('http://localhost:4000/api/users/verify', {headers: httpHeaders}).subscribe({
      next: (res) => {
        console.log(res);
        itsTrue = true;

      },
      error: (err) => {
        itsTrue = false;
        this.router.navigateByUrl(`/login`);
        alert('Cargar fallo' + err);
      },
    });
    return itsTrue;
  };
}