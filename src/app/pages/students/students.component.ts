import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  students: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }
  
  load(){
    this.http.get<any>('http://localhost:4000/api/alumnos').subscribe({
      next: (res) => {
        this.students = res;
        console.log(res);
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };
}
