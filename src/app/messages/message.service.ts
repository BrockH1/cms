import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];
  maxMessageId: number;


  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      } 
    }
    return maxId;
  }

  constructor(
    private http: HttpClient
  ){
    this.messages = [];
    this.maxMessageId = this.getMaxId();
  }


  storeMessages(){
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://fullstack-8f473-default-rtdb.firebaseio.com/messages.json',
    messages, {headers: headers}).subscribe(()=>{
      this.messageChangedEvent.emit(this.messages.slice());
    });
  }

  getMessages(){
    this.http.get<Message[]>('https://fullstack-8f473-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
        this.messageChangedEvent.emit(this.messages.slice());
      }
    );
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    for (let message of this.messages) {
      if (message.id === id) {
        return message
      }
    }
    return null;
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages();
  }

  messageSelectedEvent = new EventEmitter<Message>()
}
