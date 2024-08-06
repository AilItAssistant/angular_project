import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-manage-teachers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './manage-teachers.component.html',
  styleUrl: './manage-teachers.component.scss'
})
export class ManageTeachersComponent {

}
