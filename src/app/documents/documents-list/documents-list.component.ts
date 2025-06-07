import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-documents-list',
  standalone: false,
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css'
})
export class DocumentsListComponent implements OnInit{

  subject : Subscription | undefined

  documents: Document[] = []

  // @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  constructor(private documentService: DocumentService){
    this.documentService.documentSelectedEvent
  }


  ngOnInit(){
    this.subject = this.documentService.documentListChangedEvent.subscribe( documentsList =>{
      this.documents = documentsList
    })
    this.documents = this.documentService.getDocuments()
    this.documentService.documentChangedEvent.subscribe((objects:Document[])=>{
      this.documents = objects
    })
  }
}
