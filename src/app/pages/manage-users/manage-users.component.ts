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
    this.http.get<any>('http://localhost:4000/api/users').subscribe({
      next: (res) => {
        this.users = res;
        console.log(res)
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

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
    
      this.http.put<any>('http://localhost:4000/api/users/filter', filters).subscribe({
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
