import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { AccommodationsComponent } from './pages/accommodations/accommodations.component';
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
    {
        path: "validate_questions",
        component: ValidateQuestionsComponent
    },
    {
        path: "exam/:id",
        component: OnlineExamComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "manage_structure",
        component: ManageStructureComponent
    },
    {
        path: "classes",
        component: ClassesComponent
    },
    {
        path: "manage_classes",
        component: ManageClassesComponent
    },
    {
        path: "exams_results",
        component: ExamsResultsComponent
    },
    {
        path: "manage_exams_results",
        component: ManageExamsResultsComponent
    },
    {
        path: "students",
        component: StudentsComponent
    },
    {
        path: "manage_students",
        component: ManageStudentsComponent
    },
    {
        path: "sign_in",
        component: SignInComponent
    },
    {
        path: "teachers",
        component: TeachersComponent
    },
    {
        path: "manage_teachers",
        component: ManageTeachersComponent
    }
];