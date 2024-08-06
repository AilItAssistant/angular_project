import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { identity } from 'rxjs';


@Component({
  selector: 'app-manage-structure',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './manage-structure.component.html',
  styleUrl: './manage-structure.component.scss'
})
export class ManageStructureComponent {

  blocks: any = [
    {
      status: true,
      id: 1,
      name: "Estar o hay"
    }, 
    {
      status: true,
      id: 2,
      name: "Tener y haber"
    }, 
    {
      status: true,
      id: 3,
      name: "Gustar y similares"
    }, 
    {
      status: true,
      id: 4,
      name: "Presente irregular"
    },
    {
      status: true,
      id: 5,
      name: "Descripción física"
    }, 
    {
      status: true,
      id: 6,
      name: "Género y número"
    }, 
    {
      status: true,
      id: 7,
      name: "Cantidad"
    }, 
    {
      status: true,
      id: 8,
      name: "Reflexivos"
    }, 
    {
      status: true,
      id: 9,
      name: "Ropa"
    }, 
    {
      status: true,
      id: 10,
      name: "Tiempo atmosférico"
    }, 
     {
      status: true,
      id: 11,
      name: "Pretérito perfecto"
    }, 
    {
      status: true,
      id: 12,
      name: "Pronombres OD y OI gustar"
    }, 
    {
      status: true,
      id: 13,
      name: "Preposiciones"
    }, 
    {status: false,
      id: 14,
      name: "Vocabulario"
    }, 
    {
      status: true,
      id: 15,
      name: "Variadas de gramática"
    }
  ];
  skills: any = [
    {
      status: true,
      id: 1,
      name: "Vocabulario"
    }, 
    {
      status: true,
      id: 2,
      name: "Desarrollar"
    }, 
    {
      status: false,
      id: 3,
      name: "Comprensión"
    }, 
    {
      status: true,
      id: 4,
      name: "Audio"
    }, 
    {
      status: true,
      id: 5,
      name: "Oral"
    }
  ];
  levels: any = [
    {
      status: true,
      id: 1,
      name: "A1"
    }, 
    {
      status: true,
      id: 2,
      name: "A2"
    }, 
    {
      status: false,
      id: 3,
      name: "B1"
    }, 
    {
      status: true,
      id: 4,
      name: "B2"
    }
  ];

  questionForm = new FormGroup({
    level: new FormControl(""),
    block: new FormControl(""),
    skill: new FormControl(""),
  });
}
