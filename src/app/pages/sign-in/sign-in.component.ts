import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-sign-in',
    imports: [FooterComponent, ReactiveFormsModule, HeaderComponent],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signinForm = new FormGroup({
    user: new FormControl(""),
    password: new FormControl(""),
  });

}