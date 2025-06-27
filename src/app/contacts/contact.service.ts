import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactListChangedEvent = new Subject<Contact[]>
 
  contacts: Contact[] = [];

  @Output() contacChangedEvent = new EventEmitter<Contact[]>

  @Output() contactSelectedEvent = new EventEmitter

  maxContactId: number


  constructor(private httpClient: HttpClient) { 
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId()
    this.httpClient
          .get('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/contacts.json')
          .subscribe((contacts: any) => {
              if (contacts) {
                this.contacts = Object.values(contacts) as Contact[];
              } else {
                this.contacts = [];
              }
              this.maxContactId = this.getMaxId()
              // sort the list of documents
              this.contacts.sort()
              // emit the next document list change event
              this.contactListChangedEvent.next(this.contacts)
            },
            // error method
            (error: any) => {
                throw error;
            } 
          )
  }

  addContact(newContact: Contact){
    if (newContact){
      this.maxContactId ++
      newContact.id = this.maxContactId.toString()
      this.contacts.push(newContact)
      this.updateContacts()
    }
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    const contact = this.contacts.find(contact => contact.id === id);
    return contact ? contact : null;
  }

  updateContact(originalContact: Contact | null, newContact:Contact){
    if (originalContact && newContact){
      const pos=  this.contacts.indexOf(originalContact)
      if (pos < 0) return

      newContact.id = originalContact.id
      this.contacts[pos] = newContact

      this.updateContacts()
    }
  }

  deleteContact(contact: Contact | null) { 
    if (contact){
      const index = this.contacts.indexOf(contact)
      this.contacts.splice(index, 1)
      this.updateContacts()
    }
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

  updateContacts(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient.put('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/contacts.json', JSON.stringify(this.contacts), {headers})
      .subscribe((response: any)=> {
        this.contactListChangedEvent.next(this.contacts.slice())
      })
  }
}
