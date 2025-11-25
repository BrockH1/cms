import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../../../server/models/document';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[];
  documentListChangedEvent = new Subject<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  maxDocumentId: number;

  constructor(
    private http: HttpClient
  ){
    this.documents = []
    this.maxDocumentId = this.getMaxId()
  }

  storeDocuments(){
    this.documents.sort((a, b) => a.name.localCompare(b.name));
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('http://localhost:3000/documents')
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document
      }
    }
    return null;
  }

  // deleteDocument(document: Document) {
  //  if (!document) {
  //     return;
  //  }
  //  const pos = this.documents.indexOf(document);
  //  if (pos < 0) {
  //     return;
  //  }
  //  this.documents.splice(pos, 1);
  //  this.documentChangedEvent.emit(this.documents.slice());
  // }

  getMaxId(): number {

    let maxId = 0

    for (let document of this.documents) {
      let currentId = Number(document.id)
      if (currentId > maxId) {
        maxId = currentId
      }
    }

    return maxId;
}

addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          // this.sortAndSend();
          this.storeDocuments();
        }
      );
  }

updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.storeDocuments();
        }
      );
  }

deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.storeDocuments();
        }
      );
  }

  documentSelectedEvent = new EventEmitter<Document>()
}
