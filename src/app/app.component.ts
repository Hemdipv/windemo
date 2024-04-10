import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'windemo';

  activeLink: string = 'upload-document'; // Set default active link

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
