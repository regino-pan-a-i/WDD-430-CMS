import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  messages: Array<Message> = [];
;

  constructor(private messageService: MessageService) { 
    this.messageService.messageChangedEvent
  }


  // onAddMessage(message: Message){
  //   this.messages.push(message)
  // }

  ngOnInit(){
    this.messages =this.messageService.getMessages()
    this.messageService.messageChangedEvent.subscribe((msgs)=>{
      console.log('message received')
      this.messages = msgs
    })
  }
}
