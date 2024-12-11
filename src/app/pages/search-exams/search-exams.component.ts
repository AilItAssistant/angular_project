import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-search-exams',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './search-exams.component.html',
    styleUrl: './search-exams.component.scss'
})
export class SearchExamsComponent {

    constructor(private http: HttpClient) {}

    ngOnInit(){
        this.controlPage();
    };

    controlPage(){
        let auth: any = localStorage.getItem('token');
        let httpHeaders: any = new HttpHeaders({
        'authorization': auth
        });
        let data: any = { name: "search_exams"};
        this.http.post<any>('http://localhost:4000/api/user_actions/entryPage', data, {headers: httpHeaders}).subscribe({
            next: (res) => {},
            error: (err) => { alert('Cargar fallo' + err); },
        });
    };

};