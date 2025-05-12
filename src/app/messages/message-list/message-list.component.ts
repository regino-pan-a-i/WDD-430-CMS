import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  messages: Array<Message> = [];

  message1 = new Message(1, 'Late for class', 'I apologize I could not get to class on time', 'Lali Cuadora');
  message2 = new Message(2, 'Late for class', 'No worries, life happens', 'Bro. Hilton');
  message3 = new Message(3, 'Late for class', 'Is there any way I can make up for the absence?', 'Lali Cuadora');
  message4 = new Message(4, 'Late for class', 'No', 'Bro. Hilton');

  constructor() {
    this.messages.push(this.message1);
    this.messages.push(this.message2);
    this.messages.push(this.message3);
    this.messages.push(this.message4);
  }


  onAddMessage(message: Message){
    this.messages.push(message)
  }
}
