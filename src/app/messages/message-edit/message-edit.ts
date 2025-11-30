import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit {
  currentSender = '1';
  //@Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('msgText') msgText: ElementRef;
  @ViewChild('subject') subject: ElementRef;
  onSendMessage() {
    const msgText = this.msgText.nativeElement.value;
    const subject = this.subject.nativeElement.value;
    const newMessage = new Message('0', subject, msgText, this.currentSender);
    //this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);
    console.log(newMessage);
  }

  onClear() {
    this.msgText.nativeElement.value = '';
    this.subject.nativeElement.value = '';
  }

  constructor(
    private messageService: MessageService
  ){}
}
