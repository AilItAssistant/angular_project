import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

  constructor(private http: HttpClient) {}

  teachers: any;

  orderForm = new FormGroup({
    select: new FormControl(""),
  });

  ngOnInit() {
    this.load();
  }
  
  load(){
    this.http.get<any>('http://localhost:4000/api/teachers').subscribe({
      next: (res) => {
        this.teachers = res;
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

}
