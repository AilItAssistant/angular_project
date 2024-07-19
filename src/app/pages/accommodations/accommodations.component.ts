import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accommodations',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.scss'
})
export class AccommodationsComponent {

  accommodations: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:4000/api/accommodations').subscribe({
      next: (res) => {
        this.accommodations = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  }
}
