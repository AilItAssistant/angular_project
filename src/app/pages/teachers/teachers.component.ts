import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

  teachers: any = [
    {
      id: 1,
      name: "José Carlos",
      surname: "Fernández Giménez",
      mobile: "+659635214587",
      email: "marketingassistant@ailmadr55id.com",
      status: true,
      classes: [
        {
          id: 4,
          number_students:7,
          level: "A2",
          type: "full time",
        },
        {
          id: 5,
          number_students: 8,
          level: "Otro",
          type: "cocina",
        },
        {
          id: 6,
          number_students: 19,
          level: "Otro",
          type: "ocio",
        },
      ]
    },
    {
      id: 2,
      name: "María Fernanda",
      surname: "González Perez",
      mobile: "+654985645132",
      email: "marketingassistant@ailma55drid.com",
      status: false,
      classes: [
        {
          id: 1,
          number_students: 4,
          level: "A2",
          type: "full time",
        },
        {
          id: 2,
          number_students: 10,
          level: "A2",
          type: "cocina",
        },
        {
          id: 3,
          number_students: 100,
          level: "A2",
          type: "personalizadas",
        },
      ]
    }
  ];

}
