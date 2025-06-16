import { Component } from '@angular/core';
import { Document } from '../document.model'
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {

  originalDocument: Document | null = null
  document: Document | null = null
  editMode: boolean = false
  constructor( 
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params["id"]
        if (!id){
          this.editMode = false
          return
        }
        this.originalDocument = this.documentService.getDocument(id)

        if (!this.originalDocument){
          return
        }
        this.editMode = true
        this.document = new Document (    
          this.originalDocument.id,
          this.originalDocument.name,
          this.originalDocument.description,
          this.originalDocument.url,
          this.originalDocument.children
        )
      }
    )
  }

  onSubmit(form: NgForm){
    let value = form.value
    let newDocument = new Document('0', value['name'], value['description'], value['url'], '')
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    }else{
      this.documentService.addDocument(newDocument)
    }
    this.router.navigateByUrl("/documents")
  }
  onCancel(){
    this.router.navigateByUrl("/documents")
  }
}
