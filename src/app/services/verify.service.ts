import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class VerifyService {

  constructor(private http: HttpClient, private router: Router) { }

  verify(): boolean {

    let itsTrue: boolean = false;
    let token = { token: localStorage.getItem('token') };

    this.http.post<any>('http://localhost:4000/api/users/verify', token).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          itsTrue = true;
        }
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