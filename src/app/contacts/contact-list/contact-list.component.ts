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
   
  // contact1 = new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg",[])
  // contact2 = new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", []) 

  // @Output() selectedContactEvent = new EventEmitter<Contact>();





  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact)

  }
  
  contacts: Contact[] = []

  constructor(private contactService : ContactService){
    this.contactService.contactSelectedEvent
  }

  ngOnInit(){
    this.contacts = this.contactService.getContacts()
  }
}
