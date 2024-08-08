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

  students: any = [
    {
      id: 1,
      name: "José Carlos",
      surname: "Fernández Giménez",
      document: "x25143698x",
      birthday: "2000-03-03",
      mobile: "+657613852",
      email: "marketing@ailmadrid.com",
      status: true,
      city: "Vallecas",
      genre: "male",
      classes: [
        {
          id: 4,
          number_students:7,
          level: "A2",
          type: "full time",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 5,
          number_students: 8,
          level: "Otro",
          type: "cocina",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 6,
          number_students: 19,
          level: "Otro",
          type: "ocio",
          teacher: "María Fernanda",
          status: false,
        }
      ]
    },
    {
      id: 2,
      name: "María Fernanda",
      surname: "González Perez",
      document: "x14785236x",
      birthday: "2000-03-03",
      mobile: "+654645132",
      email: "marketing@ailmadrid.com",
      status: false,
      city: "Principado de Mónaco",
      genre: "female",
      classes: [
        {
          id: 1,
          number_students: 4,
          level: "A2",
          type: "full time",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 2,
          number_students: 10,
          level: "A2",
          type: "cocina",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 3,
          number_students: 100,
          level: "A2",
          type: "personalizadas",
          teacher: "María Fernanda",
          status: true,
        }
      ]
    }
  ];

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

  constructor(private http: HttpClient) {}

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

}
