import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavmenuComponent} from './navmenu/navmenu.component';
import {AlphabetComponent} from './course-detail/alphabets/alphabets.component';
import {LessonsComponent} from './course-detail/lessons/lessons.component';
import {WordsComponent} from './course-detail/words/words.component';
import {PhoneticsComponent} from './course-detail/phonetics/phonetics.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/security/auth.guard';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {SessionComponent} from './learn/session.component';
import {AllcoursesComponent} from './allcourses/allcourses.component';
import {LanguageWordComponent} from './course-detail/lessons/language-word/language-word.component';
import {LanguageAlphabetComponent} from './course-detail/lessons/language-alphabet/language-alphabet.component';
import {CourselessonsComponent} from './courselessons/courselessons.component';
import {RegisterCourseComponent} from './register-course/register-course.component';
import {UsercreatedcoursesComponent} from './usercreatedcourses/usercreatedcourses.component';

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
            component: LessonsComponent,
            children: [
              {path: 'language-alphabet/:lessonAlphaId', component: LanguageAlphabetComponent},
              {path: 'language-word/:lessonWordId', component: LanguageWordComponent}
            ]
          }
        ]
      },
      {
        path: 'lesson/:courseId',
        component: CourselessonsComponent
      },
      {
        path: 'course/createcourse', component: RegisterCourseComponent
      },
      {
        path: 'course/mycourses', component: UsercreatedcoursesComponent
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
    children: [
      {
        path: 'lesson/:courseId',
        component: CourselessonsComponent,
      },
      {
        path: '',
        component: AllcoursesComponent
      }
    ]
  },
  {
    path: 'session/:courseId/:lessonId',
    component: SessionComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
