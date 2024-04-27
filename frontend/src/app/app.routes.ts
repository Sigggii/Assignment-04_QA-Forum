import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { QuestionsComponent } from './pages/questions/questions.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
]
