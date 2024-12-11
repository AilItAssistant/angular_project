import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
    selector: 'app-teachers',
    imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
    templateUrl: './teachers.component.html',
    styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

  constructor(private http: HttpClient) {}

  teachers: any = [];
  departments: any = [];

  orderForm = new FormGroup({
    select: new FormControl(""),
    department: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl("")
  });

  ngOnInit() {
    this.controlPage();
    this.load();
    this.loadDepartments();
  };

  controlPage(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
    'authorization': auth
    });
    let data: any = { name: "teachers"};
    this.http.post<any>('http://localhost:4000/api/user_actions/entryPage', data, {headers: httpHeaders}).subscribe({
        next: (res) => {},
        error: (err) => { alert('Cargar fallo' + err); },
    });
};

  load(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/teachers', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.teachers = res.teachers;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadDepartments(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/departments', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  order(){
    switch(this.orderForm.value.select){
      case "":
        break;
      case "lastName_asc":
        this.teachers.sort( (a:any, b:any) => {
          if (a.last_name > b.last_name) {
            return 1;
          }
          if (a.last_name < b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "lastName_desc":
        this.teachers.sort( (a:any, b:any) => {
          if (a.last_name < b.last_name) {
            return 1;
          }
          if (a.last_name > b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "department_asc":
          this.teachers.sort( (a:any, b:any) => {
          if (a.department > b.department) {
            return 1;
          }
          if (a.department < b.department) {
            return -1;
          }
          return 0});
        break;
      case "department_desc":
        this.teachers.sort( (a:any, b:any) => {
          if (a.department < b.department) {
            return 1;
          }
          if (a.department > b.department) {
            return -1;
          }
          return 0});
        break;
    };
  };

  filter(){
    let filters: any = {
      department: this.orderForm.value.department,
      last_name: this.orderForm.value.last_name,
      phone_number: this.orderForm.value.phone_number,
      email: this.orderForm.value.email,
    };
    if(filters.department === ""){filters.department = null};
    if(filters.last_name === ""){filters.last_name = null};
    if(filters.phone_number === ""){filters.phone_number = null};
    if(filters.email === ""){filters.email = null};
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
      this.http.put<any>('http://localhost:4000/api/teachers/filter', filters, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.teachers = res;
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
  };

  deleteFilter(){
    this.load();
    this.orderForm.reset({
      department: "",
      last_name: "",
      phone_number: "",
      email: ""
    });
  };

}