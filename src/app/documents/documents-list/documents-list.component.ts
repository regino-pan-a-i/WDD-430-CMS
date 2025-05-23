import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-documents-list',
  standalone: false,
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css'
})
export class DocumentsListComponent {
  documents: Array<Document> = []

  // @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  constructor(private documentService: DocumentService){
    this.documentService.getDocuments()
    this.documentService.documentSelectedEvent
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

  ngOnInit(){
    this.documents = this.documentService.getDocuments()
  }
}
