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

  classes: any = [
    {
      id: 4,
      number_students:7,
      level: "A2",
      type: "full time",
      teacher: "María Fernanda",
      status: true,
      students: [
        {
          id: 1,
          name: "José Carlos",
          surname: "Fernández Giménez",
          document: "x9865553214x",
          birthday: "2000-03-03",
          mobile: "+659635214587",
          email: "marketingassistant@ailmadr55id.com",
          status: true,
          city: "Vallecas",
          genre: "hombre"
        },
        {
          id: 2,
          name: "María Fernanda",
          surname: "González Perez",
          document: "x9865557414x",
          birthday: "2000-03-03",
          mobile: "+654985645132",
          email: "marketingassistant@ailma55drid.com",
          status: false,
          city: "Principado de Mónaco",
          genre: "mujer"
        }
      ]
    },
    {
      id: 5,
      number_students: 8,
      level: "Otro",
      type: "cocina",
      teacher: "María Fernanda",
      status: true,
      students: [
        {
          id: 1,
          name: "José Carlos",
          surname: "Fernández Giménez",
          document: "x9865553214x",
          birthday: "2000-03-03",
          mobile: "+659635214587",
          email: "marketingassistant@ailmadr55id.com",
          status: true,
          city: "Vallecas",
          genre: "hombre"
        },
        {
          id: 2,
          name: "María Fernanda",
          surname: "González Perez",
          document: "x9865557414x",
          birthday: "2000-03-03",
          mobile: "+654985645132",
          email: "marketingassistant@ailma55drid.com",
          status: false,
          city: "Principado de Mónaco",
          genre: "mujer"
        }
      ]
    },
    {
      id: 6,
      number_students: 19,
      level: "Otro",
      type: "ocio",
      teacher: "María Fernanda",
      status: false,
      students: [
        {
          id: 1,
          name: "José Carlos",
          surname: "Fernández Giménez",
          document: "x9865553214x",
          birthday: "2000-03-03",
          mobile: "+659635214587",
          email: "marketingassistant@ailmadr55id.com",
          status: true,
          city: "Vallecas",
          genre: "hombre"
        },
        {
          id: 2,
          name: "María Fernanda",
          surname: "González Perez",
          document: "x9865557414x",
          birthday: "2000-03-03",
          mobile: "+654985645132",
          email: "marketingassistant@ailma55drid.com",
          status: false,
          city: "Principado de Mónaco",
          genre: "mujer"
        }
      ]
    },
    {
      id: 1,
      number_students: 4,
      level: "A2",
      type: "full time",
      teacher: "María Fernanda",
      status: true,
      students: [
        {
          id: 1,
          name: "José Carlos",
          surname: "Fernández Giménez",
          document: "x9865553214x",
          birthday: "2000-03-03",
          mobile: "+659635214587",
          email: "marketingassistant@ailmadr55id.com",
          status: true,
          city: "Vallecas",
          genre: "hombre"
        },
        {
          id: 2,
          name: "María Fernanda",
          surname: "González Perez",
          document: "x9865557414x",
          birthday: "2000-03-03",
          mobile: "+654985645132",
          email: "marketingassistant@ailma55drid.com",
          status: false,
          city: "Principado de Mónaco",
          genre: "mujer"
        }
      ]
      },
    {
      id: 2,
      number_students: 10,
      level: "A2",
      type: "cocina",
      teacher: "María Fernanda",
      status: true,
      students: [
        {
          id: 1,
          name: "José Carlos",
          surname: "Fernández Giménez",
          document: "x9865553214x",
          birthday: "2000-03-03",
          mobile: "+659635214587",
          email: "marketingassistant@ailmadr55id.com",
          status: true,
          city: "Vallecas",
          genre: "hombre"
        },
        {
          id: 2,
          name: "María Fernanda",
          surname: "González Perez",
          document: "x9865557414x",
          birthday: "2000-03-03",
          mobile: "+654985645132",
          email: "marketingassistant@ailma55drid.com",
          status: false,
          city: "Principado de Mónaco",
          genre: "mujer"
        }
      ]
    },
    {
      id: 3,
      number_students: 100,
      level: "A2",
      type: "personalizadas",
      teacher: "María Fernanda",
      status: true,
      students: [
        {
          id: 1,
          name: "José Carlos",
          surname: "Fernández Giménez",
          document: "x9865553214x",
          birthday: "2000-03-03",
          mobile: "+659635214587",
          email: "marketingassistant@ailmadr55id.com",
          status: true,
          city: "Vallecas",
          genre: "hombre"
        },
        {
          id: 2,
          name: "María Fernanda",
          surname: "González Perez",
          document: "x9865557414x",
          birthday: "2000-03-03",
          mobile: "+654985645132",
          email: "marketingassistant@ailma55drid.com",
          status: false,
          city: "Principado de Mónaco",
          genre: "mujer"
        }
      ]
    },
  ];

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

  constructor(private http: HttpClient) {}

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

}