import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app.routing.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import * as firebase from 'firebase/app';

import {AppComponent} from './app.component';
import {LessonsComponent} from './course-detail/lessons/lessons.component';
import {NavmenuComponent} from './navmenu/navmenu.component';
import {AlphabetComponent} from './course-detail/alphabets/alphabets.component';
import {PhoneticsComponent} from './course-detail/phonetics/phonetics.component';
import {WordsComponent} from './course-detail/words/words.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from './shared/security/auth.service';
import { HomeComponent } from './home/home.component';
import { TopmenuComponent } from './topmenu/topmenu.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Subject';

import {AuthGuard} from './shared/security/auth.guard';
import {CourseService} from './shared/model/course.service';
import { CoursesListComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import {UploadService} from './shared/uploads/upload.service';
import { RecordAudioComponent } from './record-audio/record-audio.component';
import {AlphabetService} from './shared/model/alphabet.service';
import {PhoneticService} from './shared/model/phonetic.service';
import {WordService} from './shared/model/word.service';
import {LessonService} from './shared/model/lesson.service';
import { SessionComponent } from './learn/session.component';

import { AllcoursesComponent } from './allcourses/allcourses.component';
import { AlphabetBoardComponent } from './learn/board/alphabet-board.component';
import { BoardDirective } from "app/learn/board.directive";
import { LanguageWordComponent } from './course-detail/lessons/language-word/language-word.component';
import { LanguageAlphabetComponent } from './course-detail/lessons/language-alphabet/language-alphabet.component';
import { CourselessonsComponent } from './courselessons/courselessons.component';
import { PlayComponent } from './play/play.component';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { UsercreatedcoursesComponent } from './usercreatedcourses/usercreatedcourses.component';
import { WordBoardComponent } from './learn/board/word-board.component';
import { AlphabetQuizComponent } from './learn/quiz/alphabet-quiz.component';
import { QuizService } from "app/shared/model/quiz.service";
import { WordQuizComponent } from './learn/quiz/word-quiz.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    NavmenuComponent,
    AlphabetComponent,
    PhoneticsComponent,
    WordsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TopmenuComponent,
    CoursesListComponent,
    CourseDetailComponent,
    UploadFormComponent,
    RecordAudioComponent,
    SessionComponent,
    AllcoursesComponent,
    BoardDirective,
    AlphabetBoardComponent,
    LanguageWordComponent,
    LanguageAlphabetComponent,
    CourselessonsComponent,
    PlayComponent,
    RegisterCourseComponent,
    UsercreatedcoursesComponent,
    WordBoardComponent,
    AlphabetQuizComponent,
    WordQuizComponent,
    PlayQuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DragulaModule,
    Ng2AutoCompleteModule
  ],
  providers: [AuthService, AuthGuard, DragulaService ,
    CourseService, UploadService, AlphabetService, PhoneticService, WordService, LessonService, QuizService],
  entryComponents: [AlphabetBoardComponent, WordBoardComponent, AlphabetQuizComponent, WordQuizComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
