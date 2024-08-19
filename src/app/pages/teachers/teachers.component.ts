import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

  constructor(private http: HttpClient) {}

  teachers: any;

  ngOnInit() {
    this.load();
  }
  
  load(){
    this.http.get<any>('http://localhost:4000/api/teachers').subscribe({
      next: (res) => {
        this.teachers = res;
        console.log(res);
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

}
