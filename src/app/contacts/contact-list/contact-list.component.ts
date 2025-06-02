import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  
  contacts: Contact[] = []

  constructor(private contactService : ContactService){
    this.contactService.contactSelectedEvent
  }

  ngOnInit(){
    this.contacts = this.contactService.getContacts()
    this.contactService.contacChangedEvent.subscribe(newContacts =>{
      if (this.contacts){
        this.contacts = newContacts
      }
    })
  }
}
