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

}
