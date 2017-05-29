import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { LessonsComponent } from './lessons/lessons.component';
import { WordsComponent } from './words/words.component';
import { PhoneticsComponent } from './phonetics/phonetics.component';
// Root Router Part.

/*const appRoutes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'forgotpassword/:id', component: ForgotpasswordComponent },

    {
        path: 'hrdashboard', component: HrDashboardComponent, canActivate: [AuthGaurd], children: [
            { path: '', component: HomeComponent } ,
            { path: 'home', component: HomeComponent } ,
             { path: 'changepassword', component: ChangepasswordComponent } ,

        ]
    }
];*/

const appRoutes: Routes = [
    { path: '', redirectTo: '/alphabet', pathMatch: 'full' },
    { path: 'alphabet', component: AlphabetComponent},
    { path: 'phonetics', component: PhoneticsComponent},
    { path: 'words', component: WordsComponent},
    { path: 'lessons', component: LessonsComponent},

];

@NgModule({


    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }
