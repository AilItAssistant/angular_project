import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {FormControl, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-manage-structure',
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
  activeLevels: any = [];
  questionsTypes: any = [];
  blocksExams: any = [];
  unionsSkills: any = [];
  skillToUnion: any = [];
  activeSkills: any = [];

  structureForm = new FormGroup({
    level: new FormControl(""),
    block: new FormControl(""),
    skill: new FormControl(""),
    levelSkill: new FormControl(""),
    skillBlock: new FormControl(""),
    searchLevel: new FormControl(""),
    searchSkill: new FormControl(""),
    searchLevelSkill: new FormControl(""),
    searchBlock: new FormControl(""),
    searchSkillBlock: new FormControl(""),
    blockScore: new FormControl(""),
    blockType: new FormControl(""),
    puntuation: new FormControl(""),
    is_selected: new FormControl(""),
  });

  editForm = new FormGroup({
    secondId: new FormControl(""),
    name: new FormControl(""),
    blockScore: new FormControl(""),
    blockType: new FormControl(""),
    skill1: new FormControl(""),
    skill2: new FormControl(""),
    level: new FormControl(""),
    statement: new FormControl(""),
    puntuation: new FormControl(""),
    is_selected: new FormControl(""),
    skill: new FormControl(""),
  });

  blocksToExams = new FormGroup({
    select: new FormControl(true),
    notSelect: new FormControl(false),
  });

  skillsUnions = new FormGroup({
    name: new FormControl(""),
    statement: new FormControl(""),
    max_score: new FormControl("")
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.controlPage();
    this.loadLevels();
    this.loadActiveLevels();
    this.loadSkills();
    this.loadBlocks();
    this.loadActiveSkills();
    this.loadQuestionType();
    this.loadBlocksToExam();
    this.loadSkillsUnions();
  };

  controlPage(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
    'authorization': auth
    });
    let data: any = { name: "manage_estructure"};
    this.http.post<any>('http://localhost:4000/api/user_actions/entrypage', data, {headers: httpHeaders}).subscribe({
        next: (res) => {},
        error: (err) => { alert('Cargar fallo' + err); },
    });
};

  loadActiveSkills(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/skills/active', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.activeSkills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadActiveLevels(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/levels/active', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.activeLevels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadSkillsUnions(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/skills_unions', {headers: httpHeaders}).subscribe({
      next: (res) => {
        console.log(res)
        this.unionsSkills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadBlocksToExam(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/levels/activeLevelsSkillsBlocks', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.blocksExams = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadQuestionType(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/types', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.questionsTypes = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
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
        if ( data.name === "" || data.name === null || data.name === undefined ){
          this.val = false;
          id.style.display="is-invalid";
        } else {
          id.style.display="is-valid";
        };
        break;
      case "add_block:":
        id = document.getElementById('block');
        if (
          data.name === "" || data.name === null || data.name === undefined &&
          data.score === "" || data.score == null || data.score === undefined &&
          data.puntuation === "" || data.puntuation == null || data.puntuation === undefined &&
          data.type === "" || data.type == null || data.type === undefined ){
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
        if ( data.name === "" || data.name === undefined &&
          data.secondId === "" || data.secondId === undefined
        ) {
          this.val = false;
        }
        break;
      case "blocks":
        if (
          data.name === "" || data.name === undefined &&
          data.secondId === "" || data.secondId === undefined
          && data.score === "" || data.score === undefined
          && data.type === "" || data.type === undefined
        ) {
          this.val = false;
        }
        break;
    };
  };

  loadLevels(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/levels', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.levels = res.levels;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadSkills(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/skills', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.skills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadBlocks(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/blocks', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.blocks = res.blocks;
        console.log(this.blocks)
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
      blockScore: new FormControl(""),
      blockType: new FormControl(""),
      skill1: new FormControl(""),
      skill2: new FormControl(""),
      level: new FormControl(""),
      statement: new FormControl(""),
      puntuation: new FormControl(""),
      is_selected:new FormControl(""),
      skill: new FormControl(""),
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
      blockScore: new FormControl(""),
      blockType: new FormControl(""),
      skill1: new FormControl(""),
      skill2: new FormControl(""),
      level: new FormControl(""),
      statement: new FormControl(""),
      puntuation: new FormControl(""),
      is_selected: new FormControl(""),
      skill: new FormControl(""),
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
      blockScore: new FormControl(block.max_score),
      blockType: new FormControl(block.question_type_id),
      skill1: new FormControl(""),
      skill2: new FormControl(""),
      level: new FormControl(""),
      statement: new FormControl(""),
      puntuation: new FormControl(block.individual_score),
      is_selected: new FormControl(block.is_selected),
      skill: new FormControl(""),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  addLevel(){
    let add: any = {
      name: this.structureForm.value.level,
    };
    let type: any = "add_level";
    this.validation(add, type);
    if ( this.val ) {
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      this.http.post<any>('http://localhost:4000/api/levels/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.loadLevels();
          this.loadActiveLevels();
          let form: any = document.getElementById("structureForm");
          form.reset();
          this.structureForm.reset({
            level: ""
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
    let add: any = {
      levelId: this.structureForm.value.levelSkill,
      name: this.structureForm.value.skill,
      status: status,
    };
    this.validation(add, "add_skill");
    if ( this.val ) {
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      this.http.post<any>('http://localhost:4000/api/skills/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          this.loadSkills();
          this.loadActiveSkills();
          let form: any = document.getElementById("structureForm");
          form.reset();
          this.structureForm.reset({
            skill: "",
            levelSkill: "",
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
    let add: any = {
      name: this.structureForm.value.block,
      puntuation: this.structureForm.value.puntuation,
      score: this.structureForm.value.blockScore,
      type: this.structureForm.value.blockType,
      is_selected: this.structureForm.value.is_selected,
    }
    this.validation(add, "add_block");
    if ( this.val ) {
      let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
      console.log(add)
      this.http.post<any>('http://localhost:4000/api/blocks/add', add, {headers: httpHeaders}).subscribe({
        next: (res) => {
          let form: any = document.getElementById("structureForm");
          form.reset();
          this.loadBlocks();
          this.loadBlocksToExam();
          this.structureForm.reset({
            block: "",
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
    if ( level.status_name === "active" ) {
      change = 0
    } else {
      change = 1
    }
    let status: any = {
      id: level.id,
      status: change
    }
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/levels/status', status, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadLevels();
        this.loadActiveLevels();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  desactivateBlock(block: any){
    let change: any;
    if ( block.status === "active" ) {
      change = 0
    } else {
      change = 1
    }
    let status: any = {
      id: block.id,
      status: change
    }
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/blocks/status', status, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadBlocks();
        this.loadBlocksToExam();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  desactivateSkill(skill: any){
    let change: any;
    if ( skill.status_name === "active" ) {
      change = 0
    } else {
      change = 1
    }
    let status: any = {
      id: skill.id,
      status: change
    }
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/skills/status', status, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkills();
        this.loadActiveSkills();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  modify(){
    console.log(this.editVariables.structure)
    let changes: any = {
      name: this.editForm.value.name === this.editVariables.structure.name ? null : this.editForm.value.name,
      action: this.editVariables.action === this.editVariables.action ? null : this.editVariables.action,
      id: this.editVariables.id
    };
    if(changes.secondId === "") changes.secondId = null;
    if(this.editVariables.type === "blocks") {
      changes.type = this.editForm.value.blockType === this.editVariables.structure.question_type_id ? null : this.editForm.value.blockType;
      changes.score = this.editForm.value.blockScore === this.editVariables.structure.max_score ? null : this.editForm.value.blockScore;
      changes.individual_score = this.editForm.value.puntuation === this.editVariables.structure.individual_score ? null : this.editForm.value.puntuation;

      changes.is_selected = this.editForm.value.is_selected === this.editVariables.structure.is_selected ? null : this.editForm.value.is_selected;
    };
    if(this.editVariables.type === "skills_unions"){
      changes.statement = this.editForm.value.statement === this.editVariables.structure.statement ? null : this.editForm.value.statement;
      changes.name = this.editForm.value.name === this.editVariables.structure.name ? null : this.editForm.value.name;
      changes.max_score = this.editForm.value.puntuation === this.editVariables.structure.max_puntuation ? null : this.editForm.value.puntuation;
    }
    console.log(changes)
    this.validation(changes, this.editVariables.type);
    if ( this.val ) {
      this.charge = true;
      let auth: any = localStorage.getItem('token');
      let httpHeaders: any = new HttpHeaders({
        'authorization': auth
      });
      this.http.put<any>(`http://localhost:4000/api/${this.editVariables.type}/edit`, changes, {headers: httpHeaders}).subscribe({
        next: (res) => {
          console.log(res)
          let form: any = document.getElementById("editForm");
          if( this.editVariables.type === "levels" ){
            this.loadLevels();
            this.loadActiveLevels();
          }else if( this.editVariables.type === "skills" ){
            this.loadSkills();
            this.loadActiveSkills();
          }else if( this.editVariables.type === "blocks" ){
            this.loadBlocks();
            this.loadBlocksToExam();
          }else if( this.editVariables.type === "skills_unions" ){
            this.loadSkillsUnions();
          }
          this.charge = false;
          this.closeEditModal();
          form.reset();
        },
        error: (err) => {
          alert('Cargar fallo' + err);
          this.charge = false;
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
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>(`http://localhost:4000/api/${this.deleteVariables.type}/delete`, del, {headers: httpHeaders}).subscribe({
      next: (res) => {
        if(res === 200){
          if( this.deleteVariables.type === "levels" ){
            this.loadLevels();
            this.loadActiveLevels();
          }else if( this.deleteVariables.type === "skills" ){
            this.loadSkills();
            this.loadActiveSkills();
          }else if( this.deleteVariables.type === "blocks" ){
            this.loadBlocks();
            this.loadBlocksToExam();
          }
        } else {
          alert(res);
        }
        this.charge = false;
        this.closeDeleteModal();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
        this.charge = false;
        this.closeDeleteModal();
      },
    });
  };

  search(type: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    switch(type){
      case "levels":
        let level: any = {
          name: this.structureForm.value.searchLevel
        }
        if ( level.name !== "" ) {
          this.http.put<any>('http://localhost:4000/api/levels/search', level, {headers: httpHeaders}).subscribe({
            next: (res) => {
              this.levels = res;
            },
            error: (err) => {
              alert('Cargar fallo' + err);
            },
          });
        }
        break;
      case "skills":
        let skill: any = {
          name: this.structureForm.value.searchSkill,
          level: this.structureForm.value.searchLevelSkill
        };
        if ( skill.level === "all_skills" ) {
          this.loadSkills();
        }else if ( skill.name !== "" || skill.level !== "" ){
          this.http.put<any>('http://localhost:4000/api/skills/search', skill, {headers: httpHeaders}).subscribe({
            next: (res) => {
              this.skills = res;
            },
            error: (err) => {
              alert('Cargar fallo' + err);
            },
          });
        };
        break;
      case "blocks":
        let block: any = {
          name: this.structureForm.value.searchBlock,
          skill: this.structureForm.value.searchSkillBlock
        }
        if ( block.skill === "all_blocks") {
          this.loadBlocks();
        }else if ( block.name !== "" || block.skill !== "" ){
          this.http.put<any>('http://localhost:4000/api/blocks/search', block, {headers: httpHeaders}).subscribe({
            next: (res) => {
              this.blocks = res;
            },
            error: (err) => {
              alert('Cargar fallo' + err);
            },
          });
        };
        break;
    };
  };

  cleanSearch(type: string){
    switch(type){
      case "levels":
        this.loadLevels();
        this.structureForm.reset({
          searchLevel: ""
        });
        break;
        case "skills":
          this.loadSkills();
          this.structureForm.reset({
            searchSkill: "",
            searchLevelSkill: ""
          });
          break;
        case "blocks":
          this.loadBlocks();
        this.structureForm.reset({
          searchBlock: "",
          searchSkillBlock: ""
        });
        break;
    }
  };

  selectChange(id: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let block: any = { id: id }
    this.http.put<any>('http://localhost:4000/api/blocks/selected', block, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadBlocksToExam();
        this.loadBlocks();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  statusUnion(id: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let union: any = {id: id};
    this.http.put<any>('http://localhost:4000/api/skills_unions/status', union, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkillsUnions();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteUnionModal(data: any){
    this.deleteVariables.id = data.id;
    this.deleteVariables.name = data.name;
    this.deleteVariables.status = data.status;
    this.deleteVariables.statement = data.statement;
    this.deleteVariables.skill_name_1 = data.skill_name_1;
    this.deleteVariables.skill_name_2 = data.skill_name_2;
    this.deleteVariables.type = "union";
    this.deleteVariables.level = data.level_name;
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
  };

  deleteUnion(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let union: any = { id: this.deleteVariables.id };
    this.http.put<any>(`http://localhost:4000/api/skills_unions/delete`, union, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkillsUnions();
        this.closeDeleteModal();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addSkillUnion(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      name: this.skillsUnions.value.name,
      statement: this.skillsUnions.value.statement,
      max_score: this.skillsUnions.value.max_score,
    };
    console.log(add)
    this.http.post<any>('http://localhost:4000/api/skills_unions/add', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkillsUnions();
        let form: any = document.getElementById("skillsUnions");
        form.reset();
        this.skillsUnions.reset({
          name: "",
          statement: "",
          max_score:""
        });
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  openSkillsUnionEdit(skillUnion: any){
    this.editVariables.type = "skills_unions";
    this.editVariables.id = skillUnion.id;
    this.editVariables.structure = skillUnion;
    this.editVariables.action = "modify";
    this.editForm = new FormGroup({
      secondId: new FormControl(""),
      name: new FormControl(skillUnion.name),
      blockScore: new FormControl(""),
      blockType: new FormControl(""),
      skill1: new FormControl(""),
      skill2: new FormControl(""),
      level: new FormControl(""),
      statement: new FormControl(skillUnion.statement),
      puntuation: new FormControl(skillUnion.max_score),
      is_selected: new FormControl(""),
      skill: new FormControl(""),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  addLeveltoSkill(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      skill_id: this.editVariables.id,
      level_id: this.editForm.value.level,
    };
    this.http.post<any>('http://localhost:4000/api/skills/addLeveltoSkill', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkills();
        this.editVariables.structure.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteLeveltoSkill(level: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      skill_id: this.editVariables.id,
      level_id: level.level_id,
    };
    console.log(add)
    this.http.put<any>('http://localhost:4000/api/skills/deleteLeveltoSkill', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkills();
        this.editVariables.structure.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addSkilltoBlock(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      block_id: this.editVariables.id,
      skill_id: this.editForm.value.skill,
    };
    console.log(add)
    this.http.post<any>('http://localhost:4000/api/blocks/addSkilltoBlock', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        if(res === "Already exist"){
          alert("Solo se puede añadir una destreza por bloque")
        } else {
          this.loadBlocks();
          this.editVariables.structure.skills = res;
        }
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteSkilltoBlock(skill: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      block_id: this.editVariables.id,
      skill_id: skill.skill_id,
    };
    console.log(add)
    this.http.put<any>('http://localhost:4000/api/blocks/deleteSkilltoBlock', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadBlocks();
        this.editVariables.structure.skills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addLeveltoBlock(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      block_id: this.editVariables.id,
      level_id: this.editForm.value.level,
    };
    this.http.post<any>('http://localhost:4000/api/blocks/addLeveltoBlock', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadBlocks();
        this.editVariables.structure.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteLeveltoBlock(level: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      block_id: this.editVariables.id,
      level_id: level.level_id,
    };
    console.log(add)
    this.http.put<any>('http://localhost:4000/api/blocks/deleteLeveltoBlock', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadBlocks();
        this.editVariables.structure.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addLeveltoUnion(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      union_id: this.editVariables.id,
      level_id: this.editForm.value.level,
    };
    this.http.post<any>('http://localhost:4000/api/skills_unions/addLeveltoUnion', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkillsUnions();
        this.editVariables.structure.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteLeveltoUnion(level: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      union_id: this.editVariables.id,
      level_id: level.level_id,
    };
    console.log(add)
    this.http.put<any>('http://localhost:4000/api/skills_unions/deleteLeveltoUnion', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkillsUnions();
        this.editVariables.structure.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addSkilltoUnion(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      union_id: this.editVariables.id,
      skill_id: this.editForm.value.skill,
    };
    this.http.post<any>('http://localhost:4000/api/skills_unions/addSkilltoUnion', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkillsUnions();
        this.editVariables.structure.skills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteSkilltoUnion(skill: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    let add: any = {
      union_id: this.editVariables.id,
      skill_id: skill.skill_id,
    };
    console.log(add)
    this.http.put<any>('http://localhost:4000/api/skills_unions/deleteSkilltoUnion', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadSkillsUnions();
        this.editVariables.structure.skills = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

};