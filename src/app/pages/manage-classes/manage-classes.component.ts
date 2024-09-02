import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-classes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-classes.component.html',
  styleUrl: './manage-classes.component.scss'
})
export class ManageClassesComponent {

  deleteVariables: any = {};
  charge: boolean = false;

  classes: any = [];

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
  });

  ngOnInit() {
    this.load();
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
  
  addClassesForm = new FormGroup({
    teacher: new FormControl(""),
    level: new FormControl(""),
    type: new FormControl(""),
    status: new FormControl("")
  });

  editClassesForm = new FormGroup({
    teacher: new FormControl(""),
    level: new FormControl(""),
    type: new FormControl(""),
    status: new FormControl("")
  });

  addClass(){
    let classes: any = {
      name: this.addClassesForm.value.teacher,
      surname: this.addClassesForm.value.level,
      mobil: this.addClassesForm.value.type,
      status: this.addClassesForm.value.status,
    };
    
    console.log(this.addClassesForm.value);

    this.http.post<any>('http://localhost:4000/api/classes', classes).subscribe({
      next: (res) => {
        console.log(res);
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
    console.log(this.deleteVariables.id)
    this.http.delete<any>('http://localhost:4000/api/classes', this.deleteVariables.id).subscribe({
      next: (res) => {
        console.log(res)
        let deleteModal: any;
        deleteModal = document.getElementById('deleteModal');
        deleteModal.style.display="none";
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

    let mod: any = {
      name: this.editClassesForm.value.teacher,
      surname: this.editClassesForm.value.level,
      mobile: this.editClassesForm.value.type,
      status: this.editClassesForm.value.status,
      action: "modify"
    };
  
    this.http.put<any>('http://localhost:4000/api/classes', mod).subscribe({
      next: (res) => {
        console.log(res)
        let editModal: any;
        editModal = document.getElementById('editModal');
        editModal.style.display="none";
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
  };

  openEditModal(classes: any){
    this.editClassesForm = new FormGroup({
      teacher: new FormControl(classes.teacher),
      level: new FormControl(classes.level),
      type: new FormControl(classes.type),
      status: new FormControl(classes.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  desactivate(classes: any){
    let des: any = {};
    des.id = classes.id;
    des.action = "desactivate";
    this.http.put<any>('http://localhost:4000/api/classes', des).subscribe({
      next: (res) => {
        console.log(res)
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

}