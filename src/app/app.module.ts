import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LessonsComponent } from './lessons/lessons.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { PhoneticsComponent } from './phonetics/phonetics.component';
import { WordsComponent } from './words/words.component';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    NavmenuComponent,
    AlphabetComponent,
    PhoneticsComponent,
    WordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features  
    MdButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
