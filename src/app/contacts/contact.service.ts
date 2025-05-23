import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  @Output() contactSelectedEvent = new EventEmitter

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    const contact = this.contacts.find(contact => contact.id === id);
    return contact ? contact : null;
  }

}
