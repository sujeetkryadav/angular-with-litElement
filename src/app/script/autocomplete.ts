import {
  LitElement,
  html
} from 'lit-element';
class AutocompleteWebComponent extends LitElement {
  private searchResult: [];
  private selectedItem: string;
  private isSelected: boolean;
  private url: string;
  private width: number;
  private isSet: boolean;
  placeholder: string;
  constructor() {
    super();
    this.searchResult = [];
    this.selectedItem = '';
    this.isSelected = false;
    this.width = 200;
    this.isSet = false;
  }
  static get properties() {
    return {
      searchResult: {
        type: []
      },
      selectedItem: {
        type: String
      },
      isSelected: {
        type: Boolean
      },
      isSet: {
        type: Boolean
      },
      url: {
        type: String
      },
      width: {
        type: Number
      },
      placeholder: {
        type: String
      }
    };
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return html `
    <style>
    autocomplete-component .autocom:focus{
            outline: none;
        }
        autocomplete-component .autocom{
             width: 100%;
             height: 25px;
             margin: 0;
             border-top: 0;
             border-left: 0;
             border-right: 0;
             border-bottom: 1px;
             border-style: solid;
             padding: 0;
             font-size: 14px;
             color: #4a4a4a;
             line-height: 1.8px;
             border-color: #4a4a4a;
        }
        autocomplete-component .autocom-container{
          display: flex;
          flex-direction: row-reverse;
        }
        autocomplete-component .autocom-container ul{
            padding: 0px;
        }
        autocomplete-component .autocom-container ul li{
            list-style: none;
            padding: 15px;
            cursor: pointer;
        }
        autocomplete-component .autocom-container ul li:hover{
            background: #1a8099;
            color: #ffffff;
        }
        autocomplete-component .drop-down-box{
             box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
             max-height: 250px;
             overflow: auto;
             position: absolute;
             background: #ffffff;
             right: 0;
             left: 0;
             width: inherit;
             margin-left: 10px;
             margin-left: 8px;
             margin-top: 25px;
        }
        autocomplete-component #close-icon {
          color: #4a4a4a;
          font-family: 'Helvetica', 'Arial', sans-serif;
          text-align: right;
          width: 20px;
          height: 20px;
          border-radius: 1px;
          position: absolute;
          cursor: pointer;
      }
     
      </style>
      <div class="autocom-container" style="width: ${this.width}px">
     
      <input name="autocom" placeholder=${this.placeholder} .value="${this.selectedItem}" class="autocom" type="text" @keyup=${this.handleKeyEvent}>
      ${!this.isSet ? html `<div style="position: absolute;"><i class="fa fa-angle-down"></i></div>` : ''}
      ${this.isSet ? html `<div id="close-icon" @click=${this.clearField} style="left: ${this.width - 10}px;">
        <i class="fa fa-times"></i>
      </div>` : ''}
      ${(this.searchResult.length !== 0 && this.isSelected) ? html `<div class="drop-down-box">
         <ul>
            ${this.searchResult.map((item) => html `<li @click=${this.selectItem.bind(this, item)}>${item['name']}</li>`)}
         </ul>
       </div>` : ''}
       </div>`;
  }
  handleKeyEvent($event) {
    const self = this;
    const url = this.url;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.setRequestHeader('api-hostname-override', 'fit2');
    xhttp.setRequestHeader('orgoid', 'FFFFFFFFFFFFFFFF');
    xhttp.setRequestHeader('associateoid', 'G3SV41CCKCT1KJXW');
    xhttp.setRequestHeader('sm_userdn', 'uid=sbadigenchala2@adp,ou=Users,o=adp,ou=clients,o=adp.com');
    xhttp.setRequestHeader('isisessionid', '12347867675');
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.searchResult = JSON.parse(this.response);
        self.isSelected = true;
      }
    };
    // tslint:disable-next-line:no-unused-expression
    if ($event.target.value.length > 2) {
      xhttp.send();
    }
  }
  /*
   * TO Select item from search list
   */
  selectItem(item) {
    this.selectedItem = item.name;
    this.isSelected = false;
    this.isSet = true;
    // --- TO retun value to parent component ---//
    this.dispatchEvent(new CustomEvent('on-change', {
      detail: item
    }));
  }
  /*
   * TO Clear selected field
   */
  clearField($event) {
    this.selectedItem = '';
    this.isSet = false;
  }

}
customElements.define('autocomplete-component', AutocompleteWebComponent);
