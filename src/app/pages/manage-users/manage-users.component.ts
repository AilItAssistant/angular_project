import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

  deleteVariables: any = {};
  editVariables: any;
  charge: boolean = false;
  users: any = [];

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
    last_name: new FormControl(""),
    username: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    permissions: new FormControl(""),
    status: new FormControl(""),
  });

  ngOnInit() {
    this.load();
  }
  
  load(){
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.get<any>('http://localhost:4000/api/users', {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.users = res.users;
        console.log(res)
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addUserForm = new FormGroup({
    name: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    permissions: new FormControl(""),
    position: new FormControl(""),
    status: new FormControl(""),
    created: new FormControl(""),
    username: new FormControl("")
  });

  editUserForm = new FormGroup({
    name: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    permissions: new FormControl(""),
    position: new FormControl(""),
    status: new FormControl(""),
    created: new FormControl(""),
    username: new FormControl("")
  });

  addUser(){
    if(this.addUserForm.value.status === ""){this.addUserForm.value.status = "active"}
    console.log(this.addUserForm)
    let user: any = {
      name: this.addUserForm.value.name,
      last_name: this.addUserForm.value.last_name,
      phone_number: this.addUserForm.value.phone_number,
      email: this.addUserForm.value.email,
      city: this.addUserForm.value.city,
      permissions: this.addUserForm.value.permissions,
      position: this.addUserForm.value.position,
      status: this.addUserForm.value.status,
      created: this.addUserForm.value.created,
      username: this.addUserForm.value.username
    };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.post<any>('http://localhost:4000/api/users/add', user, {headers: httpHeaders}).subscribe({
      next: (res) => {
        console.log(res);
        this.load();
      },
      error: (err) => {
        alert('Cargar fallo' + err);
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
    let del: any = {id: this.deleteVariables.id}
    this.charge = true;
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/users/delete', del, {headers: httpHeaders}).subscribe({
      next: (res) => {
        console.log(res)
        let deleteModal: any;
        this.load();
        deleteModal = document.getElementById('deleteModal');
        deleteModal.style.display="none";
        this.charge = false
      },
      error: (err) => {
        alert('Cargar fallo' + err);
        this.charge = false;
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
    if(this.editUserForm.value.position === null){this.editUserForm.value.position = ""}
    if(this.editUserForm.value.created === null){this.editUserForm.value.created = ""}
    if(this.editUserForm.value.last_name === null){this.editUserForm.value.last_name = ""}
    let mod: any = {
      name: this.editUserForm.value.name,
      last_name: this.editUserForm.value.last_name,
      phone_number: this.editUserForm.value.phone_number,
      status: this.editUserForm.value.status,
      email: this.editUserForm.value.email,
      city: this.editUserForm.value.city,
      role: this.editUserForm.value.permissions,
      position: this.editUserForm.value.position,
      created: this.editUserForm.value.created,
      id: this.editVariables.id
    };
    console.log(mod);
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/users/edit', mod, {headers: httpHeaders}).subscribe({
      next: (res) => {
        console.log(res);
        let editModal: any;
        editModal = document.getElementById('editModal');
        editModal.style.display="none";
        this.load();
        this.charge = false;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  openEditModal(user: any){
    this.editUserForm = new FormGroup({
      name: new FormControl(user.name),
      last_name: new FormControl(user.last_name),
      phone_number: new FormControl(user.phone_number),
      email: new FormControl(user.email),
      city: new  FormControl(user.city),
      permissions: new FormControl(user.permissions),
      position: new FormControl(user.position),
      status: new FormControl(user.status),
      created: new FormControl(user.created),
      username: new FormControl(user.username)
    });
    this.editVariables = user;

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  desactivate(user: any){
    let des: any = {id: user.id, status: user.status};
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/users/status', des, {headers: httpHeaders}).subscribe({
      next: (res) => {
        console.log(res);
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
        this.users.sort( (a:any, b:any) => {
          if (a.last_name > b.last_name) {
            return 1;
          }
          if (a.last_name < b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "lastName_desc":
        this.users.sort( (a:any, b:any) => {
          if (a.last_name < b.last_name) {
            return 1;
          }
          if (a.last_name > b.last_name) {
            return -1;
          }
          return 0});
        break;
      case "city_asc":
          this.users.sort( (a:any, b:any) => {
          if (a.city > b.city) {
            return 1;
          }
          if (a.city < b.city) {
            return -1;
          }
          return 0});
        break;
      case "city_desc":
        this.users.sort( (a:any, b:any) => {
          if (a.city < b.city) {
            return 1;
          }
          if (a.city > b.city) {
            return -1;
          }
          return 0});
        break;
      case "permissions_asc":
        this.users.sort( (a:any, b:any) => {
          if (a.permissions > b.permissions) {
            return 1;
          }
          if (a.permissions < b.permissions) {
            return -1;
          }
          return 0});
        break;
      case "permissions_desc":
        this.users.sort( (a:any, b:any) => {
          if (a.permissions < b.permissions) {
            return 1;
          }
          if (a.permissions > b.permissions) {
            return -1;
          }
          return 0});
        break;
        case "role_asc":
        this.users.sort( (a:any, b:any) => {
          if (a.role > b.role) {
            return 1;
          }
          if (a.role < b.role) {
            return -1;
          }
          return 0});
        break;
      case "role_desc":
        this.users.sort( (a:any, b:any) => {
          if (a.role < b.role) {
            return 1;
          }
          if (a.role > b.role) {
            return -1;
          }
          return 0});
        break;
        case "created_asc":
        this.users.sort( (a:any, b:any) => {
          if (a.created_at > b.created_at) {
            return 1;
          }
          if (a.created_at < b.created_at) {
            return -1;
          }
          return 0});
        break;
      case "created_desc":
        this.users.sort( (a:any, b:any) => {
          if (a.created_at < b.created_at) {
            return 1;
          }
          if (a.created_at > b.created_at) {
            return -1;
          }
          return 0});
        break;
    };
  };

  filter(){
    console.log( this.orderForm.value);
    let filters: any = {
      email: this.orderForm.value.email,
      last_name: this.orderForm.value.last_name,
      username: this.orderForm.value.username,
      phone_number: this.orderForm.value.phone_number,
      city: this.orderForm.value.city,
      permissions: this.orderForm.value.permissions,
      status: this.orderForm.value.status,
      
    };
    if(filters.city === ""){filters.city = null};
    if(filters.last_name === ""){filters.last_name = null};
    if(filters.phone_number === ""){filters.phone_number = null};
    if(filters.username === ""){filters.username = null};
    if(filters.email === ""){filters.email = null};
    if(filters.permissions === ""){filters.permissions = null};
    if(filters.status === ""){filters.status = null};
    
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/users/filter', filters, {headers: httpHeaders}).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  deleteFilter(){
    this.load();
    this.orderForm.reset({
      last_name:"",
      username:"",
      phone_number:"",
      email:"",
      city:"",
      permissions:"",
      status:"",
    });
  };

}