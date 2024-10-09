import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { response } from 'express';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  skillsStatement: any;
  skillsQuestion: any;
  blocks: any;
  questionPhoto: any;
  statementPhoto: any;
  validatedQuestion: boolean = false;
  validatedStatement: boolean = false;
  
  modalForm = new FormGroup({
    statement: new FormControl(""),
    skill: new FormControl(""),
    level: new FormControl(""),
  });
  
  questionForm = new FormGroup({
    level: new FormControl(""),
    skill: new FormControl(""),
    block: new FormControl(""),
    question: new FormControl(""),
    responsesMode: new FormControl(""),
    puntuation: new FormControl(""),
    responseA: new FormControl(""),
    photoA: new FormControl(),
    responseB: new FormControl(""),
    photoB: new FormControl(),
    responseC: new FormControl(""),
    photoC: new FormControl(),
    responseD: new FormControl(""),
    photoD: new FormControl(),
    responseE: new FormControl(""),
    photoE: new FormControl(),
    responseF: new FormControl(""),
    photoF: new FormControl(),
    correctResponse: new FormControl(""),
    photoQuestion: new FormControl(),
  });
  
  statementForm = new FormGroup({
    level: new FormControl(""),
    skill: new FormControl(""),
    statement: new FormControl(""),
    puntuation: new FormControl(""),
    text: new FormControl(""),
    statementPhoto: new FormControl(),
  })

  ngOnInit() {
    this.loadLevels();
  };

  loadLevels(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/levels/active', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.levels = res;
      },
        error: (err) => {
          alert('Cargar fallo' + err);
      },
    });
  };

  removeResponse(){
    if(this.numberResponses > 3){
      this.numberResponses--;
    };
  };

  addResponse(){
    if(this.numberResponses < 6){
      this.numberResponses++;
    };
  };

  /* */

  sendQuestion(){
    //this.validateQuestion();
    if ( true/*this.validatedQuestion*/) {
      let responses: any;

      if( this.questionForm.value.responsesMode === "photo" ){
        responses = [
          {
            photo_id: this.questionForm.value.photoA,
            letter: "A",
            is_correct: false
          },
          {
            photo_id: this.questionForm.value.photoB,
            letter: "B",
            is_correct: false
          },
          {
            photo_id: this.questionForm.value.photoC,
            letter: "C",
            is_correct: false
          },
        ];
        if(this.questionForm.value.photoD !== "" && this.questionForm.value.photoD !== null){
          responses.push({
            photo_id: this.questionForm.value.photoD,
            letter: "D",
            is_correct: false
          })
        };
        if(this.questionForm.value.photoE !== "" && this.questionForm.value.photoE !== null){
          responses.push({
            photo_id: this.questionForm.value.photoE,
            letter: "E",
            is_correct: false
          })
        };
        if(this.questionForm.value.photoF !== "" && this.questionForm.value.photoF !== null){
          responses.push({
            photo_id: this.questionForm.value.photoF,
            letter: "F",
            is_correct: false
          })
        };
      } else if ( this.questionForm.value.responsesMode === "phrase" ) {
        responses = [
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
        ];
        if(this.questionForm.value.responseD !== "" && this.questionForm.value.responseD !== null){
          responses.push({
            content: this.questionForm.value.responseD,
            letter: "D",
            is_correct: false
          })
        };
        if(this.questionForm.value.responseE !== "" && this.questionForm.value.responseE !== null){
          responses.push({
            content: this.questionForm.value.responseE,
            letter: "E",
            is_correct: false
          })
        };
        if(this.questionForm.value.responseF !== "" && this.questionForm.value.responseF !== null){
          responses.push({
            content: this.questionForm.value.responseF,
            letter: "F",
            is_correct: false
          })
        };
      };
      responses.forEach((element: any) => {
        if(this.questionForm.value.correctResponse === element.letter){
          element.is_correct = true
        };
      });
      let add: any = {
        question: this.questionForm.value.question,
        responses: responses,
        typeAnswers: this.questionForm.value.responsesMode,
        puntuation: this.questionForm.value.puntuation,
      };
      if ( this.selectedStatement ) {
        add.skill_id = this.selectedStatement.skill_id;
        add.level_id = this.selectedStatement.level_id;
        add.statement_id = this.selectedStatement.id;
      } else {
        add.skill_id = this.questionForm.value.skill;
        add.level_id = this.questionForm.value.level;
        add.statement_id = "";
      };
      if ( this.questionForm.value.photoQuestion ) { add.photoQuestion = this.questionForm.value.photoQuestion }
      if ( this.questionForm.value.block ) { add.block = this.questionForm.value.block }
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      console.log(add);
      this.http.post<any>('http://localhost:4000/api/questions/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.selectStatement('');
          let form: any = document.getElementById("questionForm");
          form.reset();
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
  };

  sendStatement(){
    this.validateStatement();
    if (this.validatedStatement) {
      let add: any = {
        level: this.statementForm.value.level,
        skills: this.statementForm.value.skill,
        statement: this.statementForm.value.statement,
        puntuation: this.statementForm.value.puntuation,
        text: this.statementForm.value.text,
        photo: this.statementPhoto
      };
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      this.http.post<any>('http://localhost:4000/api/statements/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          console.log(res)
          let form: any = document.getElementById("questionForm");
          form.reset();
          this.selectStatement(res);
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
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
  
  chargeStatements(){
    if( this.modalForm.value.skill !== "" && this.modalForm.value.level !== "" ){
      let search: any = {
        skill_id: this.modalForm.value.skill,
        level_id: this.modalForm.value.level
      }
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      this.http.post<any>('http://localhost:4000/api/statements/levelSkill', search, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.statementSelected = res;
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
  };

  selectStatement(id: any){
    if ( id !== "" ) {
      this.modalForm.value.statement = id;
    };
    console.log(this.modalForm.value.statement)
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>(`http://localhost:4000/api/statements/${this.modalForm.value.statement}`, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.selectedStatement = res[0];
        console.log(this.selectedStatement)
        this.questionForm.value.level = this.selectedStatement.level_id;
        this.questionForm.value.skill = this.selectedStatement.skill_id;
        if(res[0].questions !== null){
          let ids: any = res[0].questions.split(",");
          console.log(ids)
          this.addQuestionToStatement(ids);
        };
        this.closeStatementModal();
        if(this.modalForm.value.statement !== ""){
          this.statement = true;
        };
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  /* */

  addQuestionToStatement(ids: any){
    let questions :any = [];
    
    if( ids !== undefined && ids !== null && ids !== "" ){
      this.selectedStatement = Object.assign({questions: []}, this.selectedStatement);
      for( let i: any = 0; ids.length > i; i++ ){
        let id: any = {id: ids[i]};
        let auth: any = localStorage.getItem('token');
        let httpHeaders: any = new HttpHeaders({
          'authorization': auth
        });
        this.http.put<any>(`http://localhost:4000/api/questions/getById`, id, {headers: httpHeaders}).subscribe({
          next: (res) => {
            questions.push(res[0]);
            for(let x: any = 0; questions.length > x; x++){
              let answers_ids: any = questions[x].answers_ids.split(",");
              for(let y: any = 0; answers_ids.length > y; y++){
                let id = {id: answers_ids[y]};
                this.http.put<any>(`http://localhost:4000/api/answers/getById`, id, {headers: httpHeaders}).subscribe({
                  next: (res) => {
                    questions[x] = Object.assign({answers: []}, questions[x]);
                    if(!questions[x].answers.find((e: any) => e.id === res[0].id)){
                      questions[x].answers.push(res[0]);
                    }
                  },
                  error: (err) => {
                    alert('Cargar fallo' + err);
                  },
                });
              }
            }
          },
          error: (err) => {
            alert('Cargar fallo' + err);
          },
        });
      }
    }
    setTimeout(() => {
      console.log(questions)
      this.selectedStatement.questions.push(questions)
      console.log(this.selectedStatement)
    }, 100);
  };

  writeStatement(){
    this.statement = false;
    this.selectedStatement = [];
  };

  statementPhotoConvert(event: any){
    let file: any = event.target.files[0];
    let url: any = file;
    const fr: any = new FileReader();
    fr.readAsDataURL(url)
    fr.onload = () => {
      this.statementPhoto = fr.result as string;
    };
  };

  questionPhotoConvert(event: any, letter: any){
    let file: any = event.target.files[0];
    let url: any = file;
    const fr: any = new FileReader();
    fr.readAsDataURL(url)
    fr.onload = () => {
      this.questionPhoto = fr.result as string;
      console.log(this.questionPhoto + "  " + letter);
      switch(letter){
        case "A": 
          this.questionForm.value.photoA = fr.result as string;
          break;
        case "B": 
          this.questionForm.value.photoB = fr.result as string;
          break;
        case "C": 
          this.questionForm.value.photoC = fr.result as string;
          break;
        case "D": 
          this.questionForm.value.photoD = fr.result as string;
          break;
        case "E": 
          this.questionForm.value.photoE = fr.result as string;
          break;
        case "F": 
          this.questionForm.value.photoF = fr.result as string;
          break;
        case 'question':
          this.questionForm.value.photoQuestion = fr.result as string;
          break;
      }
    };
  };

  validateStatement() {
    let statement: any = this.statementForm.value.statement;
    let text: any = this.statementForm.value.text;
    let puntuation: any = this.statementForm.value.puntuation;
    let level: any = this.statementForm.value.level;
    let skill: any = this.statementForm.value.skill;
    //let photo: any = this.statementPhoto;

    if (
      statement === '' ||
      text === '' ||
      puntuation === '' ||
      level === '' ||
      skill === '' //||
      //photo === '' 
    ) {
      alert( 'Debe de rellenar todos los campos del enunciado' );
      this.validatedStatement = false;
    } else {
      this.validatedStatement = true;
    };
  };

  validateQuestion() {
    //let question: any = this.questionForm.value.question;
    //let block: any = this.questionForm.value.block;
    let response1: any = this.questionForm.value.responseA;
    let response2: any = this.questionForm.value.responseB;
    let response3: any = this.questionForm.value.responseC;
    let responseCorrect: any = this.questionForm.value.correctResponse;
    //let photo: any = this.questionForm.value.questionPhoto;

    if (
      //question === '' ||
      //block === '' ||
      response1 === '' ||
      response2 === '' ||
      response3 === '' ||
      responseCorrect === '' //||
      //photo === '' 
    ) {
      alert( 'Debe de rellenar todos los campos de la pregunta' );
      this.validatedQuestion = false;
    } else {
      this.validatedQuestion = true;
    };

    let statement: any = this.selectedStatement
    if ( statement === undefined ) {
      alert( 'Debe de seleccionar un enunciado' );
    };
  };

  chargeSkillsStatement(type: any){
    let level: any = {};
    if ( type === 'statement' ){
      level.level_id = this.statementForm.value.level
    } else if ( type === 'modal' ) {
      level.level_id = this.modalForm.value.level
    };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.post<any>('http://localhost:4000/api/skills/skillsId', level, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.skillsStatement = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  chargeSkillsQuestions(){
    let level: any = {
      level_id: this.questionForm.value.level,
    }
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.post<any>('http://localhost:4000/api/skills/skillsId', level, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.skillsQuestion = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  chargeBlocksQuestions(){
    let skill: any = {
      skill_id: this.questionForm.value.skill,
    };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.post<any>('http://localhost:4000/api/blocks/blocksId', skill, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.blocks = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

}