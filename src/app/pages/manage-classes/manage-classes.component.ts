import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { scheduled } from 'rxjs';

@Component({
  standalone: true,
    selector: 'app-manage-classes',
    imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
    templateUrl: './manage-classes.component.html',
    styleUrl: './manage-classes.component.scss'
})
export class ManageClassesComponent {

  relationsVariables: any;
  deleteVariables: any = {};
  editVaribles: any;
  charge: boolean = false;

  classes: any = [];
  levels: any = [];
  teachers: any = [];
  students: any = [];
  teachersId: any = [];
  studentsId: any = [];

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
    class: new FormControl(""),
    last_name: new FormControl(""),
    level: new FormControl(""),
    class_name: new FormControl(""),
  });

  ngOnInit() {
    this.load();
    this.loadTeachers();
    this.loadlevels();
  }

  load(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth,
    });
    this.http.get<any>('http://localhost:4000/api/classes', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.classes = res.classes;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadTeachers(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/teachers', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.teachers = res.teachers;
        console.log(this.teachers)
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadlevels(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/levels/active', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addClassesForm = new FormGroup({
    teacher: new FormControl(""),
    level: new FormControl(""),
    schedule: new FormControl(""),
    name: new FormControl(""),
    class: new FormControl("")
  });

  editClassesForm = new FormGroup({
    teacher: new FormControl(""),
    level: new FormControl(""),
    schedule: new FormControl(""),
    name: new FormControl(""),
    class: new FormControl("")
  });

  addClass(){
    let classes: any = {
      name: this.addClassesForm.value.name,
      teacher_id: this.addClassesForm.value.teacher,
      schedule: this.addClassesForm.value.schedule,
      level: this.addClassesForm.value.level,
      class: this.addClassesForm.value.class,
    };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.post<any>('http://localhost:4000/api/classes/add', classes, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.load();
        this.addClassesForm = new FormGroup({
          teacher: new FormControl(""),
          level: new FormControl(""),
          schedule: new FormControl(""),
          name: new FormControl(""),
          class: new FormControl("")
        });
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
      });
  };

  openDeleteModal(teacher: any){
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
    this.deleteVariables = teacher;
  };

  delete(){
    this.charge = true;
    let del: any = {id: this.deleteVariables.class_id};
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/classes/delete', del, {headers: httpHeaders}).subscribe({
      next: (res) => {
        let deleteModal: any;
        deleteModal = document.getElementById('deleteModal');
        deleteModal.style.display="none";
        this.charge = false;
        this.load();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
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

  modify(){
    this.charge = true;
    let mod: any = {
      name: this.editClassesForm.value.name,
      level: this.editClassesForm.value.level,
      teacher: this.editClassesForm.value.teacher,
      schedule: this.editClassesForm.value.schedule,
      class: this.editClassesForm.value.class,
      id:this.editVaribles.class_id
    };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/classes/edit', mod, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.load();
        let editModal: any;
        editModal = document.getElementById('editModal');
        editModal.style.display="none";
        this.charge = false;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
        this.charge = false;
      },
    });
  };

  openEditModal(classes: any){
    this.editVaribles = classes;
    this.editClassesForm = new FormGroup({
      teacher: new FormControl(classes.teacher_id),
      level: new FormControl(classes.level_id),
      schedule: new FormControl(classes.schedule),
      name: new FormControl(classes.class_name),
      class: new FormControl(classes.room_number)
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  desactivate(classes: any){
    let des: any = {};
    des = {id: classes.class_id, status: classes.class_status};
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/classes/status', des, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.load();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  order(){
    switch(this.orderForm.value.select){
      case "":
        break;
      case "lastName_asc":
        this.classes.sort( (a:any, b:any) => {
          if (a.teacher_last_name > b.teacher_last_name) {
            return 1;
          }
          if (a.teacher_last_name < b.teacher_last_name) {
            return -1;
          }
          return 0});
        break;
      case "lastName_desc":
        this.classes.sort( (a:any, b:any) => {
          if (a.teacher_last_name < b.teacher_last_name) {
            return 1;
          }
          if (a.teacher_last_name > b.teacher_last_name) {
            return -1;
          }
          return 0});
        break;
      case "level_asc":
          this.classes.sort( (a:any, b:any) => {
          if (a.class_level > b.class_level) {
            return 1;
          }
          if (a.class_level < b.class_level) {
            return -1;
          }
          return 0});
        break;
      case "level_desc":
        this.classes.sort( (a:any, b:any) => {
          if (a.class_level < b.class_level) {
            return 1;
          }
          if (a.class_level > b.class_level) {
            return -1;
          }
          return 0});
        break;
      case "className_asc":
        this.classes.sort( (a:any, b:any) => {
          if (a.class_name > b.class_name) {
            return 1;
          }
          if (a.class_name < b.class_name) {
            return -1;
          }
          return 0});
        break;
      case "className_desc":
        this.classes.sort( (a:any, b:any) => {
          if (a.class_name < b.class_name) {
            return 1;
          }
          if (a.class_name > b.class_name) {
            return -1;
          }
          return 0});
        break;
    };
  };

  filter(){
    let filters: any = {
      last_name: this.orderForm.value.last_name,
      class: this.orderForm.value.class,
      level: this.orderForm.value.level,
      class_name: this.orderForm.value.class_name,
    };
    if(filters.last_name === ""){filters.last_name = null};
    if(filters.class === ""){filters.class = null};
    if(filters.class_name === ""){filters.class_name = null};
    if(filters.level === ""){filters.level = null};

    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/classes/filter', filters, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.classes = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteFilter(){
    this.load();
    this.orderForm.reset({
      last_name: "",
      class: "",
      level: "",
      class_name: "",
    });
  };

  loadStudents(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/alumnos', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.students = res.students;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadStudentsById(id: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/alumnos/alumnosByClassId', id, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.studentsId = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadTeachersById(id: any){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/teachers/teachersByClassId', id, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.teachersId = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  openStudentsModal(classes: any){
    let id: any = { id: classes.class_id };
    this.loadStudents();
    this.loadStudentsById(id);
    this.relationsVariables = classes;
    let classStudentsModal: any;
    classStudentsModal = document.getElementById('classStudentsModal');
    classStudentsModal.style.display="block";
  };

  closeStudentsModal(){
    let classStudentsModal: any;
    classStudentsModal = document.getElementById('classStudentsModal');
    classStudentsModal.style.display="none";
  };

  openTeachersModal(classes: any){
    let id: any = { id: classes.class_id };
    this.loadTeachers();
    this.loadTeachersById(id)
    this.relationsVariables = classes;
    let classTeachersModal: any;
    classTeachersModal = document.getElementById('classTeachersModal');
    classTeachersModal.style.display="block";
  };

  closeTeachersModal(){
    let classTeachersModal: any;
    classTeachersModal = document.getElementById('classTeachersModal');
    classTeachersModal.style.display="none";
  };

  addTeacher(teacher: any){
    let add: any = {
      class_id: this.relationsVariables.class_id,
      teacher_id: teacher.teacher_id
    };
    let id: any = { id: this.relationsVariables.class_id };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/teachers/addClass', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadTeachersById(id);
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteTeacher(teacher_id: any){
    let add: any = {
      class_id: this.relationsVariables.class_id,
      teacher_id: teacher_id.teacher_id
    };
    let id: any = { id: this.relationsVariables.class_id };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/teachers/deleteClass', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadTeachersById(id);
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addStudent(student: any){
    let add: any = {
      class_id: this.relationsVariables.class_id,
      student_id: student.student_id
    };0
    let id: any = { id: this.relationsVariables.class_id };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/alumnos/addClass', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadStudentsById(id);
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteStudent(student: any){
    let add: any = {
      class_id: this.relationsVariables.class_id,
      student_id: student.student_id
    };
    let id: any = { id: this.relationsVariables.class_id };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/alumnos/deleteClass', add, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.loadStudentsById(id);
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

}