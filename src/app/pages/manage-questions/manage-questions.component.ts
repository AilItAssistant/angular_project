import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { response } from 'express';


@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './manage-questions.component.html',
  styleUrl: './manage-questions.component.scss'
})
export class ManageQuestionsComponent {

  exams: any;
  charge: boolean = false;

  exam: any;
  question: any;

  modalStatement: any;
  modalResponseA: any;
  modalResponseB: any;
  modalResponseC: any;
  modalResponseD: any;
  modalResponseE: any;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions(){
    this.http.get<any>('http://localhost:4000/api/exams').subscribe({
      next: (res) => {
        this.exams = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  }
  
  deleteQuestion(){

    let selectQuestion: object = {
      exam: this.exam,
      question: this.question
    }
    
    this.charge = true;

    this.http.put<any>('http://localhost:4000/api/exams', selectQuestion).subscribe({
      next: (res) => {
        this.exams = res;
        this.charge = false;
        alert("Pregunta borrada");
      },
      error: (err) => {
        console.log(err);
        alert("No se pudo borrar");
        this.charge = false;
      },
    });
    
  };

  closeDeleteModal(){
    let deleteModal: any;
    deleteModal = document.getElementById('staticBackdrop');
    deleteModal.style.display="none";
  }
  openDeleteModal(exam: any, question: any){
    let deleteModal: any;
    deleteModal = document.getElementById('staticBackdrop');
    deleteModal.style.display="block";
    this.exam = exam;
    this.question = question;
    this.modalStatement = this.question.statement;

    for(let i: any = 0; this.question.responses.length > i; i++){
      if(this.question.responses[i].letter === "A"){this.modalResponseA = this.question.responses[i].response;}
      if(this.question.responses[i].letter === "B"){this.modalResponseB = this.question.responses[i].response;}
      if(this.question.responses[i].letter === "C"){this.modalResponseC = this.question.responses[i].response;}
      if(this.question.responses[i].letter === "D"){this.modalResponseD = this.question.responses[i].response;}
      if(this.question.responses[i].letter === "E"){this.modalResponseE = this.question.responses[i].response;}
    }  
  }
}
