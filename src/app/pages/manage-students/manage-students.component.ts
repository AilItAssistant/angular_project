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
  editVariables: any = {};
  students: any = [];
  levels: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
    this.loadLevels();
  }

  orderForm = new FormGroup({
    select: new FormControl(""),
    identification_number: new FormControl(""),
    last_name: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl("")
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
    last_name: new FormControl(""),
    document: new FormControl(""),
    birthday: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    status: new FormControl(""),
    level: new FormControl(""),
    enrollment_date: new FormControl(""),
    address: new FormControl("")
  });

  editForm = new FormGroup({
    name: new FormControl(""),
    last_name: new FormControl(""),
    document: new FormControl(""),
    birthday: new FormControl(""),
    phone_number: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    status: new FormControl(""),
    level: new FormControl(""),
    enrollment_date: new FormControl(""),
    address: new FormControl("")
  });

  delete(){
    let del;
    del = {id: this.deleteVariables.student_id};
    this.http.put<any>('http://localhost:4000/api/alumnos/delete', del).subscribe({
      next: (res) => {
        let deleteModal: any;
        deleteModal = document.getElementById('deleteModal');
        deleteModal.style.display="none";
        this.load();
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
    console.log(student)
  };

  closeDeleteModal(){
    let deleteModal: any;
    deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display="none";
  };

  openEditModal(student: any){
    this.editForm = new FormGroup({
      name: new FormControl(student.name),
      last_name: new FormControl(student.last_name),
      document: new FormControl(student.id_document),
      birthday: new FormControl(student.birthday),
      phone_number: new FormControl(student.phone_number),
      email: new FormControl(student.email),
      city: new FormControl(student.city),
      status: new FormControl(student.status),
      level: new FormControl(student.level),
      enrollment_date: new FormControl(student.enrollment_date),
      address: new FormControl(student.address)
    });
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="block";
    this.editVariables = student;
  };

  closeEditModal(){
    let editModal: any;
    editModal = document.getElementById('editModal');
    editModal.style.display="none";
  };

  desactivate(student: any){
    let des: any = {};
    des.id = student.student_id;
    des.status = student.student_status;
    this.http.put<any>('http://localhost:4000/api/alumnos/status', des).subscribe({
      next: (res) => {
      this.load();
      },
      error: (err) => {
      alert('Cargar fallo' + err);
      },
      });

  };

  modify(){
    console.log(this.editVariables)
    let mod: any = {}
      mod.id = this.editVariables.student_id;
    
    if( this.editForm.value.name !== this.editVariables.name && this.editForm.value.name !== undefined && this.editForm.value.name !== null ){
      mod.name = this.editForm.value.name;
    } else mod.name = "";
    if( this.editForm.value.last_name !== this.editVariables.last_name && this.editForm.value.last_name !== undefined && this.editForm.value.last_name !== null ){
      mod.last_name = this.editForm.value.last_name;
    } else mod.last_name = "";
    if( this.editForm.value.document !== this.editVariables.document && this.editForm.value.document !== undefined && this.editForm.value.document !== null ){
      mod.document = this.editForm.value.document;
    } else mod.document = "";
    if( this.editForm.value.birthday !== this.editVariables.birthday && this.editForm.value.birthday !== undefined && this.editForm.value.birthday !== null ){
      mod.birthday = this.editForm.value.birthday;
    } else mod.birthday = "";
    if( this.editForm.value.phone_number !== this.editVariables.phone_number && this.editForm.value.phone_number !== undefined && this.editForm.value.phone_number !== null ){
      mod.phone_number = this.editForm.value.phone_number;
    } else mod.phone_number = "";
    if( this.editForm.value.email !== this.editVariables.email && this.editForm.value.email !== undefined && this.editForm.value.email !== null ){
      mod.email = this.editForm.value.email;
    } else mod.email = "";
    if( this.editForm.value.city !== this.editVariables.city && this.editForm.value.city !== undefined && this.editForm.value.city !== null ){
      mod.city = this.editForm.value.city;
    } else mod.city = "";
    if( this.editForm.value.status !== this.editVariables.status && this.editForm.value.status !== undefined && this.editForm.value.status !== null ){
      mod.status = this.editForm.value.status;
    };
    if( this.editForm.value.level !== this.editVariables.level && this.editForm.value.level !== undefined && this.editForm.value.level !== null ){
      mod.level = this.editForm.value.level;
    } else mod.level = "";
    if( this.editForm.value.document !== this.editVariables.id_document && this.editForm.value.document !== undefined && this.editForm.value.document !== null ){
      mod.document = this.editForm.value.document;
    } else mod.document = "";
    if( this.editForm.value.enrollment_date !== this.editVariables.enrollment_date && this.editForm.value.enrollment_date !== undefined && this.editForm.value.enrollment_date !== null ){
      mod.enrollment_date = this.editForm.value.enrollment_date;
    } else mod.enrollment_date = "";
    if( this.editForm.value.address !== this.editVariables.address && this.editForm.value.address !== undefined && this.editForm.value.address !== null ){
      mod.address = this.editForm.value.address;
    } else mod.address = "";
    console.log(mod)
    if( mod.name || mod.last_name || mod.phone_number || mod.status || mod.hire_date || mod.address || mod.department || mod.email ){
      this.charge = true;
      this.http.put<any>('http://localhost:4000/api/alumnos/edit', mod).subscribe({
        next: (res) => {
          console.log(res)
          let editModal: any;
          editModal = document.getElementById('editModal');
          editModal.style.display="none";
          this.charge = false;
          this.editForm.reset({
            name: "",
            last_name: "",
            document: "",
            birthday: "",
            phone_number: "",
            email: "",
            city: "",
            status: "",
            level: "",
            enrollment_date: "",
            address: ""
          });
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
    }
  };

  addStudent(){
    let add: any = {
      name: this.addStudentsForm.value.name,
      last_name: this.addStudentsForm.value.last_name,
      document: this.addStudentsForm.value.document,
      birthday: this.addStudentsForm.value.birthday,
      phone_number: this.addStudentsForm.value.phone_number,
      email: this.addStudentsForm.value.email,
      city: this.addStudentsForm.value.city,
      status: this.addStudentsForm.value.status,
      level: this.addStudentsForm.value.level,
      enrollment_date: this.addStudentsForm.value.enrollment_date,
      address: this.addStudentsForm.value.address
    }
    this.charge = true;
    this.http.post<any>('http://localhost:4000/api/alumnos/add',add).subscribe({
      next: (res) => {
        console.log(res)
        let editModal: any;
        editModal = document.getElementById('editModal');
        editModal.style.display="none";
        this.addStudentsForm.reset({
          name: "",
          last_name: "",
          document: "",
          birthday: "",
          phone_number: "",
          email: "",
          city: "",
          status: "",
          level: "",
          enrollment_date: "",
          address: ""
        });
        this.charge = false;
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

  filter(){
    console.log( this.orderForm.value);
    let filters: any = {
      identification_number: this.orderForm.value.identification_number,
      last_name: this.orderForm.value.last_name,
      phone_number: this.orderForm.value.phone_number,
      email: this.orderForm.value.email,
      city: this.orderForm.value.city
    };
    if(filters.identification_number === ""){filters.identification_number = null};
    if(filters.last_name === ""){filters.last_name = null};
    if(filters.phone_number === ""){filters.phone_number = null};
    if(filters.city === ""){filters.city = null};
    if(filters.email === ""){filters.email = null};
    
      this.http.put<any>('http://localhost:4000/api/alumnos/filter', filters).subscribe({
        next: (res) => {
          this.students = res;
        },
        error: (err) => {
          alert('Cargar fallo' + err);
        },
      });
  };

  deleteFilter(){
    this.load();
    this.orderForm.reset({
      identification_number: "",
      last_name: "",
      phone_number: "",
      email: "",
      city: ""
    });
  };

  loadLevels(){
    this.http.get<any>('http://localhost:4000/api/levels').subscribe({
      next: (res) => {
        this.levels = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  };

}
