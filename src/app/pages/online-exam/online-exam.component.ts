import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-online-exam',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './online-exam.component.html',
  styleUrl: './online-exam.component.scss'
})
export class OnlineExamComponent {}
