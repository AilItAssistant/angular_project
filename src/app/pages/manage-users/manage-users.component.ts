import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

  deleteVariables: any = {};
  charge: boolean = false;

  users: any = [
    {
      id: 1,
      name: "José Carlos",
      surname: "Fernández Giménez",
      mobile: "+659635214587",
      email: "marketingassistant@ailmadr55id.com",
      status: true,
      city: "Malaga",
      permissions: "",
      position: "profesor"
    },
    {
      id: 2,
      name: "María Fernanda",
      surname: "González Perez",
      mobile: "+654985645132",
      email: "marketingassistant@ailma55drid.com",
      status: false,
      city: "Madrid",
      permissions: "",
      position: "profesor"
    }
  ];

  addUserForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    mobile: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    permissions: new FormControl(""),
    position: new FormControl(""),
    status: new FormControl(""),
  });

  editUserForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    mobile: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    permissions: new FormControl(""),
    position: new FormControl(""),
    status: new FormControl(""),
  });

  constructor(private http: HttpClient) {}

  addUser(){
    let user: any = {
      name: this.addUserForm.value.name,
      surname: this.addUserForm.value.surname,
      mobile: this.addUserForm.value.mobile,
      email: this.addUserForm.value.email,
      city: this.addUserForm.value.city,
      permissions: this.addUserForm.value.permissions,
      position: this.addUserForm.value.position,
      status: this.addUserForm.value.status,
    };
    
    console.log(this.addUserForm.value);

    this.http.post<any>('http://localhost:4000/api/user', user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
      });
  };

  openDeleteModal(user: any){
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
    this.deleteVariables = user;
  };

  delete(){
    console.log(this.deleteVariables.id)
    this.http.delete<any>('http://localhost:4000/api/user', this.deleteVariables.id).subscribe({
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
      name: this.editUserForm.value.name,
      surname: this.editUserForm.value.surname,
      mobile: this.editUserForm.value.mobile,
      status: this.editUserForm.value.status,
      email: this.editUserForm.value.email,
      city: this.editUserForm.value.city,
      permissions: this.editUserForm.value.permissions,
      position: this.editUserForm.value.position,
      action: "modify"
    };
  
    this.http.put<any>('http://localhost:4000/api/user', mod).subscribe({
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

  openEditModal(user: any){
    this.editUserForm = new FormGroup({
      name: new FormControl(user.name),
      surname: new FormControl(user.surname),
      mobile: new FormControl(user.mobile),
      email: new FormControl(user.email),
      city: new  FormControl(user.city),
      permissions: new FormControl(user.permissions),
      position: new FormControl(user.position),
      status: new FormControl(user.status),
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  desactivate(user: any){
    let des: any = {};
    des.id = user.id;
    des.action = "desactivate";
    this.http.put<any>('http://localhost:4000/api/user', des).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
    });
  };

}
