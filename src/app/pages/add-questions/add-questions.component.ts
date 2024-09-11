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
  statementSelected: any;
  levels: any;
  skills: any;
  blocks: any;

  ngOnInit() {
    this.load();
  }
  
  load(){
    this.http.get<any>('http://localhost:4000/api/levels').subscribe({
      next: (res) => {
        this.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
    this.http.get<any>('http://localhost:4000/api/skills').subscribe({
      next: (res) => {
        this.skills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
    this.http.get<any>('http://localhost:4000/api/blocks').subscribe({
      next: (res) => {
        this.blocks = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addResponse(){
    if(this.numberResponses < 6){
      this.numberResponses++;
    }
  };

  statementForm = new FormGroup({
    statement: new FormControl(""),
  });
  
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
      {
        content: this.questionForm.value.responseA,
        letter: "A",
        is_correct: false
      },
      {
        content: this.questionForm.value.responseB,
        letter: "B",
        is_correct: false
      },
      {
        content: this.questionForm.value.responseC,
        letter: "C",
        is_correct: false
      },
    ]

    if(this.questionForm.value.responseD !== "" && this.questionForm.value.responseD !== null){
      responses.push({
        content: this.questionForm.value.responseD,
        letter: "D",
        is_correct: false

      })
    }
    if(this.questionForm.value.responseE !== "" && this.questionForm.value.responseE !== null){
      responses.push({
        content: this.questionForm.value.responseE,
        letter: "E",
        is_correct: false
      })
    }
    if(this.questionForm.value.responseF !== "" && this.questionForm.value.responseF !== null){
      responses.push({
        content: this.questionForm.value.responseF,
        letter: "F",
        is_correct: false
      })
    }
    console.log(this.questionForm.value.response)

    responses.forEach((element: any) => {
      if(this.questionForm.value.response === element.letter){
        element.is_correct = true
      }
    });

    let add: any = {
      question: this.questionForm.value.question,
      block: this.questionForm.value.block,
      responses: responses,
      skill_id: this.selectedStatement.skill_id,
      level_id: this.selectedStatement.level_id,
      statement_id: this.selectedStatement.id
    };
    console.log(add)
    this.http.post<any>('http://localhost:4000/api/questions', add).subscribe({
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

    this.http.post<any>('http://localhost:4000/api/statements', add).subscribe({
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
    this.http.get<any>('http://localhost:4000/api/statements').subscribe({
      next: (res) => {
        this.statementSelected = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  selectStatement(){
    
    let statementModal: any;
    this.http.get<any>(`http://localhost:4000/api/statements/${this.statementForm.value.statement}`).subscribe({
      next: (res) => {
        this.selectedStatement = res[0];
        statementModal = document.getElementById('statementModal');
        statementModal.style.display="none";
        if(this.statementForm.value.statement !== ""){
          this.statement = true;
        };
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  writeStatement(){
    this.statement = false;
  };
}