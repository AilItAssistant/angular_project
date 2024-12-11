import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(private http: HttpClient) {}

    ngOnInit(){
        this.controlPage();
    };

    controlPage(){
        let auth: any = localStorage.getItem('token');
        let httpHeaders: any = new HttpHeaders({
        'authorization': auth
        });
        let data: any = { name: "home"};
        this.http.post<any>('http://localhost:4000/api/user_actions/entryPage', data, {headers: httpHeaders}).subscribe({
            next: (res) => {},
            error: (err) => { alert('Cargar fallo' + err); },
        });
    };
};