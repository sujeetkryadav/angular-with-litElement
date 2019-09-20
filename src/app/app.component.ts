import { Component } from '@angular/core';
import './script/autocomplete';
import './script/dropdown-search-component';
import './script/input-tags-component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-and-polymer';
  url = 'https://jsonplaceholder.typicode.com/users/';
  isSelected = false;
  serviceUrl: string;
  recipientUrl: string;
  /*
   * TO Get value back from web component
   */
  onChanged($event) {
    console.log('Changed', $event.detail);
    this.isSelected = true;
    this.serviceUrl = 'https://jsonplaceholder.typicode.com/users/';
    this.recipientUrl = 'https://jsonplaceholder.typicode.com/users/';
  }

  onChangeService($event) {
    console.log($event);
  }
  onChangeRecipient($event) {
    console.log($event);
  }
}
