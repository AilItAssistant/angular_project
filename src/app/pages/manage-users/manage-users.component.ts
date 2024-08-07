import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

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
    mobil: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    text: new FormControl(""),
    permissions: new FormControl(""),
    position: new FormControl(""),
    status: new FormControl(""),
  });

}
