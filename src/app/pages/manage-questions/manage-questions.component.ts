import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { response } from 'express';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './manage-questions.component.html',
  styleUrl: './manage-questions.component.scss',
})
export class ManageQuestionsComponent {
  exams: any = [];
  charge: boolean = false;
  exam: any;
  question: any;
  levels: any;
  skills: any;
  blocks: any;
  edit: any = {
    level: '',
    block: '',
    statement: '',
    responseA: '',
    responseB: '',
    responseC: '',
    responseD: '',
    responseE: '',
  };

  questionForm = new FormGroup({
    level: new FormControl(''),
    block: new FormControl(''),
    question: new FormControl(''),
    responseA: new FormControl(''),
    responseB: new FormControl(''),
    responseC: new FormControl(''),
    responseD: new FormControl(''),
    responseE: new FormControl(''),
  });

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

  loadQuestions() {
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http
      .get<any>('http://localhost:4000/api/statements/details', {headers: httpHeaders})
      .subscribe({
        next: (res) => {
          this.exams = res;
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    this.http.get<any>('http://localhost:4000/api/levels', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.levels = res.levels;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
    this.http.get<any>('http://localhost:4000/api/skills', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.skills = res.skills;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
    this.http.get<any>('http://localhost:4000/api/blocks', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.blocks = res.blocks;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  }

  deleteQuestion() {
    let selectQuestion: object = {
      exam: this.exam,
      question: this.question,
    };

    this.charge = true;
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http
      .put<any>('http://localhost:4000/api/exams', selectQuestion, {headers: httpHeaders})
      .subscribe({
        next: (res) => {
          this.exams = res;
          this.charge = false;
          alert('Pregunta borrada');
          let deleteModal: any;
          deleteModal = document.getElementById('deleteModal');
          deleteModal.style.display = 'none';
        },
        error: (err) => {
          console.log(err);
          alert('No se pudo borrar');
          this.charge = false;
        },
      });
  }

  closeDeleteModal() {
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'none';
  }

  openDeleteModal(exam: any, question: any) {
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'block';
    this.exam = exam;
    this.question = question;
    this.modalStatement = this.question.statement;

    for (let i: any = 0; this.question.answers.length > i; i++) {
      if (this.question.answers[i].letter === 'A') {
        this.modalResponseA = this.question.answers[i].answer_content;
      }
      if (this.question.answers[i].letter === 'B') {
        this.modalResponseB = this.question.answers[i].answer_content;
      }
      if (this.question.answers[i].letter === 'C') {
        this.modalResponseC = this.question.answers[i].answer_content;
      }
      if (this.question.answers[i].letter === 'D') {
        this.modalResponseD = this.question.answers[i].answer_content;
      }
      if (this.question.answers[i].letter === 'E') {
        this.modalResponseE = this.question.answers[i].answer_content;
      }
    }
  }

  openEditModal(exam: any, question: any) {
    console.log(exam);
    console.log(question);
    let responseA: string = '';
    let responseB: string = '';
    let responseC: string = '';
    let responseD: string = '';
    let responseE: string = '';
    for (let i: number = 0; question.answers.length > i; i++) {
      switch (question.answers[i].letter) {
        case 'A':
          responseA = question.answers[i].answer_content;
          break;
        case 'B':
          responseB = question.answers[i].answer_content;
          break;
        case 'C':
          responseC = question.answers[i].answer_content;
          break;
        case 'D':
          responseD = question.answers[i].answer_content;
          break;
        case 'E':
          responseE = question.answers[i].answer_content;
          break;
      }
    }

    this.edit = {
      level: 'A1',
      block: exam.name,
      statement: question.statement,
      responseA: responseA,
      responseB: responseB,
      responseC: responseC,
      responseD: responseD,
      responseE: responseE,
    };

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display = 'block';

    this.questionForm = new FormGroup({
      level: new FormControl(this.edit.level),
      block: new FormControl(this.edit.block),
      question: new FormControl(this.edit.statement),
      responseA: new FormControl(this.edit.responseA),
      responseB: new FormControl(this.edit.responseB),
      responseC: new FormControl(this.edit.responseC),
      responseD: new FormControl(this.edit.responseD),
      responseE: new FormControl(this.edit.responseE),
    });
  }

  closeEditModal() {
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
  }

  editQuestion() {
    this.charge = true;

    let changes: any = new Object();

    if (this.questionForm.value.level !== this.edit.level) {
      changes.level = this.questionForm.value.level;
    }
    if (this.questionForm.value.block !== this.edit.block) {
      changes.block = this.questionForm.value.block;
    }
    if (this.questionForm.value.question !== this.edit.statement) {
      changes.statement = this.questionForm.value.question;
    }
    if (this.questionForm.value.responseA !== this.edit.responseA) {
      changes.responseA = this.questionForm.value.responseA;
    }
    if (this.questionForm.value.responseB !== this.edit.responseB) {
      changes.responseB = this.questionForm.value.responseB;
    }
    if (
      this.questionForm.value.responseC !== '' &&
      this.questionForm.value.responseC !== this.edit.responseC
    ) {
      changes.responseC = this.questionForm.value.responseC;
    }
    if (
      this.questionForm.value.responseD !== '' &&
      this.questionForm.value.responseD !== this.edit.responseD
    ) {
      changes.responseD = this.questionForm.value.responseD;
    }
    if (
      this.questionForm.value.responseE !== '' &&
      this.questionForm.value.responseE !== this.edit.responseE
    ) {
      changes.responseE = this.questionForm.value.responseE;
    }

    console.log(changes);
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http
      .put<any>('http://localhost:4000/api/exams/edit', changes, {headers: httpHeaders})
      .subscribe({
        next: (res) => {
          this.exams = res;
          this.charge = false;
          alert('Pregunta editada');
          let editModal: any;
          editModal = document.getElementById('editModal');
          editModal.style.display = 'none';
          this.charge = false;
        },
        error: (err) => {
          console.log(err);
          alert('No se pudo editar');
          this.charge = false;
        },
      });
  }
}
