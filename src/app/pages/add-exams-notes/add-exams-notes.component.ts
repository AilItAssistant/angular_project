import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-add-exams-notes',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './add-exams-notes.component.html',
    styleUrl: './add-exams-notes.component.scss'
})
export class AddExamsNotesComponent {

    constructor(private http: HttpClient) {}

    ngOnInit(){
        this.controlPage();
    };

    controlPage(){
        let auth: any = localStorage.getItem('token');
        let httpHeaders: any = new HttpHeaders({
        'authorization': auth
        });
        let data: any = { name: "add-exams-notes"};
        this.http.post<any>('http://localhost:4000/api/user_actions/entrypage', data, {headers: httpHeaders}).subscribe({
            next: (res) => {},
            error: (err) => { alert('Cargar fallo' + err); },
        });
    };
};
