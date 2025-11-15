import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts/contact.model';
@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term){
    let newContacts: Contact[] = [];
    if (term && term.length > 0){
      newContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(term.toLowerCase()));
    }
  
  if (newContacts.length < 1){
    return contacts;
  }
  return newContacts;
}

}
