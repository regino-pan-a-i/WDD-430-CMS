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
      .get('http://localhost:3000/contacts')
      .subscribe((contacts: any) => {
          if (contacts) {
            this.contacts = Object.values(contacts) as Contact[];
          } else {
            this.contacts = [];
          }
          this.maxContactId = this.getMaxId()
          // sort the list of contacts
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

  // addContact(newContact: Contact){
  //   if (newContact){
  //     this.maxContactId ++
  //     newContact.id = this.maxContactId.toString()
  //     this.contacts.push(newContact)
  //     this.updateContacts()
  //   }
  // }
  addContact(contact: Contact) {
      if (!contact) {
        return;
      }
  
      // make sure id of the new Contact is empty
      contact.id = '';
  
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      // add to database
      this.httpClient.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
        contact,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new document to documents
            this.contacts.push(responseData.contact);
          }
      );
    }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    const contact = this.contacts.find(contact => contact.id === id);
    return contact ? contact : null;
  }

  // updateContact(originalContact: Contact | null, newContact:Contact){
  //   if (originalContact && newContact){
  //     const pos=  this.contacts.indexOf(originalContact)
  //     if (pos < 0) return

  //     newContact.id = originalContact.id
  //     this.contacts[pos] = newContact

  //     this.updateContacts()
  //   }
  // }
  updateContact(originalContact: Contact | null, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.httpClient.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts[pos] = newContact;
          // this.sortAndSend();
        }
      );
  }

//   deleteContact(contact: Contact | null) { 
//     if (contact){
//       const index = this.contacts.indexOf(contact)
//       this.contacts.splice(index, 1)
//       this.updateContacts()
//     }
//  }

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

  deleteContact(contact: Contact | null) {
  
      if (!contact) {
        return;
      }
  
      const pos = this.contacts.findIndex(d => d.id === contact.id);
  
      if (pos < 0) {
        return;
      }
  
      // delete from database
      this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
        .subscribe(
          (responseData) => {
            this.contacts.splice(pos, 1);
            // this.sortAndSend();
          }
        );
    }

  // updateContacts(){
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.httpClient.put('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/contacts.json', JSON.stringify(this.contacts), {headers})
  //     .subscribe((response: any)=> {
  //       this.contactListChangedEvent.next(this.contacts.slice())
  //     })
  // }
}
