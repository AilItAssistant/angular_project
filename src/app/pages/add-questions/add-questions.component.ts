import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { response } from 'express';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.scss'
})
export class AddQuestionsComponent {

  constructor(private http: HttpClient) {}

  numberResponses: number = 2;

  addResponse(){
    if(this.numberResponses < 5){
      this.numberResponses++;
    }
  };
  
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

  addQuestion(){
    let add: object = {
      level: this.questionForm.value.level,
      block: this.questionForm.value.block,
      question: this.questionForm.value.question,
      responseA: this.questionForm.value.responseA,
      responseB: this.questionForm.value.responseB,
    };
    if(this.numberResponses === 3){
      add = Object.assign({responseC: this.questionForm.value.responseC}, add);
    };
    if(this.numberResponses === 4){
      add = Object.assign({responseD: this.questionForm.value.responseD}, add);
    }
    if(this.numberResponses === 5){
      add = Object.assign({responseE: this.questionForm.value.responseE}, add);
    }

    this.http.post<any>('http://localhost:4000/api/exams', add).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };
}