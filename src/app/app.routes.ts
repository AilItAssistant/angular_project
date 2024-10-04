import { Routes, CanActivateFn, Router } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { AddQuestionsComponent } from './pages/add-questions/add-questions.component';
import { ManageQuestionsComponent } from './pages/manage-questions/manage-questions.component';
import { ValidateQuestionsComponent } from './pages/validate-questions/validate-questions.component';
import { OnlineExamComponent } from './pages/online-exam/online-exam.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageStructureComponent } from './pages/manage-structure/manage-structure.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ManageClassesComponent } from './pages/manage-classes/manage-classes.component';
import { ExamsResultsComponent } from './pages/exams-results/exams-results.component';
import { ManageExamsResultsComponent } from './pages/manage-exams-results/manage-exams-results.component';
import { StudentsComponent } from './pages/students/students.component';
import { ManageStudentsComponent } from './pages/manage-students/manage-students.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ManageTeachersComponent } from './pages/manage-teachers/manage-teachers.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { AddExamsNotesComponent } from './pages/add-exams-notes/add-exams-notes.component';
import { SearchExamsComponent } from './pages/search-exams/search-exams.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { StudentsDetailsComponent } from './pages/students-details/students-details.component';
import { TriggersComponent } from './pages/triggers/triggers.component';
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
        path: "validate_questions",
        component: ValidateQuestionsComponent,
        title: "Validar preguntas"
    },
    {
        path: "exam/:id",
        component: OnlineExamComponent
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
        path: "exams_results",
        component: ExamsResultsComponent,
        title: "Resultados de exámenes"
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
        path: "sign_in",
        component: SignInComponent,
        title: "Registrarse"
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
        path: "add_exams_notes",
        component: AddExamsNotesComponent,
        title: "Añadir notas de examenes"
    },
    {
        path: "search_exams",
        component: SearchExamsComponent,
        title: "Buscar exámenes"
    },
    {
        path: "statistics",
        component: StatisticsComponent,
        title: "Estadísticas"
    },
    {
        path: "student_details/:id",
        component: StudentsDetailsComponent,
        title: "Alumno"
    },
    {
        path: "triggers",
        component: TriggersComponent,
        title: "Triggers"
    },{
        path: "bitacora",
        component: BitacoraComponent,
        title: "Bitácora"
    }
];
