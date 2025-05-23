import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages : Message[] = []

  @Output() messageChangedEvent = new EventEmitter<Message[]>

  constructor() { 
    this.messages = MOCKMESSAGES
  }

  getMessages(): Message[]{
    return this.messages.slice()
  }

  getMessage(id: string): Message | null{
    const message = this.messages.find((doc) => doc.id === id)

    return message ? message : null
  }

  addMessage(message: Message){
    this.messages.push(message)
    this.messageChangedEvent.emit(this.messages.slice())
  }
}
