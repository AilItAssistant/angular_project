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
  questions: any;
  statements: any;
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
  mode: any;

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

  filterForm = new FormGroup({
    level: new FormControl(''),
    block: new FormControl(''),
    skill: new FormControl(''),
  });

  modalStatement: any;
  modalResponseA: any;
  modalResponseB: any;
  modalResponseC: any;
  modalResponseD: any;
  modalResponseE: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargeLevels();
  }

  chargeLevels() {
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/levels/active', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.levels = res;
        this.filterForm.patchValue({
          skill: '', 
          block: ''  
        });
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };
  
  chargeSkills(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let id: any = {
      level_id: this.filterForm.value.level
    }
    this.http.post<any>('http://localhost:4000/api/skills/skillsId', id, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.skills = res;
        this.filterForm.patchValue({
          block: ''  
        });;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  chargeBlocks(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let id: any = {
      skill_id: this.filterForm.value.skill
    }
    this.http.post<any>('http://localhost:4000/api/blocks/blocksId', id, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.blocks = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  chargeStatements(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let data: any = {
      level_id: this.filterForm.value.level,
      skill_id: this.filterForm.value.skill,
    };
    if(this.filterForm.value.block !== ""){
      data.block_id = this.filterForm.value.block
      this.http.post<any>('http://localhost:4000/api/statements/levelSkillBlock', data, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.questions = res[0];
          this.mode = "questions";
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    } else { 

      this.http.post<any>('http://localhost:4000/api/statements/levelSkill', data, {headers: httpHeaders}).subscribe({
        next: ( res ) => {
          this.statements = res;
          this.statements.forEach( ( statement: any ) => {
            if(statement.photo_id !== null){
              let id: any = { id: statement.photo_id };
              this.http.post<any>('http://localhost:4000/api/photo/IdActive', id, {headers: httpHeaders}).subscribe({
                next: (res) => { statement.photo_id = res[0].base64_data; },
                error: (err) => { alert('Cargar fallo' + err); },
              });
            };
          });  
        },
        error: ( err ) => {alert('Cargar fallo' + err);},
        complete: () => {
          let st: any = 1;
          this.statements.forEach((statement: any) => {  /** forEach st */
            let questionsIds = statement.questionsId.split(",");
            statement.questions = [];
            let q: any = 1;
            questionsIds.forEach((questionId: any) => {   /** forEach q */
              let id: any = { id: questionId };
              this.http.put<any>('http://localhost:4000/api/questions/getById', id, {headers: httpHeaders}).subscribe({
                next: (res) => { 
                  statement.questions.push(res[0]);
                },
                error: (err) => {alert('Cargar fallo' + err);},
                complete: () => {
                  if ( statement.questionsId.split(",").length === q && this.statements.length === st ) {
                    console.log("works")
                    this.addAnswers();
                  };

                  console.log("st" + " " + st + " " + this.statements.length)
                  if ( this.statements.length === st ) {
                    console.log("st true")
                    st = 0 ;
                  };
                  console.log("q" + " " + q + " " + statement.questionsId.split(",").length)
                  if ( statement.questionsId.split(",").length === q ) { 
                    console.log("q true")
                    q = 0; 
                  };
                  st++;
                  q++;
                }
              });
            })
          });
        }
      });

      
    };
  };

  addAnswers(){
    console.log("answers")
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.statements.forEach((statement:any) => {
      statement.questions.forEach((question: any) => {
        let ids: any = question.answers_ids.split(",");
        //question.answers = [];
        ids.forEach( (id: any) => {
          this.http.put<any>('http://localhost:4000/api/answers/getById', id, {headers: httpHeaders}).subscribe({
            next: (res) => { 
              question.answers.push(res[0]);
            },
            error: (err) => {alert('Cargar fallo' + err);},
          });
        });
      });
    });
  };
  
  infoResult(){
    console.log(this.statements)
  };

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
          alert('No se pudo editar' + err);
          this.charge = false;
        },
      });
  }
}
