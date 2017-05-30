import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { AlphabetComponent } from './course-detail/alphabets/alphabets.component';
import { LessonsComponent } from './course-detail/lessons/lessons.component';
import { WordsComponent } from './course-detail/words/words.component';
import { PhoneticsComponent } from './course-detail/phonetics/phonetics.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/security/auth.guard';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { SessionComponent } from './learn/session.component';

const appRoutes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: ':id',
        component: CourseDetailComponent,
        children: [
          {
            path: 'alphabet/:alphabetId',
            component: AlphabetComponent
          },
          {
            path: 'phonetics/:phoneticId',
            component: PhoneticsComponent
          },
          {
            path: 'words/:wordId',
            component: WordsComponent
          },
          {
            path: 'lessons/:lessonId',
            component: LessonsComponent
          }
        ]
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
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
    path: 'session/:lessonId',
    component: SessionComponent
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
