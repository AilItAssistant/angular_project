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
  questionPhoto: any;
  statementPhoto: any;
  validatedQuestion: boolean = false;
  validatedStatement: boolean = false;
  
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
    questionPhoto: new FormControl(),
    statementPhoto: new FormControl(),
  });

  ngOnInit() {
    this.loadLevels();
    this.loadSkills();
    this.loadBLocks();
  };

  loadLevels(){
    this.http.get<any>('http://localhost:4000/api/levels').subscribe({
      next: (res) => {
        this.levels = res;
      },
        error: (err) => {
          alert('Cargar fallo' + err);
      },
    });
  };

  loadSkills(){
    this.http.get<any>('http://localhost:4000/api/skills').subscribe({
      next: (res) => {
        this.skills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadBLocks(){
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

  sendQuestion(){
    this.validateQuestion();
    if (this.validatedQuestion) {

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
        statement_id: this.selectedStatement.id,
        photo: this.questionPhoto
      };
      console.log(add)
      this.http.post<any>('http://localhost:4000/api/questions/add', add).subscribe({
        next: (res) => {
          this.selectStatement();
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
        level: this.questionForm.value.level,
        skills: this.questionForm.value.skills,
        statement: this.questionForm.value.statement,
        puntuation: this.questionForm.value.puntuation,
        text: this.questionForm.value.text,
        photo: this.questionPhoto
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
        if(res[0].question_ids !== null){
          let ids: any = res[0].question_ids.split(",");
          this.addQuestionToStatement(ids);
        };
        
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

  addQuestionToStatement(ids: any){
    let questions :any = [];
    
    if( ids !== undefined ){
      this.selectedStatement = Object.assign({questions: []}, this.selectedStatement);
      for( let i: any = 0; ids.length > i; i++ ){
        let id: any = {id: ids[i]};
        this.http.put<any>(`http://localhost:4000/api/questions/getById`, id).subscribe({
          next: (res) => {
            questions.push(res[0]);
            for(let x: any = 0; questions.length > x; x++){
              let answers_ids: any = questions[x].answers_ids.split(",");
              for(let y: any = 0; answers_ids.length > y; y++){
                let id = {id: answers_ids[y]};
                this.http.put<any>(`http://localhost:4000/api/answers/getById`, id).subscribe({
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
    console.log(this.selectedStatement)
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

  questionPhotoConvert(event: any){
    let file: any = event.target.files[0];
    let url: any = file;
    const fr: any = new FileReader();
    fr.readAsDataURL(url)
    fr.onload = () => {
      this.questionPhoto = fr.result as string;
    };
  };

  validateStatement() {
    let statement: any = this.questionForm.value.statement;
    let text: any = this.questionForm.value.text;
    let puntuation: any = this.questionForm.value.puntuation;
    let level: any = this.questionForm.value.level;
    let skill: any = this.questionForm.value.skills;
    let photo: any = this.statementPhoto;

    if (
      statement === '' ||
      text === '' ||
      puntuation === '' ||
      level === '' ||
      skill === '' ||
      photo === '' 
    ) {
      alert( 'Debe de rellenar todos los campos del enunciado' );
      this.validatedStatement = false;
    } else {
      this.validatedStatement = true;
    };
  };

  validateQuestion() {
    let question: any = this.questionForm.value.question;
    let block: any = this.questionForm.value.block;
    let response1: any = this.questionForm.value.responseA;
    let response2: any = this.questionForm.value.responseB;
    let response3: any = this.questionForm.value.responseC;
    let responseCorrect: any = this.questionForm.value.response;
    let photo: any = this.questionForm.value.questionPhoto;

    if (
      question === '' ||
      block === '' ||
      response1 === '' ||
      response2 === '' ||
      response3 === '' ||
      responseCorrect === '' ||
      photo === '' 
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

}