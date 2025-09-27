import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Contacts } from './contacts/contacts';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactList } from './contacts/contact-list/contact-list';
import { Header } from './header/header';

@NgModule({
  declarations: [
    App,
    Contacts,
    ContactDetail,
    ContactList,
    Header
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
