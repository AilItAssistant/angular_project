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

  blocks: any = [];
  skills: any = [];
  levels: any = [];

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

  ngOnInit() {
    this.loadLevels();
    this.loadSkills();
    this.loadBlocks();
  }

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

  loadSkills(){
    this.http.get<any>('http://localhost:4000/api/skills').subscribe({
      next: (res) => {
        this.skills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadBlocks(){
    this.http.get<any>('http://localhost:4000/api/blocks').subscribe({
      next: (res) => {
        this.blocks = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

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
    this.editVariables.type = "levels";
    this.editVariables.structure = level;
    this.editVariables.action = "modify";
    this.editVariables.id = level.id;

    this.editForm = new FormGroup({
      name: new FormControl(level.name),
      status: new FormControl(level.status)
    });
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  openEditSkillModal(skill: any){
    this.editVariables.type = "skills";
    this.editVariables.structure = skill;
    this.editVariables.action = "modify";
    this.editVariables.id = skill.id;

    this.editForm = new FormGroup({
      name: new FormControl(skill.name),
      status: new FormControl(skill.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  openEditBlockModal(block: any){
    this.editVariables.type = "blocks";
    this.editVariables.structure = block;
    this.editVariables.action = "modify";
    this.editVariables.id = block.id;

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
    let change: any;
    if ( level.status === "active" ) {
      change = "inactive"
    } else if ( level.status === "inactive" ) {
      change = "active"
    }
    let status: any = {
      id: level.id,
      status: change
    }
    this.http.put<any>('http://localhost:4000/api/levels/status', status).subscribe({
      next: (res) => {
        this.loadLevels();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  desactivateBlock(block: any){
    let change: any;
    if ( block.status === "active" ) {
      change = "inactive"
    } else if ( block.status === "inactive" ) {
      change = "active"
    }
    let status: any = {
      id: block.id,
      status: change
    }
    this.http.put<any>('http://localhost:4000/api/blocks/status', status).subscribe({
      next: (res) => {
        this.loadBlocks();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  desactivateSkill(skill: any){
    let change: any;
    if ( skill.status === "active" ) {
      change = "inactive"
    } else if ( skill.status === "inactive" ) {
      change = "active"
    }
    let status: any = {
      id: skill.id,
      status: change
    }
    this.http.put<any>('http://localhost:4000/api/skills/status', status).subscribe({
      next: (res) => {
        this.loadSkills();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  modify(){
    this.charge = true;
    let changes: any = {
      name: this.editForm.value.name,
      status: this.editForm.value.status,
      action: this.editVariables.action,
      id: this.editVariables.id
    };

    this.http.put<any>(`http://localhost:4000/api/${this.editVariables.type}/edit`, changes).subscribe({
      next: (res) => {
        let form: any = document.getElementById("editForm");
        if( this.editVariables.type === "levels" ){
          this.loadLevels();
        }else if( this.editVariables.type === "skills" ){
          this.loadSkills();
        }else if( this.editVariables.type === "blocks" ){
          this.loadBlocks();
        }
        this.charge = false;
        this.closeEditModal();
        form.reset();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
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