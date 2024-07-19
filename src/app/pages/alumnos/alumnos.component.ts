import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  alumnos: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:4000/api/alumnos').subscribe({
      next: (res) => {
        this.alumnos = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  }
}
