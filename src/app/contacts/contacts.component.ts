import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  selectedContact?: Contact;
  constructor(private contactService: ContactService){
  }


  ngOnInit(){
    this.contactService.contactSelectedEvent.subscribe((data)=>{
      this.selectedContact = data
    })
  }
}
