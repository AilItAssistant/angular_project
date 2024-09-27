import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
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

  signin(){
    let credentials: any = {
      user: this.signinForm.value.user,
      pass: this.signinForm.value.password,
    }

    console.log(credentials)

    /*this.http.post<any>('http://localhost:4000/api/users/signin', credentials).subscribe({
      next: (res) => {
        console.log(res);
        let form: any = document.getElementById("signinForm");
        form.reset();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });*/

    this.http.get<any>('http://localhost:4000/api/classes').subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });

    console.log('works')
  };
}