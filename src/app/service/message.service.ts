import { Injectable } from '@angular/core';
import { Message } from '../model/message';

import { ERROR_MESSAGE_TYPE } from '../../assets/constants';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  public message: Message;

  constructor() { }

  displayMessage(type: string, description: string) {
    if (type === ERROR_MESSAGE_TYPE) {
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
