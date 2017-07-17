import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AngularFireModule } from "angularfire2";

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {environment} from "../environments/environment";

import { AuthService } from "../service/auth.service";
import { EventComponent } from "./event/event.component";
import {AccordionModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AccordionModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
