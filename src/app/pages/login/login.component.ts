import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
    selector: 'app-login',
    imports: [FooterComponent, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    user: new FormControl(""),
    password: new FormControl(""),
  });

  constructor( private http: HttpClient, private router: Router) {}

  ngOnInit(){
    this.verify();
    this.controlPage();
  };

  controlPage(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
    'authorization': auth
    });
    let data: any = { name: "login"};
    this.http.post<any>('http://localhost:4000/api/user_actions/entrypage', data, {headers: httpHeaders}).subscribe({
        next: (res) => {},
        error: (err) => { alert('Cargar fallo' + err); },
    });
  };

  verify(){
    if ( localStorage.getItem('token') !== 'undefined' ) {
      let token: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': token
      });
      this.http.get<any>('http://localhost:4000/api/users/verifyHeader', {headers: httpHeaders}).subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['']);
          };
        },
        error: (err) => {
          alert('Fallo verify' + err);
        },
      });
    };
  };

  login(){
    let credentials: any = {
      user: this.loginForm.value.user,
      pass: this.loginForm.value.password,
    };
    this.http.post<any>('http://localhost:4000/api/users/login', credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token',res.token);
        if ( res === 'Usuario o clave incorrecto' ) {
          alert(res);
        } else {
          this.router.navigate(['']);
        }
        credentials = {
          user: '',
          pass: '',
        };
      },
      error: (err) => {
        alert('Fallo login' + err);
      },
    });
  };
}