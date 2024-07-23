import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './manage-questions.component.html',
  styleUrl: './manage-questions.component.scss'
})
export class ManageQuestionsComponent {

}
