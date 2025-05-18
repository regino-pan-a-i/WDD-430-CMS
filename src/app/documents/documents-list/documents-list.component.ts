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
    new Document('1', 'Where the Wild Things Are', 'A story about a boy named Max who sails to the land of the Wild Things and becomes their king.', 'https://www.example.com/where-the-wild-things-are', 'children'),
    new Document('2', 'Charlotte\'s Web', 'A classic tale of friendship between a pig named Wilbur and a spider named Charlotte.', 'https://www.example.com/charlottes-web', 'children'),
    new Document('3', 'The Very Hungry Caterpillar', 'Follows a caterpillar as it eats its way through the days of the week and eventually becomes a butterfly.', 'https://www.example.com/the-very-hungry-caterpillar', 'children'),
    new Document('4', 'Green Eggs and Ham', 'A rhyming story by Dr. Seuss about trying new things, especially green eggs and ham.', 'https://www.example.com/green-eggs-and-ham', 'children')
  ]

  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
