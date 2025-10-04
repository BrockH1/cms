import { Component, Input } from '@angular/core';
import { Message } from './message.model';
@Component({
  selector: 'cms-messages',
  standalone: false,
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {
  @Input() message: Message;
}
