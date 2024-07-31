import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {

  selectedStudent: any = [];
  alumnos: any;
  charge: boolean = false;
  exams: any;
  selected: any = [];
  pushed: boolean = false;

  sendExamForm = new FormGroup({
    student: new FormControl(),
    studentEmail: new FormControl(""),
  });
  
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
  generatePdf() { };

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
  };

  deleteToArray(question: any){
    for(let i: number = 0; this.selected.length > i; i++){

      if(this.selected[i].id === question.id){
        this.selected.splice(i, 1);
        this.pushed = true;
      }
    }
  };

  openSendExamModal(){
    this.http.get<any>('http://localhost:4000/api/alumnos').subscribe({
      next: (res) => {
        this.alumnos = res;
        console.log(this.alumnos);
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });

    let sendExamModal: any;
    sendExamModal = document.getElementById('sendExamModal');
    sendExamModal.style.display="block";
  };

  closeSendExamModal(){
    let sendExamModal: any;
    sendExamModal = document.getElementById('sendExamModal');
    sendExamModal.style.display="none";
  };

  sendExam(){
    console.log(this.sendExamForm.value);
    console.log()
  };

  addStudent(student:any){
    let exist: boolean = false;
    for(let i: any = 0; this.selectedStudent.length > i; i++){
      if(this.selectedStudent[i].idalumnos === student.idalumnos){
        this.selectedStudent.splice(i, 1);
        exist = true;
      } 
    }
    if (!exist) {
      this.selectedStudent.push(student);
    }
  };
}