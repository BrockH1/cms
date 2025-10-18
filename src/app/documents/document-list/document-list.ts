import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList {


  onSelectedDocument(document: Document) {
    console.log("testing");
    this.documentService.documentSelectedEvent.emit(document);
  }

  documents : Document[] = []

  constructor(
    private documentService: DocumentService
  ){}

  ngOnInit(){
    this.documents = this.documentService.getDocuments();
  }
}
