import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
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
      this.http.get<any>('http://localhost:4000/api/users/verifyHeader', {headers: httpHeaders}).subscribe({
        next: (res) => {
          if (res) {
            this.session = {
              logged: true,
              user: res.username,
              permissions: res.permissions,
              name: res.name,
              lastname: res.last_name
            };
            this.test();
          };
        },
        error: (err) => {
          alert('Verify header fallo' + err);
          this.router.navigateByUrl(`/login`);
        },
      });
    } else {
      this.router.navigateByUrl(`/login`);
    };
  };

  closeSesion(){
    localStorage.removeItem('token');
  };

  test(){
    let path: any = this.router.url;
    switch( this.session.permissions ){
      case "admin":
        /*if(path === "") {
          this.router.navigateByUrl(``);
        };*/
        break;
      case "employee":
        if( path === "/bitacora" || path === "/triggers" ) {
          this.router.navigateByUrl(`/`);
        };
        break;
      case "teacher":
        if( path === "/bitacora" || path === "/triggers" || 
          path === "/manage_questions" || path === "/manage_structure" || path === "/manage_exams_results" || 
          path === "/manage_students" || path === "/manage_teachers" || path === "/manage_classes" 
          || path === "/manage_users" || path === "/statistics" || path === "/classes" || 
          path === "/students" || path === "/teachers" ) {
          this.router.navigateByUrl(`/`);
        };
        break;
      case "student":
        if( path === "/bitacora" || path === "/triggers" ||
          path === "/manage_questions" || path === "/manage_structure" || path === "/manage_exams_results" || 
          path === "/manage_students" || path === "/manage_teachers" || path === "/manage_classes" || path === "/manage_users"
          || path === "/manage_users" || path === "/statistics" || path === "/classes" || 
          path === "/students" || path === "/teachers" || path === "/exams" || path === "/add_exams_notes" || path === "/search_exams"
          || path === "/add_questions" || path === "/validate_questions" ) {
          this.router.navigateByUrl("/");
        };
        break;
      default:
        if( path === "/bitacora" || path === "/triggers" ||
          path === "/manage_questions" || path === "/manage_structure" || path === "/manage_exams_results" || 
          path === "/manage_students" || path === "/manage_teachers" || path === "/manage_classes" || path === "/manage_users"
          || path === "/manage_users" || path === "/statistics" || path === "/classes" || 
          path === "/students" || path === "/teachers" || path === "/exams" || path === "/add_exams_notes" || path === "/search_exams"
          || path === "/add_questions" || path === "/validate_questions" ) {
          this.router.navigateByUrl(`/`);
        };
        break;
    };
  };
}