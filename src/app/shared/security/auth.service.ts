import {Injectable} from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthInfo} from './AuthInfo';
import * as firebase from 'firebase/app';
import {UserInformation} from './user-info';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserCourse} from './user-course';


@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);
  sdkDb: any;
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private fbAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.sdkDb = firebase.database().ref();
  }

  loginUsingProvider(provider: string): Observable<any> {
    return this.fromFirebaseGoogleAuthPromise(this.fbAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  signUp(email: string, password: string): Observable<any> {
    // return this.fromFirebaseAuthPromise(this.fbAuth.auth.createUserWithEmailAndPassword(email, password));
    return null;
  }


  login(email: string, password: string): Observable<any> {
    // return this.fromFirebaseAuthPromise(this.fbAuth.auth.signInWithEmailAndPassword(email, password));
    return null;
  }

  updateUserInformationAfterLogin(uid: string, email: string, displayName: string, photoURL: string) {
    const userInformationToSave = Object.assign({}, {email: email},
      {displayName: displayName}, {photoURL: photoURL});

    const updateUser$ = this.db.object(`users/${uid}`);
    return Observable.fromPromise(updateUser$.update(userInformationToSave));
  }

  updateRegisterCourseInformation(user: UserInformation, courseId: string = localStorage.getItem('courseId')): void {
    if (courseId) {
      const courses: UserCourse[] = user.courses;
      courses.push(new UserCourse(courseId));
      user.courses = courses;
      user.currentCourse = courseId;
      localStorage.removeItem('courseId');
      const userInformationToSave = Object.assign({}, {currentCourse: courseId}, {courses: courses});

      const updateUser$ = this.db.object(`users/${user.uid}`);
      updateUser$.update(userInformationToSave)
        .then(
          val => {
            user.currentCourse = courseId;
          },
          err => {
          }
        );
    }
  }

  getUserInformation(uid: string): Observable<UserInformation> {
    return this.db.object(`users/${uid}`)
      .map((user) => {
        user.uid = uid;
        return UserInformation.fromJson(user);
      });
  }

  fromFirebaseGoogleAuthPromise(promise): Observable<any> {
    const that = this;
    const subject = new Subject<any>();
    promise.then(
      res => {
        that.updateUserInformationAfterLogin(res.user.uid,
          res.user.email, res.user.displayName, res.user.photoURL).subscribe(
          () => {
            that.getUserInformation(res.user.uid)
              .subscribe(
                (userInfo) => {
                  that.updateRegisterCourseInformation(userInfo);
                  const authInfo = new AuthInfo(userInfo);
                  ;
                  that.authInfo$.next(authInfo);
                  subject.next(res.user);
                  subject.complete();
                }
              );
          },
          err => alert(`error in creating new alphabet ${err}`)
        );

      },
      reject => {
        this.authInfo$.error(reject);
        subject.next(reject);
        subject.complete();
      }
    );

    return subject.asObservable();
  }

  logout() {
    this.fbAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
  }

  firebaseUpdate(dataToSave): Observable<any> {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }
}
