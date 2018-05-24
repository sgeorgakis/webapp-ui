import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  /**
   * If the user presses the close button,
   * discard the message.
   */
  clear() {
    this.messageService.clear();
  }

}
