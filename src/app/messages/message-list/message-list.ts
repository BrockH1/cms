import { Component } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {
  messages: Message[] = [
    new Message('1', 'Brock', 'Hello, how are you?', null),
    new Message('2', 'Misty', 'I am fine, thank you!', null),
    new Message('3', 'Ash', 'Are we going to the park today?', null)
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
