import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../../../server/models/message';
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
    this.messages.sort((a, b) => a.id.localeCompare(b.id));
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessages(){
    this.http.get<Message[]>('http://localhost:3000/messages')
    .subscribe(
      (messages: Message[]) => {
       // console.log(messages);
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        // this.messages.sort((a, b) => a.subject.localCompare(b.subject));
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

  // addMessage(message: Message){
  //   this.messages.push(message);
  //   this.storeMessages();
  // }

  addMessage(messageObject: Message) {
    console.log(messageObject);
    if (!messageObject) {
      return;
      
    }

    // make sure id of the new Document is empty
    messageObject.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, messageObject: Message }>('http://localhost:3000/messages',
      messageObject,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.messageObject);
          this.storeMessages();
        }
      );
  }

  messageSelectedEvent = new EventEmitter<Message>()
}
