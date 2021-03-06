import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';


// singlenton
import { UserService } from '../providers/user/user';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
/**
 * DESC PROVIDER
 */
export class AuthService {

  tenant: string;
  public token: any;
  public fireAuth: firebase.auth.Auth;
  public userProfile: firebase.database.Reference;
  public urlNodeFirebase: string;

  constructor(
    //private afAuth: AngularFireAuth, 
    private config: Config, 
    private storage: Storage,
    private userService:UserService
  ) {
    console.log('Hello AuthService Provider');
    // recupero tenant
    // console.log('ionViewDidLoad First');
    // this.userProvider.log(); // log First singleton data
    // this.userProvider.set("First singleton data")

    let appConfig = config.get("appConfig");
    this.tenant = appConfig.tenant;

    this.fireAuth = firebase.auth();
    this.urlNodeFirebase = '/apps/'+this.tenant+'/contacts/';
    this.userProfile = firebase.database().ref(this.urlNodeFirebase);
    //this.afAuth.authState.subscribe();

    // this.afAuth.authState.subscribe((user: firebase.User) => {
    //   this.currentUser = user;
    // });
  }
  
  //Start Firebase Auth//

  // GetUser
  getUser(): firebase.User {
    return this.fireAuth.currentUser;
  }
 

  // Create User Anonymous
  // createAnonymousUser(): firebase.Promise<any> {
  //   return this.fireAuth.signInAnonymously();
  // }

  // Login with Email
  doLoginFirebase(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
    //var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU4MjkxMTUzNiwiZXhwIjoxNTgyOTE1MTM2LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1hMHIxNkBjaGF0MjEtcHJlLTAxLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstYTByMTZAY2hhdDIxLXByZS0wMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjVhYjBmM2ZhNTcwNjZlMDAxNGJmZDcxZSJ9.LCPG3n9lQq4GAV0Z1P1s8B23z4GZEm-Pdyu-RdSGiJmnFM_525UkX4tKY-sCHO5ukIK6zEXPW8qwNmyYafhHUMa5tHDT1-BH6f0KESUyYGn2x0LGyDnMTzMBbrmq6vZABWxbhXtTahnV835pBkDlBbk2XhuBRzDkQq_Xan1mq6TdeoWdBD-iPgttZYtgCXA35Z5-Ez2t-xlJNwRG0QFqmaQmRAmncZbhJH-Uidu0ciBj54dyTBIsxRxhMLlTvvn_kAW4CucCHmrYGE6Uxi9qWrZ4OEaBscIUwdnrRhlp5nmb4r_AakqygpbnXZgLHHJcVW2fE7A7ghkkh8ZSsYvmqQ';
    //'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU4MjMwNTc5MSwiZXhwIjoxNTgyMzA5MzkxLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1hMHIxNkBjaGF0MjEtcHJlLTAxLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstYTByMTZAY2hhdDIxLXByZS0wMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjVhYjBmM2ZhNTcwNjZlMDAxNGJmZDcxZSJ9.NowEGGsDG1SiWXMjVQiu44Hi2vZJASrFm-rIe5bRjwskNYuQtJqV2N4LCjYvBn5Ie_jRCNGABIFj-L6YNl8wz1ZJ6ZNIiBGgKSzc6P-slwMNvYUMA7i1Jopn-git8qPg1li_36FXO-TAedMcwwGCD-BPFzqbIgEbemex1U_Bb11AqvlospSeh7zHT5misg7AflQGIG0z60v5iR6O0vz0qhaZYpPSkFAI-YibvMZAnXqs6HFKAi7o-f7O9lZ6TG8tU1xddbgVCosst8zIU4_2yNKQCJlNGSiCkWfR5uaY8exYwWImEOl1RCsldsdWmRFkjC3SjJGYB_kGepbGlzrXqg';
    //return this.fireAuth.signInWithCustomToken(token)
  }


  authenticateFirebaseCustomToken(token1) {
    var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU4MjExMjg5MSwiZXhwIjoxNTgyMTE2NDkxLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1hMHIxNkBjaGF0MjEtcHJlLTAxLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstYTByMTZAY2hhdDIxLXByZS0wMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjVhYjBmM2ZhNTcwNjZlMDAxNGJmZDcxZSJ9.Llje-vrKd2j4wPnZP6pRccPj04Fq5YFGa_tkWb6WO2lwcu4-OWkI0f8hfHk39jUKkWHTFDSAJWRJQo4VnuojplkB8ZKBloynD1OgMl4aM7Ou6W0z5mvKwiOLTmeVzErNgPMv5C-AoZeucLQN8PahuP_W8SD-7q8lxHnHAQrI-4R_8fdW4njAKuskPYkIxa5n0GpJk0J5-3hwPTNjsZTfwP0J7c9tVFI4_2XhqbjhKloa5W2LsH6X3YXTQ9SXBRt7vJ6ujsOggrcvpKWNql33XG2yy9d1zCd1OOaxHgtc6f-1hWmlga-WPKkDvPLPJ4ZdF4QHqKTnSLeNQhmC-xiDDA';
    const that = this;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
      // Sign-out successful.
      return this.fireAuth.signInWithCustomToken(token)
      .then(function(response) {
        this.g.wdLog(['obsLoggedUser - authService.authenticateFirebaseCustomToken']);
        // that.getToken();????
        return response;
      })
      .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
      });
    })
    .catch(function(error) {
      console.error('Error setting firebase auth persistence', error);
    });
  }
  
  // Signin with Facebook
  // signInWithFacebook(): any {
  //   return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //   .then(res => console.log(res));
  // }


  // Register User with Email
  register(email: string, password: string, firstname: string, lastname: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password); 
  }

  // delete account
  delete(){
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
      // User deleted.
      console.log("delete OK ");
    }).catch(function(error) {
      // An error happened.
      console.log("delete with error: ",error);
    });
  }

  // Reset Password
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
  
  logoutUser() {
    console.log("AuthService::logoutUser")

    return firebase.auth().signOut()
    //return this.afAuth.auth.signOut();
    // .then((res) => {
    //   console.log("logout1",res);
    //   console.log("logout2", this.getUser());
    // })
    // .catch(function(error) {
    //   console.log("logout failed: " + error.message)
    // });
  }
  //End Firebase Auth//
}
