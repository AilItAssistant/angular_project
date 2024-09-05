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
  editVariables: any = {};
  charge: boolean = false;
  teachers: any = [];

  constructor(private http: HttpClient) {}

  orderForm = new FormGroup({
    select: new FormControl(""),
    department: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl("")
  });

  ngOnInit() {
    this.load();
  }
  
  load(){
    this.http.get<any>('http://localhost:4000/api/teachers').subscribe({
      next: (res) => {
        this.teachers = res;
        console.log(this.teachers)
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

  addTeachersForm = new FormGroup({
    name: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    status: new FormControl(""),
    department: new FormControl(""),
    address: new FormControl(""),
    hire_date: new FormControl("")
  });

  editTeachersForm = new FormGroup({
    name: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    status: new FormControl(""),
    department: new FormControl(""),
    address: new FormControl(""),
    hire_date: new FormControl("")
  });

  addTeacher(){
    let teacher: any = {
      name: this.addTeachersForm.value.name,
      last_name: this.addTeachersForm.value.last_name,
      phone_number: this.addTeachersForm.value.phone_number,
      email: this.addTeachersForm.value.email,
      hire_date: this.addTeachersForm.value.hire_date,
      status: this.addTeachersForm.value.status,
      address: this.addTeachersForm.value.address,
      department:this.addTeachersForm.value.department
    };
    
    console.log(this.addTeachersForm.value);

    this.http.post<any>('http://localhost:4000/api/teachers/add', teacher).subscribe({
      next: (res) => {
        console.log(res);
        this.load();
      },
      error: (err) => {
        //alert('Cargar fallo' + err);
      },
      });
  };

  openDeleteModal(teacher: any){
    console.log(teacher)
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="block";
    this.deleteVariables = teacher;
  };

  delete(){
    let del: any = { id: this.deleteVariables.teacher_id };
    console.log(del);
    this.charge = true;
    this.http.put<any>('http://localhost:4000/api/teachers/delete', del).subscribe({
      next: (res) => {
        console.log(res)
        this.load();
        let deleteModal: any;
        deleteModal = document.getElementById('deleteModal');
        deleteModal.style.display="none";
        this.charge = false;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
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
    let mod: any = {}
      mod.id = this.editVariables.teacher_id;
    
    if( this.editTeachersForm.value.name !== this.editVariables.name && this.editTeachersForm.value.name !== undefined && this.editTeachersForm.value.name !== null ){
      mod.name = this.editTeachersForm.value.name;
    } else mod.name = "";
    if( this.editTeachersForm.value.last_name !== this.editVariables.last_name && this.editTeachersForm.value.last_name !== undefined && this.editTeachersForm.value.last_name !== null ){
      mod.last_name = this.editTeachersForm.value.last_name;
    } else mod.last_name = "";
    if( this.editTeachersForm.value.phone_number !== this.editVariables.phone_number && this.editTeachersForm.value.phone_number !== undefined && this.editTeachersForm.value.phone_number !== null ){
      mod.phone_number = this.editTeachersForm.value.phone_number;
    } else mod.phone_number = "";
    if( this.editTeachersForm.value.status !== this.editVariables.status && this.editTeachersForm.value.status !== undefined && this.editTeachersForm.value.status !== null ){
      mod.status = this.editTeachersForm.value.status;
    } else mod.status = "";
    if( this.editTeachersForm.value.hire_date !== this.editVariables.hire_date && this.editTeachersForm.value.hire_date !== undefined && this.editTeachersForm.value.hire_date !== null ){
      mod.hire_date = this.editTeachersForm.value.hire_date;
    } else mod.hire_date = ""; 
    if( this.editTeachersForm.value.address !== this.editVariables.address && this.editTeachersForm.value.address !== undefined && this.editTeachersForm.value.address !== null ){
      mod.address = this.editTeachersForm.value.address;
    } else  mod.address = "";
    if( this.editTeachersForm.value.department !== this.editVariables.department && this.editTeachersForm.value.department !== undefined && this.editTeachersForm.value.department !== null ){
      mod.department = this.editTeachersForm.value.department;
    } else mod.department = "";
    if( this.editTeachersForm.value.email !== this.editVariables.email && this.editTeachersForm.value.email !== undefined && this.editTeachersForm.value.email !== null ){
      mod.email = this.editTeachersForm.value.email;
    } else mod.email = "";

    console.log(mod);
    if( mod.name || mod.last_name || mod.phone_number || mod.status || mod.hire_date || mod.address || mod.department || mod.email ){

      this.http.put<any>('http://localhost:4000/api/teachers/edit', mod).subscribe({
        next: (res) => {
          console.log(res);
          this.charge = false;
          let editModal: any;
          editModal = document.getElementById('editModal');
          editModal.style.display="none";
          this.load();
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    };
  };

  openEditModal(teacher: any){
    this.editVariables = teacher;
    this.editTeachersForm = new FormGroup({
      name: new FormControl(teacher.name),
      last_name: new FormControl(teacher.last_name),
      phone_number: new FormControl(teacher.phone_number),
      email: new FormControl(teacher.email),
      status: new FormControl(teacher.status),
      department: new FormControl(teacher.department),
      address: new FormControl(teacher.address),
      hire_date: new FormControl(teacher.hire_date)
    });

    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
  };

  desactivate(teacher: any){
    let des: any = {};
    des.id = teacher.teacher_id;
    des.status = teacher.teacher_status;
    this.http.put<any>('http://localhost:4000/api/teachers/status', des).subscribe({
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

  filter(){
    console.log( this.orderForm.value);
    let filters: any = {
      department: this.orderForm.value.department,
      last_name: this.orderForm.value.last_name,
      phone_number: this.orderForm.value.phone_number,
      email: this.orderForm.value.email,
    };
    if(filters.department === ""){filters.department = null};
    if(filters.last_name === ""){filters.last_name = null};
    if(filters.phone_number === ""){filters.phone_number = null};
    if(filters.email === ""){filters.email = null};
    
      this.http.put<any>('http://localhost:4000/api/teachers/filter', filters).subscribe({
        next: (res) => {
          this.teachers = res;
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
  };

  deleteFilter(){
    this.load();
    this.orderForm.reset({
      department: "",
      last_name: "",
      phone_number: "",
      email: ""
    });
  };

}