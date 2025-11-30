import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList{
  contacts: Contact[] = []
  term: string = '';

  subscription: Subscription;

  onSelectedContact(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnInit(){
    this.contacts=this.contactService.getContacts()
    console.log(this.contacts);
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[])=>{
      this.contacts = contacts;
    })
    this.subscription = this.contactService.contactListCangeedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private contactService: ContactService
  ) {}

  search(value: string){
    this.term = value;
  }
}
