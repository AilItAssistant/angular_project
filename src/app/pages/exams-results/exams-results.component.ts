import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-exams-results',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './exams-results.component.html',
  styleUrl: './exams-results.component.scss'
})
export class ExamsResultsComponent {

}
