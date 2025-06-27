import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages : Message[] = []

  maxMessageId: number = 0

  @Output() messageChangedEvent = new EventEmitter<Message[]>

  constructor(private httpClient: HttpClient) { 
    // this.messages = MOCKMESSAGES
    this.httpClient.get('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/messages.json').
      subscribe(messages =>{
        if (messages){
          this.messages = Object.values(messages) as Message[]
        }else {
          this.messages = [];
        }
        this.maxMessageId = this.getMaxId()
        // sort the list of messages
        this.messages.sort()
        // emit the next message list change event
        this.messageChangedEvent.emit(this.messages)

    })
  }

  getMaxId(){
    let maxId = 0

    this.messages.forEach(message =>{
      let newId : number = message.id;
      if (newId > maxId){
        maxId = newId
      }
    })
    return maxId;
  }

  getMessages(): Message[]{
    return this.messages.slice()
  }

  getMessage(id: string): Message | null{
    const message = this.messages.find((doc) => doc.id === +id)

    return message ? message : null
  }

  addMessage(message: Message){
    this.messages.push(message)
    this.storeMessages()
  }

  storeMessages(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient.put('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/messages.json', JSON.stringify(this.messages), {headers})
      .subscribe((response: any)=> {
        this.messageChangedEvent.emit(this.messages.slice())
      })
  }
}
