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
  teachers: any = [
    {
      id: 1,
      name: "José Carlos",
      surname: "Fernández Giménez",
      mobile: "+659635214587",
      email: "marketingassistant@ailmadr55id.com",
      status: true,
      classes: [
        {
          id: 4,
          number_students:7,
          level: "A2",
          type: "full time",
        },
        {
          id: 5,
          number_students: 8,
          level: "Otro",
          type: "cocina",
        },
        {
          id: 6,
          number_students: 19,
          level: "Otro",
          type: "ocio",
        },
      ]
    },
    {
      id: 2,
      name: "María Fernanda",
      surname: "González Perez",
      mobile: "+654985645132",
      email: "marketingassistant@ailma55drid.com",
      status: false,
      classes: [
        {
          id: 1,
          number_students: 4,
          level: "A2",
          type: "full time",
        },
        {
          id: 2,
          number_students: 10,
          level: "A2",
          type: "cocina",
        },
        {
          id: 3,
          number_students: 100,
          level: "A2",
          type: "personalizadas",
        },
      ]
    }
  ];

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

  constructor(private http: HttpClient) {}

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

}