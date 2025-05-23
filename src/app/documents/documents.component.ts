import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';
@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {

  selectedDocument: Document | null = null;

  constructor(private documentService: DocumentService){
    this.documentService.documentSelectedEvent

  }

  ngOnInit(){
    this.documentService.documentSelectedEvent.subscribe((doc)=>{
      this.selectedDocument = doc
    })
  }
}
