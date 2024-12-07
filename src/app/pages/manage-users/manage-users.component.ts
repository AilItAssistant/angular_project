import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

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
      },
      error: (err) => {
        alert('Cargar fallo' + err);
        this.router.navigateByUrl(`/login`);
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
    status: new FormControl(""),
    created: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    repitPassword: new FormControl(""),
  });

  editUserForm = new FormGroup({
    name: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    permissions: new FormControl(""),
    status: new FormControl(""),
    created: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    repitPassword: new FormControl(""),
  });

  addUser(){
    if(this.addUserForm.value.status === ""){this.addUserForm.value.status = "active"}
    let user: any = {
      name: this.addUserForm.value.name,
      last_name: this.addUserForm.value.last_name,
      phone_number: this.addUserForm.value.phone_number,
      email: this.addUserForm.value.email,
      city: this.addUserForm.value.city,
      permissions: this.addUserForm.value.permissions,
      status: this.addUserForm.value.status,
      created: this.addUserForm.value.created,
      username: this.addUserForm.value.username,
    };
    if ( this.addUserForm.value.password !== "" || this.addUserForm.value.repitPassword !== ""){
      if ( this.addUserForm.value.password === this.addUserForm.value.repitPassword ) {
        let add: any = {
          pass: this.addUserForm.value.password,
        };
        user = Object.assign(add, user)
        let auth: any = localStorage.getItem('token');
        let httpHeaders: any = new HttpHeaders({
          'authorization': auth
        });
        this.http.post<any>('http://localhost:4000/api/users/add', user, {headers: httpHeaders}).subscribe({
          next: (res) => {
            this.load();
          },
          error: (err) => {
            alert('Cargar fallo' + err);
          },
        });
      } else {
        alert("Las contraseñas no coinciden")
      };
    };
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
    if(this.editUserForm.value.created === null){this.editUserForm.value.created = ""}
    if(this.editUserForm.value.last_name === null){this.editUserForm.value.last_name = ""}
    let mod: any = {
      id: this.editVariables.id
    };
    if ( this.editUserForm.value.name !== null && this.editUserForm.value.name !== undefined && this.editUserForm.value.name !== this.editVariables.name ) { 
      mod.name = this.editUserForm.value.name } else {  mod.name = "" };
    if ( this.editUserForm.value.last_name !== null && this.editUserForm.value.last_name !== undefined && this.editUserForm.value.last_name !== this.editVariables.last_name ) { 
      mod.last_name = this.editUserForm.value.last_name } else {  mod.last_name = "" };
    if ( this.editUserForm.value.phone_number !== null && this.editUserForm.value.phone_number !== undefined && this.editUserForm.value.phone_number !== this.editVariables.phone_number ) { 
      mod.phone_number = this.editUserForm.value.phone_number } else {  mod.phone_number = "" };
    if ( this.editUserForm.value.status !== null && this.editUserForm.value.status !== undefined && this.editUserForm.value.status !== this.editVariables.status ) { 
      mod.status = this.editUserForm.value.status } else {  mod.status = "" };
    if ( this.editUserForm.value.email !== null && this.editUserForm.value.email !== undefined && this.editUserForm.value.email !== this.editVariables.email ) { 
      mod.email = this.editUserForm.value.email } else {  mod.email = "" };
    if ( this.editUserForm.value.city !== null && this.editUserForm.value.city !== undefined && this.editUserForm.value.city !== this.editVariables.city ) { 
      mod.city = this.editUserForm.value.city } else {  mod.city = "" };
    if ( this.editUserForm.value.permissions !== null && this.editUserForm.value.permissions !== undefined && this.editUserForm.value.permissions !== this.editVariables.permissions ) { 
      mod.permissions = this.editUserForm.value.permissions } else {  mod.permissions = "" };
    if ( this.editUserForm.value.created !== null && this.editUserForm.value.created !== undefined && this.editUserForm.value.created !== this.editVariables.created ) { 
      mod.created = this.editUserForm.value.created } else {  mod.created = "" };
    if ( this.editUserForm.value.username !== null && this.editUserForm.value.username !== undefined && this.editUserForm.value.username !== this.editVariables.username ) { 
      mod.username = this.editUserForm.value.username } else {  mod.username = "" };

    if ( this.editUserForm.value.password !== "" || this.editUserForm.value.repitPassword !== ""){
      if ( this.editUserForm.value.password === this.editUserForm.value.repitPassword ) {
        let add: any = {
          pass: this.editUserForm.value.password,
        };
        mod = Object.assign(add, mod)
      } else {
        alert("Las contraseñas no coinciden")
      }
    };
    let auth: any = localStorage.getItem('token');
    let httpHeaders: any = new HttpHeaders({
      'authorization': auth
    });
    this.http.put<any>('http://localhost:4000/api/users/edit', mod, {headers: httpHeaders}).subscribe({
      next: (res) => {
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
      status: new FormControl(user.status),
      created: new FormControl(user.created),
      username: new FormControl(user.username),
      password: new FormControl(""),
      repitPassword: new FormControl("")
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