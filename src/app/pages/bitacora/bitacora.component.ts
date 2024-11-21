import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    standalone: true,
    selector: 'app-bitacora',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './bitacora.component.html',
    styleUrl: './bitacora.component.scss'
})
export class BitacoraComponent {

}
