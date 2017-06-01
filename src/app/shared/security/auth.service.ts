import {Injectable} from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthInfo} from './AuthInfo';
import * as firebase from 'firebase/app';
import {UserInformation} from './user-info';
import {AngularFireDatabase} from 'angularfire2/database';


@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null, null);
  sdkDb: any;
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private fbAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.sdkDb = firebase.database().ref();
  }

  loginUsingProvider(provider: string): Observable<any> {
    return this.fromFirebaseGoogleAuthPromise(this.fbAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  signUp(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(this.fbAuth.auth.createUserWithEmailAndPassword(email, password));
  }


  login(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(this.fbAuth.auth.signInWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const that = this;
    const subject = new Subject<any>();
    promise.then(
      res => {
        const authInfo = new AuthInfo(res.uid, res);
        console.log(res);
        console.log(`res.uid ${res.uid}`);
        that.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      reject => {
        this.authInfo$.error(reject);
        subject.next(reject);
        subject.complete();
      }
    );

    return subject.asObservable();
  }

  updateUserInformationAfterLogin(uid: string, email: string, displayName: string, photoURL: string) {
    const userInformationToSave = Object.assign({}, {uid: uid}, {email: email},
      {displayName: displayName}, {photoURL: photoURL});

    const preLoginCourseUrl = localStorage.getItem('courseId');
    if (preLoginCourseUrl) {
      userInformationToSave['currentCourse'] = preLoginCourseUrl;
    }
    const dataToSave = {};
    dataToSave[`users/${uid}`] = userInformationToSave;
    return this.firebaseUpdate(dataToSave);

  }

  getUserInformation(uid: string): Observable<UserInformation> {
    console.log(uid);

    return this.db.object(`users/${uid}`)
      .do(console.log)
      .map(UserInformation.fromJson);

  }

  fromFirebaseGoogleAuthPromise(promise): Observable<any> {
    const that = this;
    const subject = new Subject<any>();
    promise.then(
      res => {
        this.updateUserInformationAfterLogin(res.user.uid,
          res.user.email, res.user.displayName, res.user.photoURL
        ).subscribe(
          () => {
            const authInfo = new AuthInfo(res.user.uid, res.user);
            const preLoginCourseUrl = localStorage.getItem('courseId');
            if (preLoginCourseUrl) {
              authInfo.getUserInfo().currentCourse = preLoginCourseUrl;
              localStorage.removeItem('courseId');
            };
            that.authInfo$.next(authInfo);
            subject.next(res.user);
            subject.complete();
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
