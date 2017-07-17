import {Component, Input, OnInit} from "@angular/core";
import {Choice} from "../../model/choice";
import {Event} from "../../model/event";
import {User} from "firebase/app";
import {Sale} from "../../model/sale";
import {FirebaseListObservable} from "angularfire2/database";
import {escape} from "querystring";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Input() user: User;
  @Input() events$: FirebaseListObservable<Event[]>;

  constructor() {

  }

  ngOnInit() {

  }

  getCount(choice: Choice): number {
    let total = 0;
    this.event.sales.forEach(function(value) {
      const selection = value.choices.filter((c) => c.id === choice.id);
      selection.forEach((item) => total += item.quantity);
    });
    return total;
  }

  getUsers(choice: Choice): string {
    const users = [];

    this.event.sales.forEach(function(value) {
      const selection = value.choices.filter((c) => c.id === choice.id);
      if (selection.length > 0) {
        users.push(value.name + (selection[0].quantity > 1 ? " <kbd>x" + selection[0].quantity + "</kbd>" : ""));
      }
    });

    return users.join(", ");
  }

  getSale(): Sale {
    const res = this.event.sales.filter((item) => item.uid === this.user.uid);

    let sale;
    if (res.length) {
      sale = res[0];
      const newItems = this.event.choices.filter((c) => !sale.choices.filter((current) => current.id === c.id).length);
      newItems.forEach((choice) => {
        choice.quantity = 0;
        sale.choices.push(choice);
      })
    } else {
      sale = new Sale();
      sale.uid = this.user.uid;
      sale.date = Date.now();
      sale.choices = this.event.choices;
      sale.choices.forEach(c => c.quantity = 0);
      this.event.sales.push(sale);
    }

    sale.name = this.user.displayName;
    return sale;
  }

  addQuantity(choice: Choice): void {
    choice.quantity++;
    this.events$.update(this.event.$key, this.event);
  }

  removeQuantity(choice: Choice): void {
    choice.quantity--;
    this.events$.update(this.event.$key, this.event);
  }
}
