import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactListChangedEvent = new Subject<Contact[]>
 
  contacts: Contact[] = [];

  @Output() contacChangedEvent = new EventEmitter<Contact[]>

  @Output() contactSelectedEvent = new EventEmitter

  maxContactId: number


  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId()
  }

  addContact(newContact: Contact){
    if (newContact){
      this.maxContactId ++
      newContact.id = this.maxContactId.toString()
      this.contacts.push(newContact)
      let contactsListClone = this.contacts.slice()
      this.contactListChangedEvent.next(contactsListClone)
    }
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    const contact = this.contacts.find(contact => contact.id === id);
    return contact ? contact : null;
  }

  updateContact(originalContact: Contact, newContact:Contact){
    if (originalContact && newContact){
      const pos=  this.contacts.indexOf(originalContact)
      if (pos < 0) return

      newContact.id = originalContact.id
      this.contacts[pos] = newContact

      let contactsListClone = this.contacts.slice()
      this.contactListChangedEvent.next(contactsListClone)
    }
  }

  deleteContact(contact: Contact) { 
    const index = this.contacts.indexOf(contact)
    this.contacts.splice(index, 1)
   let contactsListClone = this.contacts.slice()
   this.contactListChangedEvent.next(contactsListClone);
}

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach(contact=> {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }


}
