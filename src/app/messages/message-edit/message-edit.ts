import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit {
  currentSender = 'Brock';
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('msgText') msgText: ElementRef;
  @ViewChild('subject') subject: ElementRef;
  onSendMessage() {
    const msgText = this.msgText.nativeElement.value;
    const subject = this.subject.nativeElement.value;
    const newMessage = new Message('0', subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.msgText.nativeElement.value = '';
    this.subject.nativeElement.value = '';
  }
}
