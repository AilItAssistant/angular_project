import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { response } from 'express';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.scss'
})
export class AddQuestionsComponent {

  constructor(private http: HttpClient) {}

  numberResponses: number = 3;
  numberQuestion: number = 1;
  statement: boolean = false;
  selectedStatement: any;
  charge: boolean = false;

  addResponse(){
    if(this.numberResponses < 6){
      this.numberResponses++;
    }
  };
  
  questionForm = new FormGroup({
    level: new FormControl(""),
    block: new FormControl(""),
    question: new FormControl(""),
    skills: new FormControl(""),
    puntuation: new FormControl(""),
    text: new FormControl(""),
    modalLevel: new FormControl(""),
    response: new FormControl(""),
    statement: new FormControl(""),
    responseA: new FormControl(""),
    responseB: new FormControl(""),
    responseC: new FormControl(""),
    responseD: new FormControl(""),
    responseE: new FormControl(""),
    responseF: new FormControl(""),
  });

  sendQuestion(){
    let responses: any = [
      {A: this.questionForm.value.responseA},
      {B: this.questionForm.value.responseB},
      {C: this.questionForm.value.responseC},
    ]

    if(this.questionForm.value.responseD !== "" && this.questionForm.value.responseD !== null){
      responses.push({D: this.questionForm.value.responseD})
      console.log(this.questionForm.value.responseD)
    }
    if(this.questionForm.value.responseE !== "" && this.questionForm.value.responseE !== null){
      responses.push({E: this.questionForm.value.responseE})
    }
    if(this.questionForm.value.responseF !== "" && this.questionForm.value.responseF !== null){
      responses.push({F: this.questionForm.value.responseF})
    }

    let add: any = {
      question: this.questionForm.value.question,
      block: this.questionForm.value.block,
      response: this.questionForm.value.response,
      responses: responses
    };
    console.log(add)
    this.http.post<any>('http://localhost:4000/api/exams', add).subscribe({
      next: (res) => {
        console.log(res)
        let form: any = document.getElementById("questionForm");
        form.reset();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  sendStatement(){

    let add: any = {
      level: this.questionForm.value.level,
      skills: this.questionForm.value.skills,
      statement: this.questionForm.value.statement,
      puntuation: this.questionForm.value.puntuation,
      text: this.questionForm.value.text
    };
    console.log(add);

    this.http.post<any>('http://localhost:4000/api/exams', add).subscribe({
      next: (res) => {
        console.log(res);
        let form: any = document.getElementById("questionForm");
        form.reset();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  closeStatementModal(){
    let statementModal: any;
    statementModal = document.getElementById('statementModal');
    statementModal.style.display="none";
  };

  openStatementModal(){
    let statementModal: any;
    statementModal = document.getElementById('statementModal');
    statementModal.style.display="block";
  };
}