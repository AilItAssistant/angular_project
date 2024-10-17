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
  photos: any;
  statementChange: any;

  edit: any = {};
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
    responseF: new FormControl(''),
    skill: new FormControl(''),
    text: new FormControl(''),
    puntuation: new FormControl(''),
    statement: new FormControl(''),
    correctResponse: new FormControl('')
  });

  filterForm = new FormGroup({
    level: new FormControl(''),
    block: new FormControl(''),
    skill: new FormControl(''),
  });

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
            statement.questions = [];
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
          this.statements.forEach(( statement: any ) => {
            let data: any = { statement_id: statement.id };
            this.http.post<any>('http://localhost:4000/api/questions/getQuestionsAnswers', data, {headers: httpHeaders}).subscribe({
              next: ( res ) => {
                console.log(res)
                if ( res !== undefined ) statement.questions.push(res);
              },
              error: (err) => { alert('Cargar fallo' + err); }
            });
          });
        }
      });
    };
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
    
  }

  openEditModal(old: any, type: any) {
    this.chargeSkills();
    this.chargeLevels();

    console.log(old)
    this.edit.type = type;
    switch (type) {
      case "statement":
        this.edit.oldStatement = old;
        this.questionForm = new FormGroup({
          level: new FormControl(old.level_id),
          skill: new FormControl(old.skill_id),
          puntuation: new FormControl(old.score),
          statement: new FormControl(old.content),
          text: new FormControl(old.text),
          block: new FormControl(''),
          question: new FormControl(''),
          responseA: new FormControl(''),
          responseB: new FormControl(''),
          responseC: new FormControl(''),
          responseD: new FormControl(''),
          responseE: new FormControl(''),
          responseF: new FormControl(''),
          correctResponse: new FormControl('')
        });
        break;
      case "question":
        this.edit.oldQuestion = old;
        this.questionForm = new FormGroup({
          level: new FormControl(''),
          skill: new FormControl(''),
          puntuation: new FormControl(old.puntuation),
          statement: new FormControl(''),
          text: new FormControl(old.text),
          block: new FormControl(old.block_id),
          question: new FormControl(old.content),
          responseA: new FormControl(''),
          responseB: new FormControl(''),
          responseC: new FormControl(''),
          responseD: new FormControl(''),
          responseE: new FormControl(''),
          responseF: new FormControl(''),
          correctResponse: new FormControl('')
        });
        break;
      case "answers":
        this.questionForm = new FormGroup({
          level: new FormControl(''),
          skill: new FormControl(''),
          puntuation: new FormControl(''),
          statement: new FormControl(''),
          text: new FormControl(''),
          block: new FormControl(''),
          question: new FormControl(''),
          responseA: new FormControl(old[0] ? old[0].content : ''),
          responseB: new FormControl(old[1] ? old[1].content : ''),
          responseC: new FormControl(old[2] ? old[2].content : ''),
          responseD: new FormControl(old[3] && old[3].content !== 'undefined' && old[3].content !== undefined ? old[3].content : ''),
          responseE: new FormControl(old[4] && old[4].content !== 'undefined' && old[4].content !== undefined ? old[4].content : ''),
          responseF: new FormControl(old[5] && old[5].content !== 'undefined' && old[5].content !== undefined ? old[5].content : ''),
          correctResponse: new FormControl('')
        });

        this.edit.oldAnswers = old;
        break;
    };
    console.log(this.edit)
    console.log(this.questionForm.value)
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
  };

  closeEditModal() {
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
    this.questionForm = new FormGroup({
      level: new FormControl(''),
      block: new FormControl(''),
      question: new FormControl(''),
      responseA: new FormControl(''),
      responseB: new FormControl(''),
      responseC: new FormControl(''),
      responseD: new FormControl(''),
      responseE: new FormControl(''),
      responseF: new FormControl(''),
      skill: new FormControl(''),
      text: new FormControl(''),
      puntuation: new FormControl(''),
      statement: new FormControl(''),
      correctResponse: new FormControl('')
    });
  }

  editQuestions() {
    this.charge = true;
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let changes: any;

    switch (this.edit.type) {
      case "statement":

      /*
      this.questionForm.value.level_id
      this.questionForm.value.skill_id
      this.questionForm.value.puntuation
      this.questionForm.value.statement
      this.questionForm.value.text
      this.photos.statement
      */ 

        this.http.put<any>('http://localhost:4000/api/statements/edit', changes, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
            this.charge = false;
            alert('Enunciado editada');
    
            this.closeEditModal();
          },
          error: (err) => {
            alert('No se pudo editar' + err);
            this.charge = false;
          },
        });
        break;
      case "question":

        /*
        this.questionForm.value.statement
        this.questionForm.value.block_id
        this.questionForm.value.puntuation
        this.questionForm.value.question
        this.questionForm.value.text
        this.photos.question
        */ 

        this.http.put<any>('http://localhost:4000/api/questions/edit', changes, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
            this.charge = false;
            alert('Pregunta editada');
    
            this.closeEditModal();
          },
          error: (err) => {
            alert('No se pudo editar' + err);
            this.charge = false;
          },
        });
        break;
      case "answers":

        /*
        this.questionForm.value.level_id
        this.questionForm.value.skill_id
        this.questionForm.value.puntuation
        this.questionForm.value.statement
        this.questionForm.value.text
        this.photos.statement
        */ 

        this.http.put<any>('http://localhost:4000/api/answers/edit', changes, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
            this.charge = false;
            alert('Respuesta editada');
    
            this.closeEditModal();
          },
          error: (err) => {
            alert('No se pudo editar' + err);
            this.charge = false;
          },
        });
        break;
    }

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
  };

  photoConvert(event: any, type: any){
    let file: any = event.target.files[0];
    let url: any = file;
    const fr: any = new FileReader();
    fr.readAsDataURL(url)
    switch (type) {
      case "statement":
        fr.onload = () => {
          this.photos.statement = fr.result as string;
        };
        break;
      case "question":
        fr.onload = () => {
          this.photos.question = fr.result as string;
        };
        break;
      case "A":
        fr.onload = () => {
          this.photos.A = fr.result as string;
        };
        break;
      case "B":
        fr.onload = () => {
          this.photos.B = fr.result as string;
        };
        break;
      case "C":
        fr.onload = () => {
          this.photos.C = fr.result as string;
        };
        break;
      case "D":
        fr.onload = () => {
          this.photos.D = fr.result as string;
        };
        break;
      case "E":
        fr.onload = () => {
          this.photos.E = fr.result as string;
        };
        break;
      case "F":
        fr.onload = () => {
          this.photos.F = fr.result as string;
        };
        break;
    };
  };

  chargeStatementsList(){
    if( this.questionForm.value.skill !== "" && this.questionForm.value.level !== "" ){
      let search: any = {
        skill_id: this.questionForm.value.skill,
        level_id: this.questionForm.value.level
      }
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      this.http.post<any>('http://localhost:4000/api/statements/levelSkill', search, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.statementChange = res;
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
  };

}
