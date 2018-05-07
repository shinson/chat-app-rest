import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[];
  msg: Message;

  constructor(private messageService: MessageService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe(msgs => this.messages = msgs);
  }

  sendMessage(message: string): void {
    if (!message) { return; }
    
    let obj_msg = new Message()
    obj_msg['content'] = message;
    obj_msg['userId'] = parseInt(this.cookieService.get('User'));

    this.messageService.addMessage( obj_msg as Message)
      .subscribe(msg => {
        this.messages.push(msg);
      });
  }

}
