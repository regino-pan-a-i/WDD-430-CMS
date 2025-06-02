import { EventEmitter, Injectable, Output } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  @Output() documentChangedEvent = new EventEmitter<Document[]>

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

  deleteDocument(document: Document) {
   if (!document) {
      return;
   }
   const pos = this.documents.indexOf(document);
   if (pos < 0) {
      return;
   }
   this.documents.splice(pos, 1);
   this.documentChangedEvent.emit(this.documents.slice());
}
}
