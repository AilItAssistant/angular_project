import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {

  exams: any;
  selected: any = [];
  pushed: boolean = false;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:4000/api/examsA1').subscribe({
      next: (res) => {
        this.exams = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  }
  generatePdf() {
    this.http.get<any>('http://localhost:4000/api/examPdf');
  }

  select(question: any){
    this.pushed = false;

    if(this.selected.length !== 0){

        for(let i: number = 0; this.selected.length > i; i++){

          if(this.selected[i].id === question.id){
            this.selected.splice(i, 1);
            this.pushed = true;
          }
        }
        if(!this.pushed){this.selected.push(question);}
      
    } else {
        this.selected.push(question);
    }
  }

  deleteToArray(question: any){
    for(let i: number = 0; this.selected.length > i; i++){

      if(this.selected[i].id === question.id){
        this.selected.splice(i, 1);
        this.pushed = true;
      }
    }
  }
}