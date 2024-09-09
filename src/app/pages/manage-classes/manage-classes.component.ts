import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-manage-classes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-classes.component.html',
  styleUrl: './manage-classes.component.scss'
})
export class ManageClassesComponent {

  deleteVariables: any = {};
  editVaribles: any;
  charge: boolean = false;

  classes: any = [];
  levels: any;
  teachers: any;

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
    this.http.get<any>('http://localhost:4000/api/classes').subscribe({
      next: (res) => {
        this.classes = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadTeachers(){
    this.http.get<any>('http://localhost:4000/api/teachers').subscribe({
      next: (res) => {
        this.teachers = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  loadlevels(){
    this.http.get<any>('http://localhost:4000/api/levels').subscribe({
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
    status: new FormControl(""),
    schedule: new FormControl(""),
    name: new FormControl(""),
    class: new FormControl("")
  });

  editClassesForm = new FormGroup({
    teacher: new FormControl(""),
    level: new FormControl(""),
    status: new FormControl(""),
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
      status: this.addClassesForm.value.status,
    };
    
    console.log(classes);

    this.http.post<any>('http://localhost:4000/api/classes/add', classes).subscribe({
      next: (res) => {
        console.log(res);
        this.load();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
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
    this.http.put<any>('http://localhost:4000/api/classes/delete', del).subscribe({
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
      status: this.editClassesForm.value.status,
      id:this.editVaribles.class_id
    };
    console.log(mod)
    this.http.put<any>('http://localhost:4000/api/classes/edit', mod).subscribe({
      next: (res) => {
        console.log(res);
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
    console.log(classes)
    this.editVaribles = classes;
    this.editClassesForm = new FormGroup({
      teacher: new FormControl(classes.teacher_id),
      level: new FormControl(classes.level_id),
      status: new FormControl(classes.class_status),
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
    des = {id: classes.class_id, status: classes.class_status}
    this.http.put<any>('http://localhost:4000/api/classes/status', des).subscribe({
      next: (res) => {
        this.load();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
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

      this.http.put<any>('http://localhost:4000/api/classes/filter', filters).subscribe({
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

}