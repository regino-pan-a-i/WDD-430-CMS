import { EventEmitter, Injectable, Output } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentListChangedEvent = new Subject<Document[]>

  // @Output() documentChangedEvent = new EventEmitter<Document[]>

  documents: Document[] = []
  newDocuments: Document[] = []

  @Output() documentSelectedEvent = new EventEmitter<Document>

  maxDocumentId: number

  constructor(private httpClient: HttpClient) {
    this.documents = MOCKDOCUMENTS; 
    this.maxDocumentId = this.getMaxId()
    this.httpClient
      .get('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/documents.json')
      .subscribe((documents: any) => {
          if (documents) {
            this.documents = Object.values(documents) as Document[];
          } else {
            this.documents = [];
          }
          this.maxDocumentId = this.getMaxId()
          // sort the list of documents
          this.documents.sort()
          // emit the next document list change event
          this.documentListChangedEvent.next(this.documents)
        },
        // error method
        (error: any) => {
          console.log(error)
        } 
      )
  }




  addDocument(newDocument: Document){
    if (newDocument){
      this.maxDocumentId ++
      newDocument.id = this.maxDocumentId.toString()
      this.documents.push(newDocument)
      this.updateDocuments()

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

  updateDocument(originalDocument: Document | null, newDocument:Document){
    if (originalDocument && newDocument){
      const pos=  this.documents.indexOf(originalDocument)
      if (pos < 0) return

      newDocument.id = originalDocument.id
      this.documents[pos] = newDocument

      
      this.updateDocuments()
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
   
   this.updateDocuments()
  }

  updateDocuments(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient.put('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/documents.json', JSON.stringify(this.documents), {headers})
      .subscribe((response: any)=> {
        console.log(response)
        this.documentListChangedEvent.next(this.documents.slice())
      })
  }
}
