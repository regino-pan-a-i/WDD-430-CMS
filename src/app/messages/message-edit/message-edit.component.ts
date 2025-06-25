import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService){  }

  addMessageSubmit(message: Event) {
    message.preventDefault();
  
    const form = message.target as HTMLFormElement;
    const subject = form['subject'].value;
    const messageText = form['message'].value;
  
    const incomingMessage = new Message(this.messageService.getMaxId() + 1, subject, messageText, 'Lali Cuadora');
    this.messageService.addMessage(incomingMessage)
    this.addMessageEvent.emit(incomingMessage);
  }

  clearForm() {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  }

}
