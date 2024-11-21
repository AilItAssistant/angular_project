import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
    selector: 'app-classes',
    imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
    templateUrl: './classes.component.html',
    styleUrl: './classes.component.scss'
})
export class ClassesComponent {

  classes: any;

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
    class: new FormControl(""),
    last_name: new FormControl(""),
    level: new FormControl(""),
    class_name: new FormControl(""),
  });

  ngOnInit() {
    this.load();
  }

  load(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth,
    });
    this.http.get<any>('http://localhost:4000/api/classes', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.classes = res.classes;
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
        this.classes.sort( (a:any, b:any) => {
          if (a.teacher_last_name > b.teacher_last_name) {
            return 1;
          }
          if (a.teacher_last_name < b.teacher_last_name) {
            return -1;
          }
          return 0});
        break;
      case "lastName_desc":
        this.classes.sort( (a:any, b:any) => {
          if (a.teacher_last_name < b.teacher_last_name) {
            return 1;
          }
          if (a.teacher_last_name > b.teacher_last_name) {
            return -1;
          }
          return 0});
        break;
      case "level_asc":
          this.classes.sort( (a:any, b:any) => {
          if (a.class_level > b.class_level) {
            return 1;
          }
          if (a.class_level < b.class_level) {
            return -1;
          }
          return 0});
        break;
      case "level_desc":
        this.classes.sort( (a:any, b:any) => {
          if (a.class_level < b.class_level) {
            return 1;
          }
          if (a.class_level > b.class_level) {
            return -1;
          }
          return 0});
        break;
      case "className_asc":
        this.classes.sort( (a:any, b:any) => {
          if (a.class_name > b.class_name) {
            return 1;
          }
          if (a.class_name < b.class_name) {
            return -1;
          }
          return 0});
        break;
      case "className_desc":
        this.classes.sort( (a:any, b:any) => {
          if (a.class_name < b.class_name) {
            return 1;
          }
          if (a.class_name > b.class_name) {
            return -1;
          }
          return 0});
        break;
    };
  };

  filter(){
    let filters: any = {
      last_name: this.orderForm.value.last_name,
      class: this.orderForm.value.class,
      level: this.orderForm.value.level,
      class_name: this.orderForm.value.class_name,
    };
    if(filters.last_name === ""){filters.last_name = null};
    if(filters.class === ""){filters.class = null};
    if(filters.class_name === ""){filters.class_name = null};
    if(filters.level === ""){filters.level = null};

    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth,
    });
    this.http.put<any>('http://localhost:4000/api/classes/filter', filters, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.classes = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteFilter(){
    this.load();
    this.orderForm.reset({
      last_name: "",
      class: "",
      level: "",
      class_name: "",
    });
  };

}
