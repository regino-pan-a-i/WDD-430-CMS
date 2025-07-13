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
    // this.documents = MOCKDOCUMENTS; 
    this.maxDocumentId = this.getMaxId()

    this.httpClient
      .get('http://localhost:3000/documents')
      .subscribe((documents: any) => {
        console.log(documents)
        this.documents = Object.values(documents) as Document[];
        console.log(this.documents)
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
          throw error
        } 
      )
  }




  // addDocument(newDocument: Document){
  //   if (newDocument){
  //     this.maxDocumentId ++
  //     newDocument.id = this.maxDocumentId.toString()
  //     this.documents.push(newDocument)
  //     this.updateDocuments()

  //   }
  // }


  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.httpClient.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
        }
    );
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

  // updateDocument(originalDocument: Document | null, newDocument:Document){
  //   if (originalDocument && newDocument){
  //     const pos=  this.documents.indexOf(originalDocument)
  //     if (pos < 0) return

  //     newDocument.id = originalDocument.id
  //     this.documents[pos] = newDocument

      
  //     this.updateDocuments()
  //   }
  // }
  updateDocument(originalDocument: Document | null, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.httpClient.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents[pos] = newDocument;
          // this.sortAndSend();
        }
      );
  }
  // deleteDocument(document: Document) {
  //  if (!document) {
  //     return;
  //  }
  //  const pos = this.documents.indexOf(document);
  //  if (pos < 0) {
  //     return;
  //  }
  //  this.documents.splice(pos, 1);
   
  //  this.updateDocuments()
  // }

deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (responseData) => {
          this.documents.splice(pos, 1);
          // this.sortAndSend();
        }
      );
  }

  // updateDocuments(){
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.httpClient.put('https://full-stack-cms-a8a5b-default-rtdb.firebaseio.com/documents.json', JSON.stringify(this.documents), {headers})
  //     .subscribe((response: any)=> {
  //       this.documentListChangedEvent.next(this.documents.slice())
  //     })
  // }
}
