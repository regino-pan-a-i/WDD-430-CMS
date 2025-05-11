import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {

  @Input() contact!: Contact;
  @Output() contactClick = new EventEmitter<Contact>();

  onClick() {
    this.contactClick.emit(this.contact);
  }

}
