import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    //this.verify();
  };

  verify( path: string ){
    if ( localStorage.getItem('token') !== 'undefined' ) {
      let token: any = { token: localStorage.getItem('token') };
      this.http.post<any>('http://localhost:4000/api/users/verify', token).subscribe({
        next: (res) => {
          console.log(res)
          if (res) {
            //this.router.navigate(['/${path}']);
            this.router.navigateByUrl(`/${path}`);
            this.session = {
              logged: true,
              user: res.username,
              role: res.role,
              permissions: res.permissions,
              name: res.name,
              lastname: res.last_name
            };
            console.log(this.session)
          };
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
  };
}