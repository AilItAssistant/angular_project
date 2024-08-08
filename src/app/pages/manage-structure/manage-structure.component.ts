import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { identity } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-structure',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './manage-structure.component.html',
  styleUrl: './manage-structure.component.scss'
})
export class ManageStructureComponent {

  charge: boolean = false;
  editVariables: any = {};
  deleteVariables: any = {};

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

  structureForm = new FormGroup({
    level: new FormControl(""),
    block: new FormControl(""),
    skill: new FormControl(""),
    statusLevel: new FormControl(""),
    statusBlock: new FormControl(""),
    statusSkill: new FormControl(""),
  });
  
  editForm = new FormGroup({
    name: new FormControl(""),
    status: new FormControl(""),
  });

  constructor(private http: HttpClient) {}

  closeEditModal(){
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="none";
  };

  closeDeleteModal(){
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="none";
  };

  openEditLevelModal(level: any){
    this.editVariables.type = "level";
    this.editVariables.structure = level;
    this.editVariables.action = "modify";

    this.editForm = new FormGroup({
      name: new FormControl(level.name),
      status: new FormControl(level.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  openEditSkillModal(skill: any){
    this.editVariables.type = "skill";
    this.editVariables.structure = skill;
    this.editVariables.action = "modify";

    this.editForm = new FormGroup({
      name: new FormControl(skill.name),
      status: new FormControl(skill.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  openEditBlockModal(block: any){
    this.editVariables.type = "block";
    this.editVariables.structure = block;
    this.editVariables.action = "modify";

    this.editForm = new FormGroup({
      name: new FormControl(block.name),
      status: new FormControl(block.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  addLevel(){
    let add: any = {
      name: this.structureForm.value.level,
      status: this.structureForm.value.statusLevel,
      action: "post",
      type: "level"
    }

    this.http.post<any>('http://localhost:4000/api/structure', add).subscribe({
      next: (res) => {
        console.log(res)
        let form: any = document.getElementById("structureForm");
        form.reset();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });

  };

  addSkill(){
    let add: any = {
      name: this.structureForm.value.skill,
      status: this.structureForm.value.statusSkill,
      action: "post",
      type: "skill"
    }

    this.http.post<any>('http://localhost:4000/api/structure', add).subscribe({
      next: (res) => {
        console.log(res)
        let form: any = document.getElementById("structureForm");
        form.reset();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
  };

  addBlock(){
    let add: any = {
      name: this.structureForm.value.level,
      status: this.structureForm.value.statusLevel,
      action: "post",
      type: "block"
    }

    this.http.post<any>('http://localhost:4000/api/structure', add).subscribe({
      next: (res) => {
        console.log(res)
        let form: any = document.getElementById("structureForm");
        form.reset();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
  };

  desactivateLevel(level: any){

    level.type = "level"; 
    level.action = "desactivate";
    console.log(level);

    this.http.put<any>('http://localhost:4000/api/structure', level).subscribe({
      next: (res) => {
        console.log(res)
        //let form: any = document.getElementById("questionForm");
        //form.reset();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
  };

  desactivateBlock(block: any){

    block.type = "block"; 
    block.action = "desactivate";
    console.log(block);

    this.http.put<any>('http://localhost:4000/api/structure', block).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
    
  };

  desactivateSkill(skill: any){
    skill.type = "skill"; 
    skill.action = "desactivate";
    console.log(skill);

    this.http.put<any>('http://localhost:4000/api/structure', skill).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
  };

  modify(){

    let changes: any = {
      name: this.editForm.value.name,
      status: this.editForm.value.status,
      action: this.editVariables.action,
      type: this.editVariables.type
    };

    this.http.put<any>('http://localhost:4000/api/structure', changes).subscribe({
      next: (res) => {
        console.log(res)
        let form: any = document.getElementById("editForm");
        form.reset();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
  };

  deleteLevel(level: any){
    this.deleteVariables.name = level.name;
    this.deleteVariables.status = level.status;
    this.deleteVariables.action = "delete";
    this.deleteVariables.type = "level";
    console.log(this.deleteVariables)
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
  };

  deleteSkill(skill: any){
    this.deleteVariables.name = skill.name;
    this.deleteVariables.status = skill.status;
    this.deleteVariables.action = "delete";
    this.deleteVariables.type = "skill";

    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
  };

  deleteBlock(block: any){
    this.deleteVariables.name = block.name;
    this.deleteVariables.status = block.status;
    this.deleteVariables.action = "delete";
    this.deleteVariables.type = "block";

    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
  };

  delete(){
    this.http.delete<any>('http://localhost:4000/api/structure', this.deleteVariables).subscribe({
      next: (res) => {
      console.log(res);
      let deleteModal: any;
      deleteModal = document.getElementById('deleteModal');
      deleteModal.style.display="block";
      },
      error: (err) => {
      //alert('Cargar fallo' + err);
      },
      });
  };

}