import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-students',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  students: any = [];
  cities: any =[];

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
    identification_number: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl("")
  });

  ngOnInit() {
    this.load();
    this.loadCities();
  };

  load(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/alumnos', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.students = res.students;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadCities(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/cities', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.cities = res;
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
        this.students.sort( (a:any, b:any) => {
          if (a.last_name > b.last_name) {
            return 1;
          }
          if (a.last_name < b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "lastName_desc":
        this.students.sort( (a:any, b:any) => {
          if (a.last_name < b.last_name) {
            return 1;
          }
          if (a.last_name > b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "city_asc":
          this.students.sort( (a:any, b:any) => {
          if (a.city > b.city) {
            return 1;
          }
          if (a.city < b.city) {
            return -1;
          }
          return 0});
        break;
      case "city_desc":
        this.students.sort( (a:any, b:any) => {
          if (a.city < b.city) {
            return 1;
          }
          if (a.city > b.city) {
            return -1;
          }
          return 0});
        break;
    };
  };

  filter(){
    let filters: any = {
      identification_number: this.orderForm.value.identification_number,
      last_name: this.orderForm.value.last_name,
      phone_number: this.orderForm.value.phone_number,
      email: this.orderForm.value.email,
      city: this.orderForm.value.city
    };
    if(filters.identification_number === ""){filters.identification_number = null};
    if(filters.last_name === ""){filters.last_name = null};
    if(filters.phone_number === ""){filters.phone_number = null};
    if(filters.city === ""){filters.city = null};
    if(filters.email === ""){filters.email = null};

    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/alumnos/filter', filters, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteFilter(){
    this.load();
    this.orderForm.reset({
      identification_number: "",
      last_name: "",
      phone_number: "",
      email: "",
      city: ""
    });
  };

}
