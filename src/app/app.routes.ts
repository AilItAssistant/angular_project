import { Routes, CanActivateFn, Router } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { AddQuestionsComponent } from './pages/add-questions/add-questions.component';
import { ManageQuestionsComponent } from './pages/manage-questions/manage-questions.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageStructureComponent } from './pages/manage-structure/manage-structure.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ManageClassesComponent } from './pages/manage-classes/manage-classes.component';
import { ManageExamsResultsComponent } from './pages/manage-exams-results/manage-exams-results.component';
import { StudentsComponent } from './pages/students/students.component';
import { ManageStudentsComponent } from './pages/manage-students/manage-students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ManageTeachersComponent } from './pages/manage-teachers/manage-teachers.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Home",
    },
    {
        path: "exams",
        component: ExamsComponent,
        title: "Exámenes",
        //canActivate: [ver]
    },
    {
        path: "add_questions",
        component: AddQuestionsComponent,
        title: "Añadir preguntas"
    },
    {
        path: "manage_questions",
        component: ManageQuestionsComponent,
        title: "Editar preguntas"
    },
    {
        path: "login",
        component: LoginComponent,
        title: "Iniciar sesión"
    },
    {
        path: "manage_structure",
        component: ManageStructureComponent,
        title: "Editar estructuras"
    },
    {
        path: "classes",
        component: ClassesComponent,
        title: "Clases"
    },
    {
        path: "manage_classes",
        component: ManageClassesComponent,
        title: "Editar clases"
    },
    {
        path: "manage_exams_results",
        component: ManageExamsResultsComponent,
        title: "Editar resultados exámenes"
    },
    {
        path: "students",
        component: StudentsComponent,
        title: "Estudiantes"
    },
    {
        path: "manage_students",
        component: ManageStudentsComponent,
        title: "Editar estudiantes"
    },
    {
        path: "teachers",
        component: TeachersComponent,
        title: "Profesores"
    },
    {
        path: "manage_teachers",
        component: ManageTeachersComponent,
        title: "Editar profesores"
    },
    {
        path: "manage_users",
        component: ManageUsersComponent,
        title: "Editar usuarios"
    },
    {
        path: "bitacora",
        component: BitacoraComponent,
        title: "Bitácora"
    }
];