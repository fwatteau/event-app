import {Component, Input} from "@angular/core";
import { AuthService } from "../service/auth.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import {Event} from "../model/event";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  user: Observable<firebase.User>;
  @Input() email = "";
  @Input() password = "";
  events$: FirebaseListObservable<Event[]>;
  @Input() msgVal: string;
  selectedEvent: Event;

  constructor(public af: AngularFireDatabase, public authService: AuthService) {
    this.events$ = af.list("/events", {
      query: {
        limitToLast: 50,
        orderByChild: "date",
      }
    });

    this.events$.subscribe((events) => {
          const result = events.filter(function (item) {
            return item.date > Date.now();
          });
          if (result && result.length) {
            this.selectedEvent = result[0];
          } else {
            this.selectedEvent = null;
          }
        }
    );

    this.user = this.authService.user;
  }

  Send(desc: string) {
    const eve = new Event();
    eve.id = 2;
    eve.name = "test";
    eve.date = new Date("2017-10-01").getTime()
    this.events$.push(eve);
  }
}
