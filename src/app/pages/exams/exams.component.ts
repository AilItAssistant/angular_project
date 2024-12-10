import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Component({
    standalone: true,
    selector: 'app-exams',
    imports: [ReactiveFormsModule, FooterComponent, HeaderComponent],
    templateUrl: './exams.component.html',
    styleUrl: './exams.component.scss',
})

export class ExamsComponent {

  levels: any = [];
  exam: any = {};

  constructor(private http: HttpClient) {}

  selectExam = new FormGroup({
    level: new FormControl("")
  });

  ngOnInit() {
    this.loadLevels();
  };

  loadLevels(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/levels/active', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.levels = res;
        console.log(res)
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  downloadExam(){
    let standard: any = {
      level: "A1",
      image: "data:image/png;base64,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",
      data: {
        phone: "+34 914 354 801",
        web: "www.ailmadrid.com",
        email: "info@ailmadrid.com"
      }
    };

    let pdf: any = {
      pageSize: 'A4',
      pageMargins: [ 40, 60, 40, 60 ],
      header: [
        {
          columns: [
            {
              image: `${standard.image}`,
              width: 130,
              alignment: 'left'
            },
            {
              text: `${standard.data.phone}\n${standard.data.web}\n${standard.data.email}`,
              style: 'headerData',
            }
          ],
          style: 'header',
        },
      ],
      footer: function(currentPage: any) {
        return [
          {
            text: currentPage.toString(),
            alignment: 'center'
          }
        ]
      },
      content: [],
      styles: {
        headerData: {
          fontSize: 7,
          color: '#EF8533',
          bold: true,
          margin: [ 0, 0, 80, 0 ],
          alignment: 'right'
        },
        header: {
          margin: [ 80, 35, 0, 0 ]
        },
        title: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [ 0, 50 ],
        },
        studentData: {
          fontSize: 12,
          bold: true,
          margin: [ 40, 40, 0, 0 ],
        },
        instructions: {
          fontSize: 11,
          alignment: 'center',
          margin: [ 0, 10 ],
        },
        puntuation: {
          bold: true,
          fontSize: 12,
          margin: [ 40, 25, 0, 10 ],
        },
        grammarQuestions: {
          fontSize: 10,
          margin: [ 55, 20, 40, 0 ],
        },
        statement: {
          margin: [ 40, 35, 0, 15 ],
          fontSize: 12,
          bold: true
        },
        puntuationStatement: {
          alignment: 'right',
          fontSize: 12,
          margin: [ 0, 35, 40, 15 ],
        },
        text: {
          margin: [ 55, 10, 40, 10 ],
          fontSize: 11,
        },
        image: {
          margin: [ 55, 10, 0, 0 ],
        },
        readQuestion: {
          margin: [ 55, 10, 0, 0 ],
          fontSize: 10,
        },
        readStatement: {
          margin: [ 0, 10, 0, 0 ],
          bold: true
        },
        readAnswers: {
          margin: [ 0, 5, 0, 0 ],
        }
      }
    };

    let firstPage: any = [
      {
        text: `Exámen de nivel ${standard.level}`,
        style: 'title',
      },
      {
        text: '1ª PARTE: Comprensión y expresión escrita (Tiempo: 1 hora y 30 minutos) ',
        style: 'instructions'
      },
      {
        text: '2ª PARTE: Comprensión auditiva (Tiempo: 8 minutos) ',
        style: 'instructions'
      },
      {
        text: '3ª PARTE: Expresión oral (Tiempo: 3-5 minutos) ',
        style: 'instructions'
      },
      {
        text: `Fecha: ............../.............../................. `,
        style: 'studentData'
      },
      {
        text: 'Nombre: ...............................................................................................................',
        style: 'studentData'
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 40, y1: 40,
            x2: 460, y2: 40,
            lineWidth: 1
          },
        ]
      },
      {
        text: 'A rellenar por el centro ',
        style: 'puntuation'
      },
      {
        text: `Puntuación: ................../100 =.............................. \n\n\n\n`,
        style: 'puntuation'
      },
      {
        text: `CORRESPONDENCIAS CON LA NOTA: \n\n
          Inferior al 60% = No apto \n
          60-70% = Apto/Suficiente \n
          70-90% = Notable \n
          90-100% = Sobresaliente `,
        style: 'instructions',
        pageBreak: 'after'
      },
    ];
    pdf.content.push(firstPage);

    //pdfMake.createPdf(pdf).open();
    pdfMake.createPdf(pdf).download("test.pdf");
  };

  downloadResponses(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    if (this.selectExam.value.level !== "") {
      let level: any = { level_id: this.selectExam.value.level }
      this.http.post<any>('http://localhost:4000/api/exams/generate', level, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.exam = res;
          console.log(res)
          this.completeExam();
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
  };
  completeExam(){
    let level: any;
    this.levels.forEach((element: any) => {
      if(element.id === this.selectExam.value.level){level = element.name}
    });
    //TODO RESULT TEST
    let pdfResult: any = {
      pageSize: 'A4',
      pageMargins: [ 50, 60, 65, 60 ],
      content: [],
      styles: {
        statement: {
          margin: [ 30, 35, 0, 15 ],
          fontSize: 14,
          bold: true
        },
        readAnswers: {
          margin: [ 40, 0, 0, 0 ],
          fontSize: 11,
        },
      }
    };

    //TODO Data
    let standard: any = {
      level: level,
      image: "data:image/png;base64,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",
      data: {
        phone: "+34 914 354 801",
        web: "www.ailespanol.com",
        email: "info@ailespanol.com"
      }
    };

    //TODO Basic
    let pdf: any = {
      pageSize: 'A4',
      pageMargins: [ 35, 60, 70, 60 ],
      header: [
        {
          columns: [
            {
              image: `${standard.image}`,
              width: 130,
              alignment: 'left'
            },
            {
              text: `${standard.data.phone}\n${standard.data.web}\n${standard.data.email}`,
              style: 'headerData',
            }
          ],
          style: 'header',
        },
      ],
      footer: function(currentPage: any) {
        return [
          {
            text: currentPage.toString(),
            alignment: 'center'
          }
        ]
      },
      content: [],
      styles: {
        headerData: {
          fontSize: 7,
          color: '#EF8533',
          bold: true,
          margin: [ 0, 0, 80, 0 ],
          alignment: 'right'
        },
        header: {
          margin: [ 80, 35, 0, 0 ]
        },
        title: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [ 0, 50 ],
        },
        studentData: {
          fontSize: 12,
          bold: true,
          margin: [ 40, 40, 0, 0 ],
        },
        instructions: {
          fontSize: 11,
          alignment: 'center',
          margin: [ 0, 10 ],
        },
        puntuation: {
          bold: true,
          fontSize: 12,
          margin: [ 40, 25, 0, 10 ],
        },
        grammarQuestions: {
          fontSize: 10,
          margin: [ 55, 20, 40, 0 ],
        },
        statement: {
          margin: [ 45, 35, 0, 15 ],
          fontSize: 12,
          bold: true
        },
        puntuationStatement: {
          alignment: 'right',
          fontSize: 12,
          margin: [ 0, 35, 40, 15 ],
        },
        text: {
          margin: [ 50, 10, 40, 10 ],
          fontSize: 11,
        },
        image: {
          margin: [ 0, 10, 0, 0 ],
        },
        readQuestion: {
          margin: [ 55, 10, 0, 5 ],
          fontSize: 10,
        },
        readStatement: {
          margin: [ 50, 5, 0, 2 ],
          fontSize: 10.5,
          bold: true
        },
        readAnswers: {
          margin: [ 58, 3, 0, 1 ],
          fontSize: 9.5,
        },
        textPhoto: {
          margin: [ 0, 10, 0, 20 ]
        },
        space: {
          margin: [ 0, 20 ]
        },
        spacePhotos: {
          margin: [ 50, 0, 0, 0 ]
        },
        StatementImage: {
          margin: [ 50, 10, 0, 0 ]
        },
      }
    };

    //TODO First basic
    let firstPage: any = [
      {
        text: `Examen de nivel ${standard.level}`,
        style: 'title',
      },
      {
        text: '1ª PARTE: Comprensión y expresión escrita (Tiempo: 1 hora y 30 minutos) ',
        style: 'instructions'
      },
      {
        text: '2ª PARTE: Comprensión auditiva (Tiempo: 8 minutos) ',
        style: 'instructions'
      },
      {
        text: '3ª PARTE: Expresión oral (Tiempo: 3-5 minutos) ',
        style: 'instructions'
      },
      {
        text: `Fecha: ............../.............../................. `,
        style: 'studentData'
      },
      {
        text: 'Nombre: ...............................................................................................................',
        style: 'studentData'
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 40, y1: 40,
            x2: 460, y2: 40,
            lineWidth: 1
          },
        ]
      },
      {
        text: 'A rellenar por el centro ',
        style: 'puntuation'
      },
      {
        text: `Puntuación: ................../100 =.............................. \n\n\n\n`,
        style: 'puntuation'
      },
      {
        text: `CORRESPONDENCIAS CON LA NOTA: \n\n
          Inferior al 60% = No apto \n
          60-70% = Apto/Suficiente \n
          70-90% = Notable \n
          90-100% = Sobresaliente `,
        style: 'instructions',
        pageBreak: 'after'
      },
    ];
    pdf.content.push(firstPage);

    for(let ex = 0; this.exam.length > ex; ex++){
      this.exam[ex]
      let model: any = [];
      let space: any = 0;

      //*STATEMENT
      if(this.exam[ex].content && this.exam[ex].content !== ""){
        space = space + 1;
        model.push([
          {
            columns: [
              {
                text: `${ex + 1}. ${this.exam[ex].content}`,
                width: '82%',
                style: 'statement'
              },
              {
                text: `___/${this.exam[ex].score}`,
                width: '18%',
                style: 'puntuationStatement'
              }
            ]
          },
        ]);
      };

      //*TEXT
      if(this.exam[ex].type.text > 0){
        space = space + 10;
        model.push(
          {
            text: this.exam[ex].text,
            style: 'text'
          },
        );
      };

      //*STATEMENT PHOTO
      if(this.exam[ex].type.photo > 0 && this.exam[ex].photo){
        space = space + 8;
        model.push(
          {
            image: this.exam[ex].photo,
            width: 420,
            style: 'StatementImage',
          },
        );
      };

      //*QUESTIONS
      if(this.exam[ex].type.question > 0 && this.exam[ex].questions && this.exam[ex].questions !== undefined ){
        for(let q: any = 0; this.exam[ex].questions.length > q; q++){
          if(this.exam[ex].questions[q + 1]){
            let questionBase: any = [
              {
                columns: [],
              },
            ];
            let question1: any = {
              stack: [
                {
                  text: q + 1 + ". " + this.exam[ex].questions[q].content,
                  style: 'readStatement'
                },
              ],
            };
            if(this.exam[ex].questions[q].answers){
              for(let a: any = 0; this.exam[ex].questions[q].answers.length > a; a++){
                let answers1: any = {
                  text: this.exam[ex].questions[q].answers[a].letter + ". " + this.exam[ex].questions[q].answers[a].content,
                  style: 'readAnswers'
                };
                question1.stack.push(answers1);
              };
            };
            questionBase[0].columns.push(question1)
            let question2: any = {
              stack: [
                {
                  text: q + 2 + ". " + this.exam[ex].questions[q + 1].content,
                  style: 'readStatement'
                },
              ],
            };
            if(this.exam[ex].questions[q + 1].answers){
              for(let a: any = 0; this.exam[ex].questions[q].answers.length > a; a++){
                let answers2: any = {
                  text: this.exam[ex].questions[q + 1].answers[a].letter + ". " + this.exam[ex].questions[q + 1].answers[a].content,
                  style: 'readAnswers'
                };
                question2.stack.push(answers2);
              };
            };
            if(q === 14){
              questionBase.push(
                {
                  text: '',
                  pageBreak: 'after',
                }
              );
            };
            questionBase[0].columns.push(question2)
            model.push(questionBase);
            q++;
            if(q === 15){
              questionBase.push(
                {
                  text: '',
                  style: "space",
                }
              );
            };
          }else{
            let questionBase: any = [
              {
                columns: [],
              },
            ];
            let question: any = {
              stack: [
                {
                  text: q + 1 + ". " + this.exam[ex].questions[q].content,
                  style: 'readStatement'
                },
              ],
            };
            if(this.exam[ex].questions[q].answers){
              for(let a: any = 0; this.exam[ex].questions[q].answers.length > a; a++){
                let answers: any = {
                  text: this.exam[ex].questions[q].answers[a].letter + ". " + this.exam[ex].questions[q].answers[a].content,
                  style: 'readAnswers'
                };
                question.stack.push(answers);
              };
            };
            questionBase[0].columns.push(question);
            model.push(questionBase);
          };
          space = space + 2;
        };
      };

      //*PHOTO ANSWERS
      if(this.exam[ex].type.answer > 6 && this.exam[ex].type.photo > 6){
        for(let p: any = 0; this.exam[ex].answers.length > p; p++){
          if(this.exam[ex].answers[p] && this.exam[ex].answers[p + 1] && this.exam[ex].answers[p + 2]) {
            model.push(
              [
                {
                  columns: [
                    {
                      stack: [
                        {
                          image: this.exam[ex].answers[p].photo,
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: this.exam[ex].answers[p].content,
                          style: 'textPhoto'
                        },
                      ],
                    },{
                      stack: [
                        {
                          image: this.exam[ex].answers[p + 1].photo,
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: this.exam[ex].answers[p + 1].content,
                          style: 'textPhoto'
                        },
                      ],
                    },{
                      stack: [
                        {
                          image: this.exam[ex].answers[p + 2].photo,
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: this.exam[ex].answers[p + 2].content,
                          style: 'textPhoto'
                        },
                      ],
                    },
                  ],
                  style: "spacePhotos"
                },
              ],
            );
            p = p + 2;
          } else if(this.exam[ex].answers[p] && this.exam[ex].answers[p + 1] && !this.exam[ex].answers[p + 2]) {
            model.push(
              [
                {
                  columns: [
                    {
                      stack: [
                        {
                          image: this.exam[ex].answers[p].photo,
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: this.exam[ex].answers[p].content,
                          style: 'textPhoto'
                        },
                      ],
                    },{
                      stack: [
                        {
                          image: this.exam[ex].answers[p + 1].photo,
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: this.exam[ex].answers[p + 1].content,
                          style: 'textPhoto'
                        },
                      ],
                    },{
                      stack: [
                        {
                          text:'',
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: '',
                          style: 'textPhoto'
                        },
                      ],
                    },
                  ],
                  style: "spacePhotos"
                },
              ],
            );
            p = p + 1;
          }else if(this.exam[ex].answers[p] && !this.exam[ex].answers[p + 1] && !this.exam[ex].answers[p + 2]) {
            model.push(
              [
                {
                  columns: [
                    {
                      stack: [
                        {
                          image: this.exam[ex].answers[p].photo,
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: this.exam[ex].answers[p].content,
                          style: 'textPhoto'
                        },
                      ],
                    },{
                      stack: [
                        {
                          text:'',
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: '',
                          style: 'textPhoto'
                        },
                      ],
                    },{
                      stack: [
                        {
                          text:'',
                          width: 100,
                          style: 'image',
                        },
                        {
                          text: '',
                          style: 'textPhoto'
                        },
                      ],
                    },
                  ],
                  style: "spacePhotos"
                },
              ],
            );
          };
          space = space + 3;
        };
      };

      //*PHRASE ANSWERS
      if(this.exam[ex].type.answer > 0 && this.exam[ex].type.answer < 6 && this.exam[ex].type.photo === 0 && this.exam[ex].answers){
        for(let a: any = 0; this.exam[ex].answers.length > a; a++){
          model.push(
            {
              text: this.exam[ex].answers[a].letter + ". " + this.exam[ex].answers[a].content,
              style: 'readStatement'
            },
          );
          space++;
        };
      };

      //*SPACES
      if(this.exam.length > ex && ex !== 0){
        pdf.content.push(
          {
            text: '',
            pageBreak: 'after',
          },
        );
      };

      pdf.content.push(model);

      //*TEST RESULTS
      if(this.exam[ex].type.test_type === 1){
        let statement: any = [
          {
            text: `${ex + 1}. `,
            style: 'statement'
          },
          {columns: []}
        ];

        let column: any = 1;
        if(this.exam[ex].questions){
          for(let q: any = 0; this.exam[ex].questions.length > q; q++){
            for(let a: any = 0; this.exam[ex].questions[q].answers.length > a; a++){
              if(this.exam[ex].questions[q].answers[a].is_correct === 1){
                let columns: any = q + 1;
                if(columns / 5 === 1 || columns / 5 === 2 || columns / 5 === 3 || columns / 5 === 4 || columns / 5 === 5 || columns / 5 === 6){
                  statement.push({columns:[]})
                  column++
                };
                statement[column].columns.push(
                  {
                  text: `${q + 1}.  ${this.exam[ex].questions[q].answers[a].letter}`,
                  width: '20%',
                  style: 'readAnswers'
                  },
                );
              };
            };
          };
        }
        pdfResult.content.push(statement);
      };

      //*AUDIO RESULTS
      if(this.exam[ex].type.name === "Audio con frases" || this.exam[ex].type.name === "Audio con fotos"){
        let statement: any = [
          {
            text: `${ex + 1}. `,
            style: 'statement'
          },
          {columns: []}
        ];

        let column: any = 1;
        for(let a: any = 0; this.exam[ex].answers.length > a; a++){
          let columns: any = a + 1;
          if(columns / 5 === 1 || columns / 5 === 2 || columns / 5 === 3 || columns / 5 === 4 || columns / 5 === 5 || columns / 5 === 6){
            statement.push({columns:[]})
            column++
          };
          statement[column].columns.push(
            {
            text: `${a + 1}.  ${this.exam[ex].answers[a].response}`,
            width: '20%',
            style: 'readAnswers'
            },
          );
        };
        pdfResult.content.push(statement);
      };
    };

    //!GENERATE EXAM
    //pdfMake.createPdf(pdf).open();
    pdfMake.createPdf(pdf).download("Examen.pdf");

    //!GENERATE RESULTS TO EXAM TESTS
    pdfMake.createPdf(pdfResult).download("Soluciones.pdf");
  };
};