import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-online-exam',
  standalone: true,
  imports: [],
  templateUrl: './online-exam.component.html',
  styleUrl: './online-exam.component.scss'
})
export class OnlineExamComponent {

  exams: any;
  statements: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:4000/api/exams').subscribe({
      next: (res) => {
        this.exams = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  
    this.takeQuestionArray();
  }

  takeQuestionArray(){
    this.statements = []
    for(let i: any = 0; this.exams.length > i; i++){
      for(let x: any = 0; this.exams[i].question.length > x; x++){
        this.statements.push(this.exams[i].question[x]);
      }
    }
  };

  change(questionId: string, responseId: string){

    for(let i: any = 0; this.statements.length > i; i++){
      if(questionId === this.statements[i].id){
        this.statements[i].responseSelected = responseId;
      };
    };
  };

}
