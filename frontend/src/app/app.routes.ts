import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { QuestionsComponent } from './pages/questions/questions.component'
import { AskComponent } from './pages/questions/ask/ask.component'
import { DetailQuestionComponent } from './pages/questions/detail-question/detail-question.component'
import { SignUpProComponent } from './pages/sign-up-pro/sign-up-pro.component'
import { SignUpNoobComponent } from './pages/sign-up-noob/sign-up-noob.component'
import { authGuard } from './core/guards/auth.guard'
import { loginGuard } from './core/guards/login.guard'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'questions', component: QuestionsComponent },
    {
        path: 'questions/ask',
        component: AskComponent,

        canActivate: [authGuard(['NOOB', 'PRO', 'ADMIN'])],
    },
    { path: 'questions/:questionId', component: DetailQuestionComponent },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard],
    },
    { path: 'sign-up-pro', component: SignUpProComponent },
    { path: 'sign-up-noob', component: SignUpNoobComponent },
]
