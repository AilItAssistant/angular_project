import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    user: new FormControl(""),
    password: new FormControl(""),
  });

  ngOnInit(){
    this.verify();
  };

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService) {}

  verify(){
    if ( localStorage.getItem('token') !== 'undefined' ) {
      let token: any = { token: localStorage.getItem('token') };
      this.http.post<any>('http://localhost:4000/api/users/verify', token).subscribe({
        next: (res) => {
          console.log(res)
          if (res) {
            this.router.navigate(['']);
          };
        },
        error: (err) => {
          alert('Cargar fallo' + err);
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
        alert('Cargar fallo' + err);
      },
    });
  };
}