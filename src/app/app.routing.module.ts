import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavmenuComponent} from './navmenu/navmenu.component';
import {AlphabetComponent} from './alphabets/alphabets.component';
import {LessonsComponent} from './lessons/lessons.component';
import {WordsComponent} from './words/words.component';
import {PhoneticsComponent} from './phonetics/phonetics.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/security/auth.guard';
import {CourseDetailComponent} from './course-detail/course-detail.component';

const appRoutes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: ':id',
        component: CourseDetailComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'alphabet',
    component: AlphabetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'phonetics',
    component: PhoneticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'words',
    component: WordsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
