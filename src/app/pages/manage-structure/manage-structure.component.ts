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
      id: 1,
      name: "Estar o hay"
    }, 
    {
      id: 2,
      name: "Tener y haber"
    }, 
    {
      id: 3,
      name: "Gustar y similares"
    }, 
    {
      id: 4,
      name: "Presente irregular"
    },
    {
      id: 5,
      name: "Descripción física"
    }, 
    {
      id: 6,
      name: "Género y número"
    }, 
    {
      id: 7,
      name: "Cantidad"
    }, 
    {
      id: 8,
      name: "Reflexivos"
    }, 
    {
      id: 9,
      name: "Ropa"
    }, 
    {
      id: 10,
      name: "Tiempo atmosférico"
    }, 
     {
      id: 11,
      name: "Pretérito perfecto"
    }, 
    {
      id: 12,
      name: "Pronombres OD y OI gustar"
    }, 
    {
      id: 13,
      name: "Preposiciones"
    }, 
    {
      id: 14,
      name: "Vocabulario"
    }, 
    {
      id: 15,
      name: "Variadas de gramática"
    }
  ];
  skills: any = [
    {
      id: 1,
      name: "Vocabulario"
    }, 
    {
      id: 2,
      name: "Desarrollar"
    }, 
    {
      id: 3,
      name: "Comprensión"
    }, 
    {
      id: 4,
      name: "Audio"
    }, 
    {
      id: 5,
      name: "Oral"
    }
  ];
  levels: any = [
    {
      id: 1,
      name: "A1"
    }, 
    {
      id: 2,
      name: "A2"
    }, 
    {
      id: 3,
      name: "B1"
    }, 
    {
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
