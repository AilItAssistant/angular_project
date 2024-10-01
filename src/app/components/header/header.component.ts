import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  session: any = {
    logged: false,
    user: "",
    role: "",
    permissions: "",
    lastname: ""
  };

  constructor( private http: HttpClient, private router: Router ) {}

  ngOnInit(){
    this.verify();
  };

  verify(){
    let token: any = localStorage.getItem('token');
    if ( localStorage.getItem('token') !== 'undefined' ) {
    let httpHeaders: any = new HttpHeaders({
      'authorization': token
    });
    console.log(token)
      this.http.get<any>('http://localhost:4000/api/users/verifyHeader', {headers: httpHeaders}).subscribe({
        next: (res) => {
          console.log(res)
          if (res) {
            this.session = {
              logged: true,
              user: res.username,
              permissions: res.permissions,
              name: res.name,
              lastname: res.last_name
            };
            console.log(this.session)
          };
        },
        error: (err) => {
          alert('Verify header fallo' + err);
          this.router.navigateByUrl(`/login`);
        },
      });
    };
  };

  closeSesion(){
    localStorage.removeItem('token');
  };
}