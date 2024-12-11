import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-manage-exams-results',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './manage-exams-results.component.html',
    styleUrl: './manage-exams-results.component.scss'
})
export class ManageExamsResultsComponent {

    constructor(private http: HttpClient) {}

    ngOnInit(){
        this.controlPage();
    };

    controlPage(){
        let auth: any = localStorage.getItem('token');
        let httpHeaders: any = new HttpHeaders({
        'authorization': auth
        });
        let data: any = { name: "manage_exams"};
        this.http.post<any>('http://localhost:4000/api/user_actions/entryPage', data, {headers: httpHeaders}).subscribe({
            next: (res) => {},
            error: (err) => { alert('Cargar fallo' + err); },
        });
    };

};