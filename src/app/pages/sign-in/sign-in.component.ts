import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [FooterComponent, ReactiveFormsModule, HeaderComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signinForm = new FormGroup({
    user: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(){
      this.controlPage();
  };

  controlPage(){
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
      'authorization': auth
      });
      let data: any = { name: "sign_in"};
      this.http.post<any>('http://localhost:4000/api/user_actions/entrypage', data, {headers: httpHeaders}).subscribe({
          next: (res) => {},
          error: (err) => { alert('Cargar fallo' + err); },
      });
  };

};