import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-validate-questions',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './validate-questions.component.html',
  styleUrl: './validate-questions.component.scss'
})
export class ValidateQuestionsComponent {

  charge: boolean = false;
  exams: any;

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
    this.http.get<any>('http://localhost:4000/api/exams').subscribe({
      next: (res) => {
        this.exams = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  //EDIT

  openEditModal(exam: any, question: any){

    this.selectQuestion = {
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
    };
    
    for(let i: number = 0; question.responses.length > i; i++){
      switch (question.responses[i].letter) {
        case "A": 
          this.selectQuestion.A= question.responses[i].response;
          break;
        case "B": 
          this.selectQuestion.B = question.responses[i].response;
          break;
        case "C": 
          this.selectQuestion.C = question.responses[i].response;
          break;
        case "D": 
          this.selectQuestion.D = question.responses[i].response;
          break;
        case "E": 
          this.selectQuestion.E = question.responses[i].response;
          break;
        }
      };

    this.questionForm = new FormGroup({
      level: new FormControl("A1"),
      block: new FormControl(exam.name),
      question: new FormControl(question.statement),
      responseA: new FormControl(this.selectQuestion.A),
      responseB: new FormControl(this.selectQuestion.B),
      responseC: new FormControl(this.selectQuestion.C),
      responseD: new FormControl(this.selectQuestion.D),
      responseE: new FormControl(this.selectQuestion.E),
    });
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  closeEditModal(){
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="none";
  };

  editQuestion(){};

  //DELETE

  openDeleteModal(exam: any, question: any){

    this.selectQuestion = {
      statement: question.statement,
      A: "",
      B: "",
      C: "",
      D: "",
      E: ""
    };
    for(let i: number = 0; question.responses.length > i; i++){
      switch (question.responses[i].letter) {
        case "A": 
          this.selectQuestion.A= question.responses[i].response;
          break;
        case "B": 
          this.selectQuestion.B = question.responses[i].response;
          break;
        case "C": 
          this.selectQuestion.C = question.responses[i].response;
          break;
        case "D": 
          this.selectQuestion.D = question.responses[i].response;
          break;
        case "E": 
          this.selectQuestion.E = question.responses[i].response;
          break;
        }
      };
    let editModal: any;
    editModal = document.getElementById('deleteModal');
    editModal.style.display="block";
  };

  closeDeleteModal(){
    let editModal: any;
    editModal = document.getElementById('deleteModal');
    editModal.style.display="none";
  };

  deleteQuestion(){};

  //ADD

  openAddModal(exam: any, question: any){
    console.log(exam);
    console.log(question);
    this.selectQuestion = {
      statement: question.statement,
      A: "",
      B: "",
      C: "",
      D: "",
      E: ""
    };
    for(let i: number = 0; question.responses.length > i; i++){
      switch (question.responses[i].letter) {
        case "A": 
          this.selectQuestion.A= question.responses[i].response;
          break;
        case "B": 
          this.selectQuestion.B = question.responses[i].response;
          break;
        case "C": 
          this.selectQuestion.C = question.responses[i].response;
          break;
        case "D": 
          this.selectQuestion.D = question.responses[i].response;
          break;
        case "E": 
          this.selectQuestion.E = question.responses[i].response;
          break;
        }
      };
    let editModal: any;
    editModal = document.getElementById('addModal');
    editModal.style.display="block";
  };

  closeAddModal(){
    let editModal: any;
    editModal = document.getElementById('addModal');
    editModal.style.display="none";
  };

  addQuestion(){};
}
