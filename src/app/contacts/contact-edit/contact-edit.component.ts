import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {

  originalContact: Contact | null = null
  contact: Contact | null = null
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = ''
  invalidContact: boolean = false

  constructor(private contactService : ContactService, private router : Router, private route :ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params["id"]
        if (!id){
          this.editMode = false
          return
        }
        this.originalContact = this.contactService.getContact(id)

        if (!this.originalContact){
          return
        }
        this.editMode = true
        this.contact = new Contact (    
          this.originalContact.id,
          this.originalContact.name,
          this.originalContact.email,
          this.originalContact.phone,
          this.originalContact.imageUrl,
          this.originalContact.group
        )
        if (this.contact?.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.contact?.group))
        }
      }
    )
  }
  onSubmit(form: NgForm){
    let value = form.value
    let newContact = new Contact(
                              '0', 
                              value['name'], 
                              value['email'], 
                              value['phone'],
                              value['imageUrl'],
                              this.groupContacts)
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact)
    }else{
      this.contactService.addContact(newContact)
    }
    this.router.navigateByUrl("/contacts")
  }

  onRemoveItem(index : number){
    if (index){
      let i = index.toString()
      let temp = this.contactService.getContact(i)

      this.contactService.deleteContact(temp)
    }

  }
  onCancel(){
    this.router.navigateByUrl("/contacts")
  }
  isInvalidContact(newContact: Contact){
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      this.invalidContact = true
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        this.invalidContact = true
        return true;
      }
    }
    return false;
    
  }

  addToGroup(event: any) {
    const selectedContact: Contact = event.item.data;;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidContact = false
  }

  onRemoveItemFromGroup (index: number) {
    console.log(index)
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    console.log('this should happen')
    this.groupContacts.splice(index, 1);
    console.log('this too should happen')
}
}
