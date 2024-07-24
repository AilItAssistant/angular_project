import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-validate-questions',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './validate-questions.component.html',
  styleUrl: './validate-questions.component.scss'
})
export class ValidateQuestionsComponent {

  exams: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:4000/api/exams').subscribe({
      next: (res) => {
        this.exams = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  }

}
