import { EventEmitter, Injectable, Output } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentListChangedEvent = new Subject<Document[]>

  // @Output() documentChangedEvent = new EventEmitter<Document[]>

  documents: Document[] = []

  @Output() documentSelectedEvent = new EventEmitter<Document>

  maxDocumentId: number

  constructor() {
   this.documents = MOCKDOCUMENTS; 
   this.maxDocumentId = this.getMaxId()
  }

  addDocument(newDocument: Document){
    if (newDocument){
      this.maxDocumentId ++
      newDocument.id = this.maxDocumentId.toString()
      this.documents.push(newDocument)
      let documentsListClone = this.documents.slice()
      this.documentListChangedEvent.next(documentsListClone)
    }
  }

  getDocuments(): Document[]{
    return this.documents.slice()
  }

  getDocument(id: string): Document | null{
    const document = this.documents.find((doc) => doc.id === id)

    return document ? document : null
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach(document => {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  updateDocument(originalDocument: Document, newDocument:Document){
    if (originalDocument && newDocument){
      const pos=  this.documents.indexOf(originalDocument)
      if (pos < 0) return

      newDocument.id = originalDocument.id
      this.documents[pos] = newDocument

      let documentsListClone = this.documents.slice()
      this.documentListChangedEvent.next(documentsListClone)
    }
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
   let documentsListClone = this.documents.slice()
   this.documentListChangedEvent.next(documentsListClone);
}
}
