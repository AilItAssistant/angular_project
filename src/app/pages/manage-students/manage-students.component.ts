import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-students',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-students.component.html',
  styleUrl: './manage-students.component.scss'
})
export class ManageStudentsComponent {

  charge: boolean = false;
  deleteVariables: any = {};
  students: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  orderForm = new FormGroup({
    select: new FormControl(""),
  });
  
  load(){
    this.http.get<any>('http://localhost:4000/api/alumnos').subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addStudentsForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    document: new FormControl(""),
    birthday: new FormControl(""),
    mobile: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    genre: new FormControl(""),
    status: new FormControl(""),
  });

  editForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    document: new FormControl(""),
    birthday: new FormControl(""),
    mobile: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    genre: new FormControl(""),
    status: new FormControl(""),
  });

  delete(){
    console.log(this.deleteVariables)
    this.http.delete<any>('http://localhost:4000/api/students', this.deleteVariables).subscribe({
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

  openDeleteModal(student: any){
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
    this.deleteVariables = student;
  };

  closeDeleteModal(){
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="none";
  };

  openEditModal(student: any){
    this.editForm = new FormGroup({
      name: new FormControl(student.name),
      surname: new FormControl(student.surname),
      document: new FormControl(student.document),
      birthday: new FormControl(student.birthday),
      mobile: new FormControl(student.mobile),
      email: new FormControl(student.email),
      city: new FormControl(student.city),
      genre: new FormControl(student.genre),
      status: new FormControl(student.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  closeEditModal(){
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="none";
  };

  desactivate(student: any){
    let des: any = {};
    des.id = student.id;
    des.action = "desactivate";
    this.http.put<any>('http://localhost:4000/api/students', des).subscribe({
      next: (res) => {
      console.log(res)
      },
      error: (err) => {
      //alert('Cargar fallo' + err);
      },
      });

  };

  modify(){
    this.http.put<any>('http://localhost:4000/api/students', this.editForm.value).subscribe({
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

  addStudent(){
    this.http.post<any>('http://localhost:4000/api/students', this.addStudentsForm.value).subscribe({
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

  order(){
    switch(this.orderForm.value.select){
      case "":
        break;
      case "lastName_asc":
        this.students.sort( (a:any, b:any) => {
          if (a.last_name > b.last_name) {
            return 1;
          }
          if (a.last_name < b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "lastName_desc":
        this.students.sort( (a:any, b:any) => {
          if (a.last_name < b.last_name) {
            return 1;
          }
          if (a.last_name > b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "city_asc":
          this.students.sort( (a:any, b:any) => {
          if (a.city > b.city) {
            return 1;
          }
          if (a.city < b.city) {
            return -1;
          }
          return 0});
        break;
      case "city_desc":
        this.students.sort( (a:any, b:any) => {
          if (a.city < b.city) {
            return 1;
          }
          if (a.city > b.city) {
            return -1;
          }
          return 0});
        break;
    };
  };

}
