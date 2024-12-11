import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  standalone: true,
  selector: 'app-validate-questions',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './validate-questions.component.html',
  styleUrl: './validate-questions.component.scss'
})
export class ValidateQuestionsComponent {

  charge: boolean = false;
  exams: any = [];

  selectQuestion: any = {
    statement: "",
    A: "",
    B: "",
    C: "",
    D: "",
    E: ""
  }

  questionForm = new FormGroup({
    level: new FormControl(""),
    block: new FormControl(""),
    question: new FormControl(""),
    responseA: new FormControl(""),
    responseB: new FormControl(""),
    responseC: new FormControl(""),
    responseD: new FormControl(""),
    responseE: new FormControl(""),
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.controlPage();
  };

  controlPage(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
    'authorization': auth
    });
    let data: any = { name: "validate_questions"};
    this.http.post<any>('http://localhost:4000/api/user_actions/entrypage', data, {headers: httpHeaders}).subscribe({
        next: (res) => {},
        error: (err) => { alert('Cargar fallo' + err); },
    });
  };
};