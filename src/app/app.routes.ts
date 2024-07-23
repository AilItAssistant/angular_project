import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { AccommodationsComponent } from './pages/accommodations/accommodations.component';
import { AddQuestionsComponent } from './pages/add-questions/add-questions.component';
import { ManageQuestionsComponent } from './pages/manage-questions/manage-questions.component';

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
    },
    {
        path: "add_questions",
        component: AddQuestionsComponent
    },
    {
        path: "manage_questions",
        component: ManageQuestionsComponent
    },
];
