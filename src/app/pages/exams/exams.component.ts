import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    let pdf: any = {
      content: [
        {
          text: 'Exámen de nivel A2\n\n',
          style: 'header'
        },
        {
          text: 'Nombre y apellidos: \n\n',
          style: 'subheader'
        },
        {
          text: `Fecha: \n\n`,
          style: 'subheader'
        },
        {
          text: `Puntuación sobre 100:\n\n`,
          style: 'subheader'
        },
        {
          text: `CORRESPONDENCIAS CON LA NOTA: \n
            Inferior al 60% = No apto
            60-70% = Apto/Suficiente
            70-90% = Notable
            90-100% = Sobresaliente \n\n`,
          style: 'normal'
        },
        {
          text: 'Instrucciones: \n\n',
          style: 'subheader'
        },
        {
          text: `1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `4. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `5. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `6. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `7. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `8. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `9. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          text: `10. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          style: 'normal'
        },
        {
          image: ``
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 12,
          bold: true
        },
        normal: {
          fontSize: 10
        }
      }
    }
    pdfMake.createPdf(pdf).download("test.pdf");
    //pdfMake.createPdf(pdf).open();
  };

  downloadExam(){
    
  };


  downloadResponses(){

  };

}
