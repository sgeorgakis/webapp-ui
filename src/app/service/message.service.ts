import { Injectable } from '@angular/core';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  public message: Message;

  constructor() { }

  displayMessage(type: string, description: string) {
    if (type == 'error') {
      console.error(description);
    } else {
      console.info(description);
    }
    this.message = {
      type: type,
      description: description
    };
    setTimeout(() => this.clear(), 5000);
  }

  clear() {
    this.message = undefined;
  }

}
