import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-search-exams',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './search-exams.component.html',
    styleUrl: './search-exams.component.scss'
})
export class SearchExamsComponent {

}
