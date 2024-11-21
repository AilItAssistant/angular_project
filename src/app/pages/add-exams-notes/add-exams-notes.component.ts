import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-add-exams-notes',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './add-exams-notes.component.html',
    styleUrl: './add-exams-notes.component.scss'
})
export class AddExamsNotesComponent {

}
