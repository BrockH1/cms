import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Contacts } from './contacts/contacts';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactList } from './contacts/contact-list/contact-list';
import { Header } from './header/header';
import { ContactItem } from './contacts/contact-item/contact-item';
import { Documents } from './documents/documents';
import { DocumentList } from './documents/document-list/document-list';
import { DocumentItem } from './documents/document-item/document-item';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { Messages } from './messages/messages';
import { MessageItem } from './messages/message-item/message-item';
import { MessageEdit } from './messages/message-edit/message-edit';
import { MessageList } from './messages/message-list/message-list';
import { DropdownDirective } from './dropdown';
import { AppRoutingModule } from './app-routing';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { ContactEdit } from './contacts/contact-edit/contact-edit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsFilterPipe } from './contacts-filter-pipe';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    App,
    Contacts,
    ContactDetail,
    ContactList,
    Header,
    ContactItem,
    Documents,
    DocumentList,
    DocumentItem,
    DocumentDetail,
    Messages,
    MessageItem,
    MessageEdit,
    MessageList,
    DocumentEdit,
    ContactEdit,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    DropdownDirective,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
