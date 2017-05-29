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

import {AppComponent} from './app.component';
import {LessonsComponent} from './course-detail/lessons/lessons.component';
import {NavmenuComponent} from './navmenu/navmenu.component';
import {AlphabetComponent} from './course-detail/alphabet/alphabet.component';
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
import {AuthGuard} from './shared/security/auth.guard';
import {CoursesService} from './shared/model/courses.service';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import {UploadService} from './shared/uploads/upload.service';
import { RecordAudioComponent } from './record-audio/record-audio.component';
import {AlphabetService} from './shared/model/alphabet.service';
import {PhoneticsService} from './shared/model/phonetics.service';
import {WordService} from './shared/model/word.service';
import {LessonService} from './shared/model/lesson.service';


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
    RecordAudioComponent

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
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, CoursesService, UploadService, AlphabetService, PhoneticsService, WordService, LessonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
