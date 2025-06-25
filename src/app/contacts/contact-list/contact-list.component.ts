import { Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {

  subject: Subscription| undefined

  term : string = ''
  contacts: Contact[] = []

  constructor(private contactService : ContactService){
    this.contactService.contactSelectedEvent
  }

  ngOnInit(){

    this.subject = this.contactService.contactListChangedEvent.subscribe( contactList =>{
      this.contacts = contactList
    })
    this.contacts = this.contactService.getContacts()
    // this.contactService.contacChangedEvent.subscribe(newContacts =>{
    //   if (this.contacts){
    //     this.contacts = newContacts
    //   }
    // })
  }

  ngOnDestroy(){
    this.subject?.unsubscribe()
  }

  search(value: string) {
    this.term = value;
  }
}
