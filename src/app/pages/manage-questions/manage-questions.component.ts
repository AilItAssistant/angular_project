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
  photos: any = {};
  statementChange: any;
  skill: any;

  delete:any = {};
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
    responseG: new FormControl(''),
    responseH: new FormControl(''),
    responseI: new FormControl(''),
    linkA: new FormControl(''),
    linkB: new FormControl(''),
    linkC: new FormControl(''),
    linkD: new FormControl(''),
    linkE: new FormControl(''),
    linkF: new FormControl(''),
    linkG: new FormControl(''),
    linkH: new FormControl(''),
    linkI: new FormControl(''),
    skill: new FormControl(''),
    text: new FormControl(''),
    puntuation: new FormControl(''),
    statement: new FormControl(''),
    correctResponse: new FormControl('')
  });

  questionFormRestart(){
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
      responseG: new FormControl(''),
      responseH: new FormControl(''),
      responseI: new FormControl(''),
      linkA: new FormControl(''),
      linkB: new FormControl(''),
      linkC: new FormControl(''),
      linkD: new FormControl(''),
      linkE: new FormControl(''),
      linkF: new FormControl(''),
      linkG: new FormControl(''),
      linkH: new FormControl(''),
      linkI: new FormControl(''),
      skill: new FormControl(''),
      text: new FormControl(''),
      puntuation: new FormControl(''),
      statement: new FormControl(''),
      correctResponse: new FormControl('')
    });
  };

  filterForm = new FormGroup({
    level: new FormControl(''),
    block: new FormControl(''),
    skill: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargeLevels();
  };

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
      level_id: this.filterForm.value.level ? this.filterForm.value.level : this.edit.oldStatement.level_id,
      skill_id: this.filterForm.value.skill ? this.filterForm.value.skill : this.skill,
    };
    //if(this.filterForm.value.block !== ""){
      this.mode = "questions";
      data.block_id = this.filterForm.value.block
      this.http.post<any>('http://localhost:4000/api/questions/getQuestionsAnswersByBlockId', data, {headers: httpHeaders}).subscribe({
        next: (res) => {
          console.log(res)
          this.questions = res;
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    //} else {
      this.mode = "statements";
      this.http.post<any>('http://localhost:4000/api/statements/levelSkill', data, {headers: httpHeaders}).subscribe({
        next: ( res ) => {
          console.log(res)
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
                if ( res !== undefined ) statement.questions.push(res);
              },
              error: (err) => { alert('Cargar fallo' + err); }
            });
          });
        }
      });
    //};
  };

  cleanFilter(){
  this.filterForm = new FormGroup({
    level: new FormControl(''),
    block: new FormControl(''),
    skill: new FormControl(''),
  });
  };

  closeDeleteModal() {
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'none';
  };

  openDeleteModal(data: any, type: any) {
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'block';
    this.delete.id = data.id;
    this.delete.type = type;
  };

  openEditModal(old: any, type: any) {
    console.log(old)
    this.chargeSkills();
    this.chargeLevels();
    this.edit.type = type;
    if( this.filterForm.value.skill !== "" ) { this.skill = this.filterForm.value.skill; };
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
          responseG: new FormControl(''),
          responseH: new FormControl(''),
          responseI: new FormControl(''),
          linkA: new FormControl(''),
          linkB: new FormControl(''),
          linkC: new FormControl(''),
          linkD: new FormControl(''),
          linkE: new FormControl(''),
          linkF: new FormControl(''),
          linkG: new FormControl(''),
          linkH: new FormControl(''),
          linkI: new FormControl(''),
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
          responseG: new FormControl(''),
          responseH: new FormControl(''),
          responseI: new FormControl(''),
          linkA: new FormControl(''),
          linkB: new FormControl(''),
          linkC: new FormControl(''),
          linkD: new FormControl(''),
          linkE: new FormControl(''),
          linkF: new FormControl(''),
          linkG: new FormControl(''),
          linkH: new FormControl(''),
          linkI: new FormControl(''),
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
          responseG: new FormControl(old[6] && old[6].content !== 'undefined' && old[6].content !== undefined ? old[6].content : ''),
          responseH: new FormControl(old[7] && old[7].content !== 'undefined' && old[7].content !== undefined ? old[7].content : ''),
          responseI: new FormControl(old[8] && old[8].content !== 'undefined' && old[8].content !== undefined ? old[8].content : ''),
          linkA: new FormControl(old[0] && old[0].response !== 'undefined' && old[0].response !== undefined ? old[0].response : ''),
          linkB: new FormControl(old[1] && old[1].response !== 'undefined' && old[1].response !== undefined ? old[1].response : ''),
          linkC: new FormControl(old[2] && old[2].response !== 'undefined' && old[2].response !== undefined ? old[2].response : ''),
          linkD: new FormControl(old[3] && old[3].response !== 'undefined' && old[3].response !== undefined ? old[3].response : ''),
          linkE: new FormControl(old[4] && old[4].response !== 'undefined' && old[4].response !== undefined ? old[4].response : ''),
          linkF: new FormControl(old[5] && old[5].response !== 'undefined' && old[5].response !== undefined ? old[5].response : ''),
          linkG: new FormControl(old[6] && old[6].response !== 'undefined' && old[6].response !== undefined ? old[6].response : ''),
          linkH: new FormControl(old[7] && old[7].response !== 'undefined' && old[7].response !== undefined ? old[7].response : ''),
          linkI: new FormControl(old[8] && old[8].response !== 'undefined' && old[8].response !== undefined ? old[8].response : ''),
          correctResponse: new FormControl('')
        });
        this.edit.oldAnswers = old;
        break;
    };
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
  };

  closeEditModal() {
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
    this.questionFormRestart();
  };

  editQuestions() {
    this.charge = true;
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let changes: any = {};
    let level: any = this.questionForm.value.level;
    let skill: any = this.questionForm.value.skill;
    let puntuation: any = this.questionForm.value.puntuation;
    let statement: any = this.questionForm.value.statement;
    let text: any = this.questionForm.value.text;
    let block: any = this.questionForm.value.block;
    let question: any = this.questionForm.value.question;
    let responseA: any = this.questionForm.value.responseA;
    let responseB: any = this.questionForm.value.responseB;
    let responseC: any = this.questionForm.value.responseC;
    let responseD: any = this.questionForm.value.responseD;
    let responseE: any = this.questionForm.value.responseE;
    let responseF: any = this.questionForm.value.responseF;
    let responseG: any = this.questionForm.value.responseG;
    let responseH: any = this.questionForm.value.responseH;
    let responseI: any = this.questionForm.value.responseI;

    switch (this.edit.type) {
      case "statement":
        changes.id = this.edit.oldStatement.id;
        if(level && level !== null && level !== undefined && level !== "" && level !== this.edit.oldStatement.level_id){
          changes.level_id = level;
        } else {changes.level_id = null;};
        if(skill && skill !== null && skill !== undefined && skill !== "" && skill !== this.edit.oldStatement.skill_id){
          changes.skill_id = skill;
        } else {changes.skill_id = null;};
        if(puntuation && puntuation !== null && puntuation !== undefined && puntuation !== "" && puntuation !== this.edit.oldStatement.score){
          changes.score = puntuation;
        } else {changes.score = null;};
        if(statement && statement !== null && statement !== undefined && statement !== "" && statement !== this.edit.oldStatement.content){
          changes.content = statement;
        } else {changes.content = null;};
        if(text && text !== null && text !== undefined && text !== "" && text !== this.edit.oldStatement.text){
          changes.text = text;
        } else {changes.text = null;};
        if(this.photos.statement && this.photos.statement !== null && this.photos.statement !== undefined && this.photos.statement !== ""){
          changes.photo = this.photos.statement;
        } else {changes.photo = null;};
        this.http.put<any>('http://localhost:4000/api/statements/edit', changes, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.charge = false;
            alert('Enunciado editado');
            this.closeEditModal();
            changes = {};
            this.chargeStatements();
            this.questionFormRestart();
            this.edit = {};
            this.photos = {};
            console.log(this.photos.statement)
          },
          error: (err) => {
            alert('No se pudo editar' + err);
            this.charge = false;
          },
        });
        break;
      case "question":
        changes = {};
        changes.id = this.edit.oldQuestion.id;
        if(statement && statement !== null && statement !== undefined && statement !== ""){
          changes.statement_id = statement;
        } else { changes.statement_id = null};
        if(block && block !== null && block !== undefined && block !== "" && block !== this.edit.oldQuestion.block_id){
          changes.block_id = block;
        } else { changes.block_id = null};
        if(puntuation && puntuation !== null && puntuation !== undefined && puntuation !== "" && puntuation !== this.edit.oldQuestion.puntuation){
          changes.puntuation = puntuation;
        } else { changes.puntuation = null};
        if(question && question !== null && question !== undefined && question !== "" && question !== this.edit.oldQuestion.content){
          changes.question = question;
        } else { changes.question = null};
        if(this.photos.question && this.photos.question !== null && this.photos.question !== undefined && this.photos.question !== ""){
          changes.photo = this.photos.question;
        } else { changes.photo = null};
        console.log(changes);
        this.http.put<any>('http://localhost:4000/api/questions/edit', changes, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
            this.charge = false;
            alert('Pregunta editada');
            this.closeEditModal();
            this.questionFormRestart();
            this.edit = {};
            this.photos = {};
          },
          error: (err) => {
            alert('No se pudo editar' + err);
            this.charge = false;
          },
        });
        break;
      case "answers":
        changes = {};
        let correct: any = this.questionForm.value.correctResponse;
        changes.responseA = {};
        changes.responseB = {};
        changes.responseC = {};
        changes.responseD = {};
        changes.responseE = {};
        changes.responseF = {};
        changes.responseG = {};
        changes.responseH = {};
        changes.responseI = {};
        let separatedAnswers: any = {};

        this.edit.oldAnswers.forEach((answer: any) => {
          if(answer.letter === "A"){separatedAnswers.answerA = answer};
          if(answer.letter === "B"){separatedAnswers.answerB = answer};
          if(answer.letter === "C"){separatedAnswers.answerC = answer};
          if(answer.letter === "D"){separatedAnswers.answerD = answer};
          if(answer.letter === "E"){separatedAnswers.answerE = answer};
          if(answer.letter === "F"){separatedAnswers.answerF = answer};
          if(answer.letter === "G"){separatedAnswers.answerG = answer};
          if(answer.letter === "H"){separatedAnswers.answerH = answer};
          if(answer.letter === "I"){separatedAnswers.answerI = answer};
        });
        if(correct && correct !== undefined && correct !== null){
          switch (correct) {
            case "A":
              if(separatedAnswers.answerA.is_correct !== 1){
                changes.responseA.is_correct = 1;
                changes.responseA.content = null;
                changes.responseA.photo = null;
                changes.responseA.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "A"){
                    changes.responseA.id = ans.id;
                  }
                });
              };
              break;
            case "B":
              if(separatedAnswers.answerB.is_correct !== 1){
                changes.responseB.is_correct = 1;
                changes.responseB.content = null;
                changes.responseB.photo = null;
                changes.responseB.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "B"){
                    changes.responseB.id = ans.id;
                  }
                });
              }
              break;
            case "C":
              if(separatedAnswers.answerC.is_correct !== 1){
                changes.responseC.is_correct = 1;
                changes.responseC.content = null;
                changes.responseC.photo = null;
                changes.responseC.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "C"){
                    changes.responseC.id = ans.id;
                  }
                });
              }
              break;
            case "D":
              if(separatedAnswers.answerD && separatedAnswers.answerD.is_correct !== 1){
                changes.responseD.is_correct = 1;
                changes.responseD.content = null;
                changes.responseD.photo = null;
                changes.responseD.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "D"){
                    changes.responseD.id = ans.id;
                  }
                });
              }
              break;
            case "E":
              if(separatedAnswers.answerE &&separatedAnswers.answerE.is_correct !== 1){
                changes.responseE.is_correct = 1;
                changes.responseE.content = null;
                changes.responseE.photo = null;
                changes.responsee.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "E"){
                    changes.responseE.id = ans.id;
                  }
                });
              }
              break;
            case "F":
              if(separatedAnswers.answerF &&separatedAnswers.answerF.is_correct !== 1){
                changes.responseF.is_correct = 1;
                changes.responseF.content = null;
                changes.responseF.photo = null;
                changes.responseF.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "F"){
                    changes.responseF.id = ans.id;
                  }
                });
              }
              break;
            case "G":
              if(separatedAnswers.answerG &&separatedAnswers.answerG.is_correct !== 1){
                changes.responseG.is_correct = 1;
                changes.responseG.content = null;
                changes.responseG.photo = null;
                changes.responseG.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "G"){
                    changes.responseF.id = ans.id;
                  }
                });
              }
              break;
            case "H":
              if(separatedAnswers.answerH &&separatedAnswers.answerH.is_correct !== 1){
                changes.responseH.is_correct = 1;
                changes.responseH.content = null;
                changes.responseH.photo = null;
                changes.responseH.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "H"){
                    changes.responseH.id = ans.id;
                  }
                });
              }
              break;
            case "I":
              if(separatedAnswers.answerI &&separatedAnswers.answerI.is_correct !== 1){
                changes.responseI.is_correct = 1;
                changes.responseI.content = null;
                changes.responseI.photo = null;
                changes.responseI.link = null;
                this.edit.oldAnswers.forEach( (ans: any) => {
                  if(ans.letter === "I"){
                    changes.responseI.id = ans.id;
                  }
                });
              }
              break;
          };
        };

        if(responseA && responseA !== null && responseA !== undefined && responseA !== "" && responseA !== separatedAnswers.answerA.content){
          changes.responseA.content = responseA;
          changes.responseA.photo = null;
          changes.responseA.link = null;
          if(changes.responseA.is_correct !== 0 && changes.responseA.is_correct !== 1) {changes.responseA.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "A"){
              changes.responseA.id = ans.id;
            }
          });
        };
        if(responseB && responseB !== null && responseB !== undefined && responseB !== "" && responseB !== separatedAnswers.answerB.content){
          changes.responseB.content = responseB;
          changes.responseB.photo = null;
          changes.responseB.link = null;
          if(changes.responseB.is_correct !== 0 && changes.responseB.is_correct !== 1) {changes.responseB.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "B"){
              changes.responseB.id = ans.id;
            }
          });
        };
        if(responseC && responseC !== null && responseC !== undefined && responseC !== "" && responseC !== separatedAnswers.answerC.content){
          changes.responseC.content = responseC;
          changes.responseC.photo = null;
          changes.responseC.link = null;
          if(changes.responseC.is_correct !== 0 && changes.responseC.is_correct !== 1) {changes.responseC.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "C"){
              changes.responseC.id = ans.id;
            }
          });
        };
        if(responseD && responseD !== null && responseD !== undefined && responseD !== "" && responseD !== separatedAnswers.answerD.content){
          changes.responseD.content = responseD;
          changes.responseD.photo = null;
          changes.responseD.link = null;
          if(changes.responseD.is_correct !== 0 && changes.responseD.is_correct !== 1) {changes.responseD.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "D"){
              changes.responseD.id = ans.id;
            }
          });
        };
        if(responseE && responseE !== null && responseE !== undefined && responseE !== "" && responseE !== separatedAnswers.answerE.content){
          changes.responseE.content = responseE;
          changes.responseE.photo = null;
          changes.responseE.link = null;
          if(changes.responseE.is_correct !== 0 && changes.responseE.is_correct !== 1) {changes.responseE.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "E"){
              changes.responseE.id = ans.id;
            }
          });
        };
        if(responseF && responseF !== null && responseF !== undefined && responseF !== "" && responseF !== separatedAnswers.answerF.content){
          changes.responseF.content = responseF;
          changes.responseF.photo = null;
          changes.responseF.link = null;
          if(changes.responseF.is_correct !== 0 && changes.responseF.is_correct !== 1) {changes.responseF.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "F"){
              changes.responseF.id = ans.id;
            }
          });
        };
        if(responseG && responseG !== null && responseG !== undefined && responseG !== "" && responseG !== separatedAnswers.answerG.content){
          changes.responseG.content = responseG;
          changes.responseG.photo = null;
          changes.responseG.link = null;
          if(changes.responseG.is_correct !== 0 && changes.responseG.is_correct !== 1) {changes.responseG.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "G"){
              changes.responseG.id = ans.id;
            }
          });
        };
        if(responseH && responseH !== null && responseH !== undefined && responseH !== "" && responseH !== separatedAnswers.answerH.content){
          changes.responseH.content = responseH;
          changes.responseH.photo = null;
          changes.responseH.link = null;
          if(changes.responseH.is_correct !== 0 && changes.responseH.is_correct !== 1) {changes.responseH.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "H"){
              changes.responseH.id = ans.id;
            }
          });
        };
        if(responseI && responseI !== null && responseI !== undefined && responseI !== "" && responseI !== separatedAnswers.answerI.content){
          changes.responseI.content = responseI;
          changes.responseI.photo = null;
          changes.responseI.link = null;
          if(changes.responseI.is_correct !== 0 && changes.responseI.is_correct !== 1) {changes.responseI.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "I"){
              changes.responseI.id = ans.id;
            }
          });
        };

        if(this.photos.A && this.photos.A !== null && this.photos.A !== undefined && this.photos.A !== ""){
          changes.responseA.photo = this.photos.A;
          changes.responseA.link = null;
          if(changes.responseA.is_correct !== 0 && changes.responseA.is_correct !== 1) {changes.responseA.is_correct = null};
          if(!changes.responseA.content && changes.responseA.content === undefined) {changes.responseA.content = null;};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "A"){
              changes.responseA.id = ans.id;
            }
          });
        };
        if(this.photos.B && this.photos.B !== null && this.photos.B !== undefined && this.photos.B !== ""){
          changes.responseB.photo = this.photos.B;
          changes.responseB.link = null;
          if(changes.responseB.is_correct !== 0 && changes.responseB.is_correct !== 1) {changes.responseB.is_correct = null};
          if(!changes.responseB.content && changes.responseB.content === undefined) {changes.responseB.content = null;};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "B"){
              changes.responseB.id = ans.id;
            }
          });
        };
        if(this.photos.C && this.photos.C !== null && this.photos.C !== undefined && this.photos.C !== ""){
          changes.responseC.photo = this.photos.C;
          changes.responseC.link = null;
          if(!changes.responseC.content && changes.responseC.content === undefined) {changes.responseC.content = null;};
          if(changes.responseC.is_correct !== 0 && changes.responseC.is_correct !== 1) {changes.responseC.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "C"){
              changes.responseC.id = ans.id;
            }
          });
        };
        if(this.photos.D && this.photos.D !== null && this.photos.D !== undefined && this.photos.D !== ""){
          changes.responseD.photo = this.photos.D;
          changes.responseDlink = null;
          if(!changes.responseD.content && changes.responseD.content === undefined) {changes.responseD.content = null;};
          if(changes.responseD.is_correct !== 0 && changes.responseD.is_correct !== 1) {changes.responseD.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "D"){
              changes.responseD.id = ans.id;
            }
          });
        };
        if(this.photos.E && this.photos.E !== null && this.photos.E !== undefined && this.photos.E !== ""){
          changes.responseE.photo = this.photos.E;
          changes.responseE.link = null;
          if(!changes.responseE.content && changes.responseE.content === undefined) {changes.responseE.content = null;};
          if(changes.responseE.is_correct !== 0 && changes.responseE.is_correct !== 1) {changes.responseE.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "E"){
              changes.responseE.id = ans.id;
            }
          });
        };
        if(this.photos.F && this.photos.F !== null && this.photos.F !== undefined && this.photos.F !== ""){
          changes.responseF.photo = this.photos.F;
          changes.responseF.link = null;
          if(!changes.responseF.content && changes.responseF.content === undefined) {changes.responseF.content = null;};
          if(changes.responseF.is_correct !== 0 && changes.responseF.is_correct !== 1) {changes.responseF.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "F"){
              changes.responseF.id = ans.id;
            }
          });
        };
        if(this.photos.G && this.photos.G !== null && this.photos.G !== undefined && this.photos.G !== ""){
          changes.responseG.photo = this.photos.G;
          changes.responseG.link = null;
          if(!changes.responseG.content && changes.responseG.content === undefined) {changes.responseG.content = null;};
          if(changes.responseG.is_correct !== 0 && changes.responseG.is_correct !== 1) {changes.responseG.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "G"){
              changes.responseG.id = ans.id;
            }
          });
        };
        if(this.photos.H && this.photos.H !== null && this.photos.H !== undefined && this.photos.H !== ""){
          changes.responseH.photo = this.photos.H;
          changes.responseH.link = null;
          if(!changes.responseH.content && changes.responseH.content === undefined) {changes.responseH.content = null;};
          if(changes.responseH.is_correct !== 0 && changes.responseH.is_correct !== 1) {changes.responseH.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "H"){
              changes.responseH.id = ans.id;
            }
          });
        };
        if(this.photos.I && this.photos.I !== null && this.photos.I !== undefined && this.photos.I !== ""){
          changes.responseI.photo = this.photos.I;
          changes.responseI.link = null;
          if(!changes.responseI.content && changes.responseI.content === undefined) {changes.responseI.content = null;};
          if(changes.responseI.is_correct !== 0 && changes.responseI.is_correct !== 1) {changes.responseI.is_correct = null};
          this.edit.oldAnswers.forEach( (ans: any) => {
            if(ans.letter === "I"){
              changes.responseI.id = ans.id;
            }
          });
        };

        if( this.questionForm.value.linkA && this.questionForm.value.linkA !== separatedAnswers.answerA.response ) {
          changes.responseA.link = this.questionForm.value.linkA;
          if(!changes.responseA.photo) { changes.responseA.photo === null };
          if(!changes.responseA.content && changes.responseA.content === undefined) {changes.responseA.content = null;};
          if(changes.responseA.is_correct !== 0 && changes.responseA.is_correct !== 1) { changes.responseA.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "A" ){
              changes.responseA.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkB && this.questionForm.value.linkB !== separatedAnswers.answerB.response ) {
          changes.responseB.link = this.questionForm.value.linkB;
          if(!changes.responseB.photo) { changes.responseB.photo === null };
          if(!changes.responseB || changes.responseB === undefined) { changes.responseB.content = null; };
          if(changes.responseB.is_correct !== 0 && changes.responseB.is_correct !== 1) { changes.responseB.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "B" ){
              changes.responseB.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkC && this.questionForm.value.linkC !== separatedAnswers.answerC.response ) {
          changes.responseC.link = this.questionForm.value.linkC;
          if(!changes.responseC.photo) { changes.responseC.photo === null };
          if(!changes.responseC || changes.responseC === undefined) { changes.responseC.content = null; };
          if(changes.responseC.is_correct !== 0 && changes.responseC.is_correct !== 1) { changes.responseC.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "C" ){
              changes.responseC.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkD && this.questionForm.value.linkD !== separatedAnswers.answerD.response ) {
          changes.responseD.link = this.questionForm.value.linkD;
          if(!changes.responseD.photo) { changes.responseD.photo === null };
          if(!changes.responseD || changes.responseD === undefined) { changes.responseD.content = null; };
          if(changes.responseD.is_correct !== 0 && changes.responseD.is_correct !== 1) { changes.responseD.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "D" ){
              changes.responseD.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkE && this.questionForm.value.linkE !== separatedAnswers.answerE.response ) {
          changes.responseE.link = this.questionForm.value.linkE;
          if(!changes.responseE.photo) { changes.responseE.photo === null };
          if(!changes.responseE || changes.responseE === undefined) { changes.responseE.content = null; };
          if(changes.responseE.is_correct !== 0 && changes.responseE.is_correct !== 1) { changes.responseE.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "E" ){
              changes.responseE.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkF && this.questionForm.value.linkF !== separatedAnswers.answerF.response ) {
          changes.responseF.link = this.questionForm.value.linkF;
          if(!changes.responseF.photo) { changes.responseF.photo === null };
          if(!changes.responseF || changes.responseF === undefined) { changes.responseF.content = null; };
          if(changes.responseF.is_correct !== 0 && changes.responseF.is_correct !== 1) { changes.responseF.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "F" ){
              changes.responseF.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkG && this.questionForm.value.linkG !== separatedAnswers.answerG.response ) {
          changes.responseG.link = this.questionForm.value.linkG;
          if(!changes.responseG.photo) { changes.responseG.photo === null };
          if(!changes.responseG || changes.responseG === undefined) { changes.responseG.content = null; };
          if(changes.responseG.is_correct !== 0 && changes.responseG.is_correct !== 1) { changes.responseG.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "G" ){
              changes.responseG.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkH && this.questionForm.value.linkH !== separatedAnswers.answerH.response ) {
          changes.responseH.link = this.questionForm.value.linkH;
          if(!changes.responseH.photo) { changes.responseH.photo === null };
          if(!changes.responseH || changes.responseH === undefined) { changes.responseH.content = null; };
          if(changes.responseH.is_correct !== 0 && changes.responseH.is_correct !== 1) { changes.responseH.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "H" ){
              changes.responseH.id = ans.id;
            }
          });
        };
        if( this.questionForm.value.linkI && this.questionForm.value.linkI !== separatedAnswers.answerI.response ) {
          changes.responseI.link = this.questionForm.value.linkI;
          if(!changes.responseI.photo) { changes.responseI.photo === null };
          if(!changes.responseI || changes.responseI === undefined) { changes.responseI.content = null; };
          if(changes.responseI.is_correct !== 0 && changes.responseI.is_correct !== 1) { changes.responseI.is_correct = null };
          this.edit.oldAnswers.forEach( ( ans: any ) => {
            if ( ans.letter === "I" ){
              changes.responseI.id = ans.id;
            }
          });
        };
        for (let change in changes) {
          if(Object.keys(changes[change]).length !== 0 ){
            console.log(changes[change]);
            let edit: any = changes[change];
            this.http.put<any>('http://localhost:4000/api/answers/edit', edit, {headers: httpHeaders}).subscribe({
              next: (res) => {
                this.chargeStatements();
                this.charge = false;
                alert('Respuesta editada');
                this.closeEditModal();
                this.questionFormRestart();
                this.edit = {};
                this.photos = {};
              },
              error: (err) => {
                alert('No se pudo editar' + err);
                this.charge = false;
              },
            });
          }
          };
        break;
    };
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

  statusChange(input: any, type: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let status: any = {};
    switch (type) {
      case "answer":
        console.log(input);
        status = {
          id: input.id,
          status: input.status
        };
        this.http.put<any>('http://localhost:4000/api/answers/status', status, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
          },
          error: (err) => {
            alert('No se pudo editar' + err);
          },
        });
        break;
      case "question":
        console.log(input.id);
        status = {
          id: input.id,
          status: input.status
        };
        this.http.put<any>('http://localhost:4000/api/questions/status', status, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
          },
          error: (err) => {
            alert('No se pudo editar' + err);
          },
        });
        break;
      case "statement":
        console.log(input.id);
        status = {
          id: input.id,
          status: input.status
        };
        this.http.put<any>('http://localhost:4000/api/statements/status', status, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
          },
          error: (err) => {
            alert('No se pudo editar' + err);
          },
        });
        break;
    };
  };

  deleteQuestion(){
    this.charge = true;
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let id: any = {id: this.delete.id};
    switch (this.delete.type) {
      case "statement":
        this.http.put<any>('http://localhost:4000/api/statements/delete', id, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.charge = false;
            this.chargeStatements();
            alert('Enunciado borrado');
            this.closeDeleteModal();
          },
          error: (err) => {
            alert('No se pudo borrar' + err);
            this.charge = false;
          },
        });
        break;
      case "question":
        this.http.put<any>('http://localhost:4000/api/questions/delete', id, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.charge = false;
            this.chargeStatements();
            alert('Pregunta borrada');
            this.closeDeleteModal();
          },
          error: (err) => {
            alert('No se pudo borrar' + err);
            this.charge = false;
          },
        });
        break;
        case "answer":
          this.http.put<any>('http://localhost:4000/api/answers/delete', id, {headers: httpHeaders}).subscribe({
            next: (res) => {
              this.charge = false;
              this.chargeStatements();
              alert('Respuesta borrada');
              this.closeDeleteModal();
            },
            error: (err) => {
              alert('No se pudo borrar' + err);
              this.charge = false;
            },
          });
        break;
    }
  };

  deletePhoto(id: any, type: any){
    console.log(id);
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    switch (type) {
      case "statement":
        let statementId: any = { id: id };
        this.http.put<any>('http://localhost:4000/api/statements/deleteImage', statementId, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
          },
          error: (err) => {
            alert('No se pudo borrar' + err);
            this.charge = false;
          },
        });
        break;
      case "question":
        let questionId: any = {id: id};
        this.http.put<any>('http://localhost:4000/api/questions/deleteImage', questionId, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
          },
          error: (err) => {
            alert('No se pudo borrar' + err);
            this.charge = false;
          },
        });
        break;
      case "answer":
        let answerId: any = {id: id};
        this.http.put<any>('http://localhost:4000/api/answers/deleteImage', answerId, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.chargeStatements();
          },
          error: (err) => {
            alert('No se pudo borrar' + err);
            this.charge = false;
          },
        });
        break;
    }
  };

};