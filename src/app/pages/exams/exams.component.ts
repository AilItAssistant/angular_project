import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {

  levels: any = [];
  
  constructor(private http: HttpClient) {}

  selectExam = new FormGroup({
    level: new FormControl("")
  });

  ngOnInit() {
    this.loadLevels();
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

  generateExam(){
    let level: any = this.selectExam.value.level;
    //console.log(level);
  };

  downloadExam(){
   
  };


  downloadResponses(){

  };

}
