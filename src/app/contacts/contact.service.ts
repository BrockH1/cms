import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../../../server/models/contact';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactListCangeedEvent = new Subject<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  maxContactId: number;

  constructor(
    private http: HttpClient
  ) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  storeContacts(){
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.contactListCangeedEvent.next(this.contacts.slice());
  }


  getContacts(): Contact[] {
    this.http.get<Contact[]>('http://localhost:3000/contacts')
    .subscribe(
      (contacts: Contact[]) => {
        console.log(contacts);
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListCangeedEvent.next(this.contacts.slice());
      }
    );
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      console.log(contact.id, id);
      if (contact.id === id) {
        return contact;
      }
  }
    return null;
  }

  // deleteContact(contact: Contact){
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.contactChangedEvent.emit(this.contacts.slice());
  // }

  getMaxId(): number {

    let maxId = 0;
    console.log(this.contacts);
    for (let contact of this.contacts){
      let currentId = Number(contact.id);
      if (currentId > maxId){
        maxId = currentId;
      }
    }

    return maxId;
  }

  // addContact(newContact: Contact) {
  //   if (!newContact) {
  //     return;
  //   }
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   this.storeContacts();
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Document is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contact);
          this.storeContacts();
        }
      );
  }

  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if (!originalContact || !newContact) {
  //     return;
  //   }

    updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.storeContacts()
        }
      );
  }

  //   const pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   this.storeContacts();
  // }

  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.storeContacts();
  // }

  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.storeContacts();
        }
      );
  }

  contactSelectedEvent = new EventEmitter<Contact>()
}
