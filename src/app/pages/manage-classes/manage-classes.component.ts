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

}
