import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {

  classes: any;

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
  });

  ngOnInit() {
    this.load();
  }
  
  load(){
    this.http.get<any>('http://localhost:4000/api/classes').subscribe({
      next: (res) => {
        this.classes = res;
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

}
