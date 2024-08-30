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
  val: boolean = true;

  blocks: any = [];
  skills: any = [];
  levels: any = [];

  structureForm = new FormGroup({
    level: new FormControl(""),
    block: new FormControl(""),
    skill: new FormControl(""),
    statusLevel: new FormControl(""),
    statusSkill: new FormControl(""),
    levelSkill: new FormControl(""),
    statusBlock: new FormControl(""),
    skillBlock: new FormControl(""),
  });
  
  editForm = new FormGroup({
    secondId: new FormControl(""),
    name: new FormControl(""),
    status: new FormControl(""),
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLevels();
    this.loadSkills();
    this.loadBlocks();
  };

  validation ( data: any, type: any ) {
    let id: any;
    this.val = true;

    switch ( type ) {
      case "add_level":
        id = document.getElementById('level');
        if ( data.name === "" || data.name === null || data.name === undefined ){
          this.val = false;
          id.style.display="is-invalid";
        } else {
          id.style.display="is-valid";
        };
        break;
      case "add_skill":
        id = document.getElementById('skill');
        if ( data.name === "" || data.name === null || data.name === undefined || data.levelId === "" || data.levelId === null || data.levelId === undefined ){
          this.val = false;
          id.style.display="is-invalid";
        } else {
          id.style.display="is-valid";
        };
        break;
      case "add_block:":
        id = document.getElementById('block');
        if ( data.name === "" || data.name === null || data.name === undefined || data.skillId === "" || data.skillId === null || data.skillId === undefined ){
          this.val = false;
          id.style.display="is-invalid";
        } else {
          id.style.display="is-valid";
        };
        break;
      case "levels":
        if ( data.name === "" || data.name === null || data.name === undefined ) {
          this.val = false;
        }
        break;
      case "skills":
        if ( data.name === "" || data.name === null || data.name === undefined ) {
          this.val = false;
        }
        break;
      case "blocks":
        if ( data.name === "" || data.name === null || data.name === undefined ) {
          this.val = false;
        }
        break;
    };
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
      secondId: new FormControl(level.id),
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
    this.editVariables.secondId = skill.level_id;

    this.editForm = new FormGroup({
      secondId: new FormControl(skill.level_id),
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
    this.editVariables.secondId = block.skill_id;

    this.editForm = new FormGroup({
      secondId: new FormControl(block.skill_id),
      name: new FormControl(block.name),
      status: new FormControl(block.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  addLevel(){
    let status: any;
    if(this.structureForm.value.statusLevel !== "active" && this.structureForm.value.statusLevel !== "inactive") {
      status = "active";
    }else {
      status = this.structureForm.value.statusLevel;
    }
    let add: any = {
      name: this.structureForm.value.level,
      status: status,
    }
    let type: any = "add_level"
    this.validation(add, type);
    if ( this.val ) {
      this.http.post<any>('http://localhost:4000/api/levels/add', add).subscribe({
        next: (res) => {
          this.loadLevels();
          let form: any = document.getElementById("structureForm");
          form.reset();
          this.structureForm.reset({
            level: "",
            statusLevel: ""
          });
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    } else {
      alert("Nombre requerido");
    };
  };

  addSkill(){
    let status: any;
    if(this.structureForm.value.statusSkill !== "active" && this.structureForm.value.statusSkill !== "inactive") {
      status = "active";
    }else {
      status = this.structureForm.value.statusSkill;
    }
    let add: any = {
      levelId: this.structureForm.value.levelSkill,
      name: this.structureForm.value.skill,
      status: status,
    }
    let type: any = "add_skill";
    this.validation(add, type);
    if ( this.val ) {
      this.http.post<any>('http://localhost:4000/api/skills/add', add).subscribe({
        next: (res) => {
          this.loadSkills();
          let form: any = document.getElementById("structureForm");
          form.reset();
          this.structureForm.reset({
            skill: "",
            statusSkill: "",
            levelSkill: ""
          });
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    } else {
      alert("Nombre y nivel requerido");
    };
  };

  addBlock(){
    let status: any;
    if(this.structureForm.value.statusBlock !== "active" && this.structureForm.value.statusBlock !== "inactive") {
      status = "active";
    }else {
      status = this.structureForm.value.statusBlock;
    }
    let add: any = {
      name: this.structureForm.value.block,
      skillId: this.structureForm.value.skillBlock,
      status: status,
    }
    let type: any = "add_block"
    this.validation(add, type);
    if ( this.val ) {
      this.http.post<any>('http://localhost:4000/api/blocks/add', add).subscribe({
        next: (res) => {
          let form: any = document.getElementById("structureForm");
          form.reset();
          this.loadBlocks();
          this.structureForm.reset({
            block: "",
            statusBlock: "",
            skillBlock: ""
          });
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    } else {
      alert("Nombre y destreza requerido");
    };
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
    let changes: any = {
      name: this.editForm.value.name,
      status: this.editForm.value.status,
      action: this.editVariables.action,
      id: this.editVariables.id,
      secondId: this.editForm.value.secondId
    };
    this.validation(changes, this.editVariables.type);
    if ( this.val ) {
      this.charge = true;
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
    } else {
      alert("Nombre requerido");
    };
  };

  deleteLevel(level: any){
    this.deleteVariables.id = level.id;
    this.deleteVariables.name = level.name;
    this.deleteVariables.status = level.status;
    this.deleteVariables.type = "levels";
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
  };

  deleteSkill(skill: any){
    this.deleteVariables.id = skill.id;
    this.deleteVariables.name = skill.name;
    this.deleteVariables.status = skill.status;
    this.deleteVariables.type = "skills";
    this.deleteVariables.level = skill.level_name;
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
  };

  deleteBlock(block: any){
    this.deleteVariables.id = block.id;
    this.deleteVariables.name = block.name;
    this.deleteVariables.status = block.status;
    this.deleteVariables.type = "blocks";
    this.deleteVariables.skill = block.skill_name;
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
  };

  delete(){
    this.charge = true;
    let del: any = {}; 
    del.id = this.deleteVariables.id;
    this.http.put<any>(`http://localhost:4000/api/${this.deleteVariables.type}/delete`,del).subscribe({
      next: (res) => {
        this.charge = false;
        if( this.deleteVariables.type === "levels" ){
          this.loadLevels();
        }else if( this.deleteVariables.type === "skills" ){
          this.loadSkills();
        }else if( this.deleteVariables.type === "blocks" ){
          this.loadBlocks();
        }
        this.charge = false;
        this.closeDeleteModal();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

}