import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

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
      genre: "hombre",
      classes: [
        {
          id: 4,
          number_students:7,
          level: "A2",
          type: "full time",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 5,
          number_students: 8,
          level: "Otro",
          type: "cocina",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 6,
          number_students: 19,
          level: "Otro",
          type: "ocio",
          teacher: "María Fernanda",
          status: false,
        }
      ]
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
      genre: "mujer",
      classes: [
        {
          id: 1,
          number_students: 4,
          level: "A2",
          type: "full time",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 2,
          number_students: 10,
          level: "A2",
          type: "cocina",
          teacher: "María Fernanda",
          status: true,
        },
        {
          id: 3,
          number_students: 100,
          level: "A2",
          type: "personalizadas",
          teacher: "María Fernanda",
          status: true,
        }
      ]
    }
  ];

}
