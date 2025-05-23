import { EventEmitter, Injectable, Output } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = []

  @Output() documentSelectedEvent = new EventEmitter<Document>

  constructor() {
   this.documents = MOCKDOCUMENTS; 
  }

  getDocuments(): Document[]{
    return this.documents.slice()
  }

  getDocument(id: string): Document | null{
    const document = this.documents.find((doc) => doc.id === id)

    return document ? document : null
  }
}
