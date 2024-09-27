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

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService) {}

  login(){
    let credentials: any = {
      user: this.loginForm.value.user,
      pass: this.loginForm.value.password,
    };

    /*this.authService.singin(credentials).subscribe( (res:any) => {
      console.log(res);
      localStorage.setItem('token',res.token);
      this.router.navigate(['']);
      let form: any = document.getElementById("loginForm");
      form.reset();
    })*/

    this.http.post<any>('http://localhost:4000/api/users/login', credentials).subscribe({
      next: (res) => {
        console.log(res)
        localStorage.setItem('token',res.token);
        this.router.navigate([''])
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };
}