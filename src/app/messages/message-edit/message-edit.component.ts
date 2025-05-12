import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  @Output() addMessageEvent = new EventEmitter<Message>();
  private idCounter = 0;

  addMessageSubmit(message: Event) {
    message.preventDefault();
  
    const form = message.target as HTMLFormElement;
    const subject = form['subject'].value;
    const messageText = form['message'].value;
  
    console.log('Subject:', subject);
    console.log('Message:', messageText);
  
    this.idCounter += 1;
  
    const incomingMessage = new Message(this.idCounter, subject, messageText, 'Lali Cuadora');
    this.addMessageEvent.emit(incomingMessage);
  }

}
