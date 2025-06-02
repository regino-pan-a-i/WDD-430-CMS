import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';
@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  document: Document | null | undefined;
  nativeWindow: any

  constructor(
    private documentService: DocumentService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private windrefService: WindRefService
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      // handle params here, e.g., fetch document by id
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });

    this.nativeWindow = this.windrefService.getNativeWindow()
  }

  onView(){
    if (this.document?.url){
      this.nativeWindow.open(this.document?.url)
    }
  }
  
  onDelete() {
    if (this.document) {
      this.documentService.deleteDocument(this.document);
      // route back to the '/documents' URL
      this.router.navigate(['/documents']);
    }
  }
}
