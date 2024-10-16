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
  photos: any = {};
  idSatement: any;
  
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

  sendQuestion(){
    //this.validateQuestion();
    if ( true/*this.validatedQuestion*/) {
      let responses: any;
      if( this.questionForm.value.responsesMode === "photo" ){
        responses = [
          {
            photo: this.photos.photoA,
            letter: "A",
            is_correct: false
          },
          {
            photo: this.photos.photoB,
            letter: "B",
            is_correct: false
          },
          {
            photo: this.photos.photoC,
            letter: "C",
            is_correct: false
          },
        ];
        if(this.photos.photoD !== "" && this.photos.photoD !== null && this.photos.photoD !== undefined){
          responses.push({
            photo: this.photos.photoD,
            letter: "D",
            is_correct: false
          })
        };
        if(this.photos.photoE !== "" && this.photos.photoE !== null && this.photos.photoE !== undefined){
          responses.push({
            photo: this.photos.photoE,
            letter: "E",
            is_correct: false
          })
        };
        if(this.photos.photoF !== "" && this.photos.photoF !== null && this.photos.photoF !== undefined){
          responses.push({
            photo: this.photos.photoF,
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
      if ( this.photos.photoQuestion && this.photos.photoQuestion !== undefined ) { add.photoQuestion = this.photos.photoQuestion }
      if ( this.questionForm.value.block ) { add.block = this.questionForm.value.block } else { add.block = null }
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      this.http.post<any>('http://localhost:4000/api/questions/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          /**/this.selectStatement(this.idSatement);
          let form: any = document.getElementById("questionForm");
          form.reset();
          this.questionForm.patchValue({
            responsesMode: ''  
          });
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
  };

  sendStatement(){
    //this.validateStatement();
    if (true/*this.validatedStatement*/) {
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
          let form: any = document.getElementById("questionForm");
          form.reset();
          this.selectStatement(res);
          this.statementForm.patchValue({
            level: '',
            skill: '',
            statement: '',
            puntuation: '',
            text: '',
            statementPhoto: '',
          });
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
    let statementRes: any;
    if ( id !== "" ) {
      this.idSatement = id;
    } else {
      this.idSatement = this.modalForm.value.statement;
    };

    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let data: any = {}
    this.http.get<any>(`http://localhost:4000/api/statements/${this.idSatement}`, {headers: httpHeaders}).subscribe({
      next: ( res ) => {
        this.selectedStatement = res[0];
        this.statement = true;
        this.selectedStatement.questions = [];
          if(this.selectedStatement.photo_id !== null){
            let id: any = { id: this.selectedStatement.photo_id };
            this.http.post<any>('http://localhost:4000/api/photo/IdActive', id, {headers: httpHeaders}).subscribe({
              next: (res) => { this.selectedStatement.photo_id = res[0].base64_data; },
              error: (err) => { alert('Cargar fallo' + err); },
            });
          };
      },
      error: ( err ) => {alert('Cargar fallo' + err);},
      complete: () => {
          let data: any = { statement_id: this.selectedStatement.id };
          this.http.post<any>('http://localhost:4000/api/questions/getQuestionsAnswers', data, {headers: httpHeaders}).subscribe({
            next: ( res ) => {
              console.log(res)
              if ( res !== undefined ) {
                this.selectedStatement.questions.push(res); 
                console.log(this.selectedStatement);
              }
              
            },
            error: (err) => { alert('Cargar fallo' + err); }
          });
      }
    });




    /*let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>(`http://localhost:4000/api/statements/${this.idSatement}`, {headers: httpHeaders}).subscribe({
      next: (res) => {
        statementRes = res;
        this.statement = true;
        this.selectedStatement = res[0];
        this.questionForm.value.level = this.selectedStatement.level_id;
        this.questionForm.value.skill = this.selectedStatement.skill_id;
        if( res[0].photo_id !== null ){
          let photoId: any = { id: res[0].photo_id };
          this.http.post<any>(`http://localhost:4000/api/photo/IdActive`, photoId, {headers: httpHeaders}).subscribe({
            next: (res) => {  
              statementRes[0].image = res[0].base64_data
              if(statementRes[0].questions !== null){
                let ids: any = statementRes[0].questions.split(",");
                this.addQuestionToStatement(ids);
              };
              this.closeStatementModal();
              if(this.modalForm.value.statement !== ""){
                this.statement = true;
              };
              this.chargeBlocksQuestions(statementRes[0].skill_id)
            }, error: (err) => {
              alert('Cargar fallo' + err);
            }
          });
        } else {
          if(statementRes[0].questions !== null){
            let ids: any = statementRes[0].questions.split(",");
            this.addQuestionToStatement(ids);
          };
          this.closeStatementModal();
          if(this.modalForm.value.statement !== ""){
            this.statement = true;
          };
          this.chargeBlocksQuestions(statementRes[0].skill_id)
        };
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });*/
  };

  /*addQuestionToStatement(ids: any){
    let questions :any = [];
    
    /*if( ids !== undefined && ids !== null && ids !== "" ){
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
                    let answersRes: any = res;
                    if ( res[0].photo_id !== null ) {
                      let photoId: any = { id: res[0].photo_id };
                      this.http.post<any>(`http://localhost:4000/api/photo/IdActive`, photoId, {headers: httpHeaders}).subscribe({
                        next: (res) => {  
                          answersRes[0].image = res[0].base64_data;
                          questions[x] = Object.assign({answers: []}, questions[x]);
                          if(!questions[x].answers.find((e: any) => e.id === answersRes[0].id)){
                            questions[x].answers.push(answersRes[0]);
                          };
                        }, error: (err) => {
                          alert('Cargar fallo' + err);
                        }
                      })
                    } else {
                      questions[x] = Object.assign({answers: []}, questions[x]);
                      if(!questions[x].answers.find((e: any) => e.id === res[0].id)){
                        questions[x].answers.push(res[0]);
                    };
                    };
                    if (x  === questions.length-1 && i === ids.length-1 && y === answers_ids.length-1) {
                      this.insertQuestions(questions);
                    }
                  },
                  error: (err) => {
                    alert('Cargar fallo' + err);
                  },
                });
              };
            };
          },
          error: (err) => {
            alert('Cargar fallo' + err);
          },
        });
      };
    };*/
  /*};*/

  /*insertQuestions(questions: any){
    this.selectedStatement.questionsArray = Object.assign(questions, this.selectedStatement.questiosArray);
  };*/

  writeStatement(){
    console.log(this.selectedStatement)
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
      switch(letter){
        case "A": 
          this.photos.photoA = fr.result as string;
          break;
        case "B": 
          this.photos.photoB = fr.result as string;
          break;
        case "C": 
          this.photos.photoC = fr.result as string;
          break;
        case "D": 
          this.photos.photoD = fr.result as string;
          break;
        case "E": 
          this.photos.photoE = fr.result as string;
          break;
        case "F": 
          this.photos.photoF = fr.result as string;
          break;
        case 'question':
          this.photos.photoQuestion = fr.result as string;
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

  chargeBlocksQuestions(id: any){
    let skill: any = {}; 
    if ( id === '') {
      skill.skill_id = this.questionForm.value.skill;
    } else if ( id !== '' ) {
      skill.skill_id = id;
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