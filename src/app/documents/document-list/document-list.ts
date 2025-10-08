import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    console.log("testing");
    this.selectedDocumentEvent.emit(document);
  }

  documents : Document[] = 
  [
    new Document('1', 'Test Document', 'A test document', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null),
    new Document('2', 'Test Document 2', 'A test document 2', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null),
    new Document('3', 'Test Document 3', 'A test document 3', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null),
    new Document('4', 'Test Document 4', 'A test document 4', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null)
  ];
}
