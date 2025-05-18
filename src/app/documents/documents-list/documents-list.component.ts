import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-documents-list',
  standalone: false,
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css'
})
export class DocumentsListComponent {
  documents: Array<Document> = [
    new Document('1', 'Document 1', 'Description 1', 'http://www.example.com', 'children'),
    new Document('2', 'Document 2', 'Description 2', 'http://www.example.com', 'children'),
    new Document('3', 'Document 3', 'Description 3', 'http://www.example.com', 'children'),
    new Document('4', 'Document 4', 'Description 4', 'http://www.example.com', 'children')
  ]

  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
