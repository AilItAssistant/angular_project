import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './manage-questions.component.html',
  styleUrl: './manage-questions.component.scss'
})
export class ManageQuestionsComponent {

  exams: any;

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
  
  deleteQuestion(exam: any, question: any){

    let selectQuestion: object ={
      exam: exam,
      question: question
    }

    this.http.put<any>('http://localhost:4000/api/exams', selectQuestion).subscribe({
      next: (res) => {
        this.exams = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
    
  };
}
