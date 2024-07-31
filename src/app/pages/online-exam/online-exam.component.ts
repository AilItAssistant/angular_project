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

  statements: any = "ytjrhgf";
  exams: any;

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
    this.getId();
  }
  getId(){console.log(this.route.snapshot.paramMap.get('id'))}

}
