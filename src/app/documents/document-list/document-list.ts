import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList {

  subsctiption: Subscription;

  // onSelectedDocument(document: Document) {
  //   console.log("testing");
  //   this.documentService.documentSelectedEvent.emit(document);
  // }

  documents : Document[] = []

  constructor(
    private documentService: DocumentService
  ){}

  ngOnInit(){
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe((documents: Document[])=>{
      this.documents = documents;
    })
    this.subsctiption = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }

  ngOnDestroy() {
    this.subsctiption.unsubscribe();
  }
}
