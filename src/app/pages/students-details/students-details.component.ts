import { Component } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-students-details',
    imports: [],
    templateUrl: './students-details.component.html',
    styleUrl: './students-details.component.scss'
})
export class StudentsDetailsComponent {

    constructor(private http: HttpClient) {}

    ngOnInit(){
        this.controlPage();
    };

    controlPage(){
        let auth: any = localStorage.getItem('token');
        let httpHeaders: any = new HttpHeaders({
        'authorization': auth
        });
        let data: any = { name: "sign_in"};
        this.http.post<any>('http://localhost:4000/api/user_actions/entryPage', data, {headers: httpHeaders}).subscribe({
            next: (res) => {},
            error: (err) => { alert('Cargar fallo' + err); },
        });
    };
};