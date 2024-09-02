import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-teachers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-teachers.component.html',
  styleUrl: './manage-teachers.component.scss'
})
export class ManageTeachersComponent {

  deleteVariables: any = {};
  charge: boolean = false;
  teachers: any = [];

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
  });

  ngOnInit() {
    this.load();
  }
  
  load(){
    this.http.get<any>('http://localhost:4000/api/teachers').subscribe({
      next: (res) => {
        this.teachers = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addTeachersForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    mobile: new FormControl(""),
    email: new FormControl(""),
    status: new FormControl(""),
  });

  editTeachersForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    mobile: new FormControl(""),
    email: new FormControl(""),
    status: new FormControl(""),
  });

  addTeacher(){
    let teacher: any = {
      name: this.addTeachersForm.value.name,
      surname: this.addTeachersForm.value.surname,
      mobil: this.addTeachersForm.value.mobile,
      email: this.addTeachersForm.value.email,
      status: this.addTeachersForm.value.status,
    };
    
    console.log(this.addTeachersForm.value);

    this.http.post<any>('http://localhost:4000/api/teachers', teacher).subscribe({
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
    this.http.delete<any>('http://localhost:4000/api/teachers', this.deleteVariables.id).subscribe({
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
      name: this.editTeachersForm.value.name,
      surname: this.editTeachersForm.value.surname,
      mobile: this.editTeachersForm.value.mobile,
      email: this.editTeachersForm.value.email,
      status: this.editTeachersForm.value.status,
      action: "modify"
    };
  
    this.http.put<any>('http://localhost:4000/api/teachers', mod).subscribe({
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

  openEditModal(teacher: any){
    this.editTeachersForm = new FormGroup({
      name: new FormControl(teacher.name),
      surname: new FormControl(teacher.surname),
      mobile: new FormControl(teacher.mobile),
      email: new FormControl(teacher.email),
      status: new FormControl(teacher.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  desactivate(teacher: any){
    let des: any = {};
    des.id = teacher.id;
    des.action = "desactivate";
    this.http.put<any>('http://localhost:4000/api/teachers', des).subscribe({
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
        this.teachers.sort( (a:any, b:any) => {
          if (a.last_name > b.last_name) {
            return 1;
          }
          if (a.last_name < b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "lastName_desc":
        this.teachers.sort( (a:any, b:any) => {
          if (a.last_name < b.last_name) {
            return 1;
          }
          if (a.last_name > b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "department_asc":
          this.teachers.sort( (a:any, b:any) => {
          if (a.department > b.department) {
            return 1;
          }
          if (a.department < b.department) {
            return -1;
          }
          return 0});
        break;
      case "department_desc":
        this.teachers.sort( (a:any, b:any) => {
          if (a.department < b.department) {
            return 1;
          }
          if (a.department > b.department) {
            return -1;
          }
          return 0});
        break;
    };
  };

}