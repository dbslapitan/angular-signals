import {Injectable, signal} from "@angular/core";
import {Message, MessageSeverity} from "../models/message.model";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  #messageSignal = signal<null | Message>(null);
  message = this.#messageSignal.asReadonly();

  showMessage(message: Message): void {
    this.#messageSignal.set(message);
  }

  clear(){
    this.#messageSignal.set(null);
  }
}
