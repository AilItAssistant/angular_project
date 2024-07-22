import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient } from '@angular/common/http';

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
    console.log("id del seleccionado: " + question);

    if(this.selected.includes(question)){

      for(let i: number = 0; this.selected.length > i; i++){
        console.log("longitud: " + i);

        if(this.selected[i] === question){
          this.selected.splice(i, 1);
        }
      }
    } else {
      this.selected.push(question);
      console.log("no estaba: " + question);
      }
    console.log("queda: " + this.selected + typeof(this.selected) + this.selected.length);
  }
}