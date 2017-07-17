import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  username: string;
  photo: string;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(
        value => {
            if (value) {
                this.username = (value.displayName ? value.displayName : value.email);
                this.photo = (value.photoURL ? value.photoURL : null);
            } else {
                this.username = "Non connecté";
            }
        }
    );
  }

   anon() {
    this.firebaseAuth.auth.signInAnonymously()
        .then(value => {
          this.username = value.email;
        });
   }

  facebook() {
    const facebook = new firebase.auth.FacebookAuthProvider();
    this.firebaseAuth.auth.signInWithPopup(facebook)
        .then(value => {
          this.username = value.user.displayName;
        });
  }

  signup(email: string, password: string) {
    this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
          console.log("Success!", value);
        })
        .catch(err => {
          console.log("Erreur:", err.message);
        });
  }

  login(email: string, password: string) {
    this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log("Nice, it worked!");
        })
        .catch(err => {
          console.log("Erreur:", err.message);
        });
  }

  logout() {
    this.firebaseAuth
        .auth
        .signOut();
  }

}
