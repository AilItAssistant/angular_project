import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-manage-exams-results',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './manage-exams-results.component.html',
    styleUrl: './manage-exams-results.component.scss'
})
export class ManageExamsResultsComponent {

}
