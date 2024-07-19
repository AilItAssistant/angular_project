import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { AccommodationsComponent } from './pages/accommodations/accommodations.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "alumnos",
        component: AlumnosComponent
    },
    {
        path: "exams",
        component: ExamsComponent
    },
    {
        path: "accommodations",
        component: AccommodationsComponent
    }
];
