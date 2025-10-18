import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})
export class MessageItem {
  @Input() message: Message;

  messageSender: string;

  ngOnInit(){
    const contact: Contact = this.contactService.getContact(this.message.sender);
    if (contact != null){
      this.messageSender = contact.name;
    }
    else{
      this.messageSender = this.message.sender
    }
  }
  constructor(
    private contactService: ContactService
  ){}
}
