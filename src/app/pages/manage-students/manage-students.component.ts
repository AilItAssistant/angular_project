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
      document: "x123654789q",
      birthday: "2000-03-03",
      mobile: "+654321456987",
      email: "qwertyqwerty@qwerty.com",
      status: true,
      city: "Vallecas",
      genre: "hombre"
    },
    {
      id: 2,
      name: "María Fernanda",
      surname: "González Perez",
      document: "x123rtghdf789q",
      birthday: "2000-03-03",
      mobile: "+6543765671456987",
      email: "qwerty12qwerty34@qwerty56.com",
      status: true,
      city: "Principado de Mónaco",
      genre: "mujer"
    }
  ];

}
