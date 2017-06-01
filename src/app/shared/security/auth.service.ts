import {Injectable} from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthInfo} from './AuthInfo';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null, null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private fbAuth: AngularFireAuth) {

  }

  registerUserWithLoginInformation(user: any): Observable<boolean> {
    console.log(`user ${JSON.stringify(user)}`);
    return Observable.of(true);
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
    const subject = new Subject<any>();
    promise.then(
      res => {
        const authInfo = new AuthInfo(res.uid, res);
        console.log(res);
        console.log(`res.uid ${res.uid}`);
        this.authInfo$.next(authInfo);
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

  fromFirebaseGoogleAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();
    promise.then(
      res => {
        const authInfo = new AuthInfo(res.user.uid, res.user);
        console.log(`res.uid ${res.user.uid}`);
        this.authInfo$.next(authInfo);
        subject.next(res.user);
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

  logout() {
    this.fbAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
  }
}
