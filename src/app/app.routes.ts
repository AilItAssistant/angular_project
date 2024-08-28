import { Routes } from '@angular/router';
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

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "exams",
        component: ExamsComponent
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
    },
    {
        path: "manage_users",
        component: ManageUsersComponent
    },
    {
        path: "add_exams_notes",
        component: AddExamsNotesComponent
    },
    {
        path: "search_exams",
        component: SearchExamsComponent
    },
    {
        path: "statistics",
        component: StatisticsComponent
    },
    {
        path: "student_details/:id",
        component: StudentsDetailsComponent
    }

];
