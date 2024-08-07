import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-manage-students',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './manage-students.component.html',
  styleUrl: './manage-students.component.scss'
})
export class ManageStudentsComponent {

  students: any = [
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
  ];

}
