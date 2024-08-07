import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-manage-classes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './manage-classes.component.html',
  styleUrl: './manage-classes.component.scss'
})
export class ManageClassesComponent {

  classes: any = [
    {
      id: 4,
      number_students:7,
      level: "A2",
      type: "full time",
      teacher: "María Fernanda",
      status: true,
      students: [
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
      ]
    },
    {
      id: 5,
      number_students: 8,
      level: "Otro",
      type: "cocina",
      teacher: "María Fernanda",
      status: true,
      students: [
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
      ]
    },
    {
      id: 6,
      number_students: 19,
      level: "Otro",
      type: "ocio",
      teacher: "María Fernanda",
      status: false,
      students: [
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
      ]
    },
    {
      id: 1,
      number_students: 4,
      level: "A2",
      type: "full time",
      teacher: "María Fernanda",
      status: true,
      students: [
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
      ]
      },
    {
      id: 2,
      number_students: 10,
      level: "A2",
      type: "cocina",
      teacher: "María Fernanda",
      status: true,
      students: [
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
      ]
    },
    {
      id: 3,
      number_students: 100,
      level: "A2",
      type: "personalizadas",
      teacher: "María Fernanda",
      status: true,
      students: [
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
      ]
    },
  ];

}