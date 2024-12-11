import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { response } from 'express';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { text } from 'stream/consumers';

@Component({
  standalone: true,
  selector: 'app-add-questions',
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
  blocksbySkillId: any = [];

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
    linkA:new FormControl(),
    responseB: new FormControl(""),
    photoB: new FormControl(),
    linkB:new FormControl(),
    responseC: new FormControl(""),
    photoC: new FormControl(),
    linkC: new FormControl(),
    responseD: new FormControl(""),
    photoD: new FormControl(),
    linkD: new FormControl(),
    responseE: new FormControl(""),
    photoE: new FormControl(),
    linkE: new FormControl(),
    responseF: new FormControl(""),
    photoF: new FormControl(),
    linkF: new FormControl(),
    responseG: new FormControl(""),
    photoG: new FormControl(),
    linkG: new FormControl(),
    responseH: new FormControl(""),
    photoH: new FormControl(),
    linkH: new FormControl(),
    responseI: new FormControl(""),
    photoI: new FormControl(),
    linkI: new FormControl(),
    correctResponse: new FormControl(""),
    photoQuestion: new FormControl(),
  });

  statementForm = new FormGroup({
    level: new FormControl(""),
    skill: new FormControl(""),
    block: new FormControl(""),
    statement: new FormControl(""),
    puntuation: new FormControl(""),
    text: new FormControl(""),
    statementPhoto: new FormControl(),
  })

  ngOnInit() {
    this.loadLevels();
    this.controlPage();
  };
  controlPage(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
    'authorization': auth
    });
    let data: any = { name: "add-questions"};
    this.http.post<any>('http://localhost:4000/api/user_actions/entrypage', data, {headers: httpHeaders}).subscribe({
        next: (res) => {},
        error: (err) => { alert('Cargar fallo' + err); },
    });
  };

  loadBlocksbySkillId(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let ids: any = {
      level_id: this.statementForm.value.level,
      skill_id: this.statementForm.value.skill
    };
    this.http.post<any>('http://localhost:4000/api/blocks/getBlocksByLevelSkill', ids, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.blocksbySkillId = res;
      },
        error: (err) => {
          alert('Cargar fallo' + err);
      },
    });
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
    if(this.numberResponses < 9){
      this.numberResponses++;
    };
  };

  sendQuestion(){
    //this.validateQuestion();
    if ( true/*this.validatedQuestion*/) {
      let responses: any;
      if( this.questionForm.value.responsesMode === "photo"){
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
        if(this.photos.photoG !== "" && this.photos.photoG !== null && this.photos.photoG !== undefined){
          responses.push({
            photo: this.photos.photoG,
            letter: "G",
            is_correct: false
          })
        };
        if(this.photos.photoH !== "" && this.photos.photoH !== null && this.photos.photoH !== undefined){
          responses.push({
            photo: this.photos.photoH,
            letter: "H",
            is_correct: false
          })
        };
        if(this.photos.photoI !== "" && this.photos.photoI !== null && this.photos.photoI !== undefined){
          responses.push({
            photo: this.photos.photoI,
            letter: "I",
            is_correct: false
          })
        };
      } else if ( this.questionForm.value.responsesMode === "phrase"  || this.questionForm.value.responsesMode === "test" ) {
        responses = [
          {
            content: this.questionForm.value.responseA,
            letter: "A",
            is_correct: false,
            response: this.questionForm.value.linkA,
          },
          {
            content: this.questionForm.value.responseB,
            letter: "B",
            is_correct: false,
            response: this.questionForm.value.linkB,
          },
          {
            content: this.questionForm.value.responseC,
            letter: "C",
            is_correct: false,
            response: this.questionForm.value.linkC,
          },
        ];
        if(this.questionForm.value.responseD !== "" && this.questionForm.value.responseD !== null){
          responses.push({
            content: this.questionForm.value.responseD,
            letter: "D",
            is_correct: false,
            response: this.questionForm.value.linkD,
          })
        };
        if(this.questionForm.value.responseE !== "" && this.questionForm.value.responseE !== null){
          responses.push({
            content: this.questionForm.value.responseE,
            letter: "E",
            is_correct: false,
            response: this.questionForm.value.linkE,
          })
        };
        if(this.questionForm.value.responseF !== "" && this.questionForm.value.responseF !== null){
          responses.push({
            content: this.questionForm.value.responseF,
            letter: "F",
            is_correct: false,
            response: this.questionForm.value.linkF,
          })
        };
        if(this.questionForm.value.responseG !== "" && this.questionForm.value.responseG !== null){
          responses.push({
            content: this.questionForm.value.responseG,
            letter: "G",
            is_correct: false,
            response: this.questionForm.value.linkG,
          })
        };
        if(this.questionForm.value.responseH !== "" && this.questionForm.value.responseH !== null){
          responses.push({
            content: this.questionForm.value.responseH,
            letter: "H",
            is_correct: false,
            response: this.questionForm.value.linkH,
          })
        };
        if(this.questionForm.value.responseI !== "" && this.questionForm.value.responseI !== null){
          responses.push({
            content: this.questionForm.value.responseI,
            letter: "I",
            is_correct: false,
            response: this.questionForm.value.linkI,
          })
        };
      } else if ( this.questionForm.value.responsesMode === "multiple" ){
        responses = [
          {
            photo: this.photos.photoA,
            content: "Mensaje:____",
            letter: "A",
            is_correct: false,
            response: this.questionForm.value.linkA,
          },
          {
            photo: this.photos.photoB,
            content: "Mensaje:____",
            letter: "B",
            is_correct: false,
            response: this.questionForm.value.linkB,
          },
          {
            photo: this.photos.photoC,
            content: "Mensaje:____",
            response: this.questionForm.value.linkC,
            letter: "C",
            is_correct: false
          },
        ];
        if(this.photos.photoD !== "" && this.photos.photoD !== null && this.photos.photoD !== undefined || this.questionForm.value.responseD !== "" && this.questionForm.value.responseD !== null){
          responses.push({
            photo: this.photos.photoD,
            content: "Mensaje:____",
            response: this.questionForm.value.linkD,
            letter: "D",
            is_correct: false
          })
        };
        if(this.photos.photoE !== "" && this.photos.photoE !== null && this.photos.photoE !== undefined || this.questionForm.value.responseE !== "" && this.questionForm.value.responseE !== null){
          responses.push({
            photo: this.photos.photoE,
            content: "Mensaje:____",
            response: this.questionForm.value.linkE,
            letter: "E",
            is_correct: false
          })
        };
        if(this.photos.photoF !== "" && this.photos.photoF !== null && this.photos.photoF !== undefined || this.questionForm.value.responseF !== "" && this.questionForm.value.responseF !== null){
          responses.push({
            photo: this.photos.photoF,
            content: "Mensaje:____",
            response: this.questionForm.value.linkF,
            letter: "F",
            is_correct: false
          })
        };
        if(this.photos.photoG !== "" && this.photos.photoG !== null && this.photos.photoG !== undefined || this.questionForm.value.responseG !== "" && this.questionForm.value.responseG !== null){
          responses.push({
            photo: this.photos.photoG,
            content: "Mensaje:____",
            response: this.questionForm.value.linkG,
            letter: "G",
            is_correct: false
          })
        };
        if(this.photos.photoH !== "" && this.photos.photoH !== null && this.photos.photoH !== undefined || this.questionForm.value.responseH !== "" && this.questionForm.value.responseH !== null){
          responses.push({
            photo: this.photos.photoH,
            content: "Mensaje:____",
            response: this.questionForm.value.linkH,
            letter: "H",
            is_correct: false
          })
        };
        if(this.photos.photoI !== "" && this.photos.photoI !== null && this.photos.photoI !== undefined || this.questionForm.value.responseI !== "" && this.questionForm.value.responseI !== null){
          responses.push({
            photo: this.photos.photoI,
            content: "Mensaje:____",
            response: this.questionForm.value.linkI,
            letter: "I",
            is_correct: false
          })
        };
      };
      if( this.questionForm.value.responsesMode === "photo" ||
        this.questionForm.value.responsesMode === "phrase" ||
        this.questionForm.value.responsesMode === "test" ){
        responses.forEach((element: any) => {
          if(this.questionForm.value.correctResponse === element.letter){
            element.is_correct = true
          };
        });
      };
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
      console.log(add)
      this.http.post<any>('http://localhost:4000/api/questions/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          if(this.statementSelected)this.selectStatement(this.idSatement);
          let form: any = document.getElementById("questionForm");
          form.reset();
          this.questionForm.patchValue({
            responsesMode: '',
            level: '',
            skill: '',
            block: ''
          });
          this.photos = {};
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
        block: this.statementForm.value.block,
        statement: this.statementForm.value.statement,
        puntuation: this.statementForm.value.puntuation,
        text: this.statementForm.value.text,
        photo: this.statementPhoto ? this.statementPhoto : null,
      };
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      console.log(add)
      this.http.post<any>('http://localhost:4000/api/statements/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          let form: any = document.getElementById("questionForm");
          form.reset();
          this.selectStatement(res);
          this.statementForm.patchValue({
            level: '',
            skill: '',
            block: '',
            statement: '',
            puntuation: '',
            text: '',
            statementPhoto: '',
          });
          this.questionForm.patchValue({
            responsesMode: '',
          });
          this.statementPhoto = "";
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
        console.log(res[0])
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
              if ( res !== undefined ) {
                this.selectedStatement.questions.push(res);
                console.log(this.selectedStatement.skill_id);
                this.chargeBlocksQuestions(this.selectedStatement.skill_id);
                this.closeStatementModal();
              };
            },
            error: (err) => { alert('Cargar fallo' + err); }
          });
      }
    });
  };

  writeStatement(){
    console.log(this.selectedStatement)
    this.statement = false;
    this.selectedStatement = [];
    this.questionForm.reset({
      responsesMode: '',
      level: "",
      skill: "",
      block: ""
    });
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
          case "G":
            this.photos.photoG = fr.result as string;
            break;
          case "H":
            this.photos.photoH = fr.result as string;
            break;
          case "I":
            this.photos.photoI = fr.result as string;
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
    let ids: any = {};
    if ( this.selectedStatement ) {
      ids.skill_id = this.selectedStatement.skill_id;
      ids.level_id = this.selectedStatement.level_id;
    } else {
      ids.skill_id = this.questionForm.value.skill;
      ids.level_id = this.questionForm.value.level;
    };
    this.http.post<any>('http://localhost:4000/api/blocks/blocksId', ids, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.blocks = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };
}