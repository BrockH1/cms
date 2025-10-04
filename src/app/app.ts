import { Component, signal } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  selectedFeature: string = 'documents';
  switchView(selectedFeature: string) {
    console.log(selectedFeature);
    this.selectedFeature = selectedFeature;
  }
  protected readonly title = signal('cms');
}
