import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[];
  msg: Message;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.messageService.getMessages().subscribe(msgs => this.messages = msgs);
  }

  sendMessage(message: string): void {
    if (!message) { return; }
    let obj_msg = new Message()
    obj_msg['content'] = message;
    obj_msg['user'] = {'id': 1, 'username': 'Sonia'};
    this.messageService.addMessage( obj_msg as Message)
      .subscribe(msg => {
        this.messages.push(msg);
      });
  }

}
