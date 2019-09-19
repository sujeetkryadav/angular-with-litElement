import { Component } from '@angular/core';
import './script/autocomplete';
import './script/dropdown-search-component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-and-polymer';
  url = 'http://scp-services-fit2.avs.adp.com/clientOnboarding/core/v2/clients/basicinfo?$contains=clientid&$id=';
  isSelected = false;
  serviceUrl: string;
  recipientUrl: string;
  /*
   * TO Get value back from web component
   */
  onChanged($event) {
    console.log('Changed', $event.detail);
    this.isSelected = true;
    this.serviceUrl = 'https://jsonplaceholder.typicode.com/users/' + $event.detail.id;
    this.recipientUrl = 'https://jsonplaceholder.typicode.com/users/' + $event.detail.id;
  }
}
