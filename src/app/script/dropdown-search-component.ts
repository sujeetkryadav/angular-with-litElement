import {LitElement, html} from 'lit-element';

class DropDownSearchWebComponent extends LitElement {
  private searchResult: [];
  private selectedItem: string;
  private isSelected: boolean;
  private url: string;
  private width: number;
  private isSet: boolean;
  private placeholder: string;
  static get properties() {
    return {
      searchResult: {type: []} ,
      selectedItem: {type: String},
      isSelected: {type: Boolean},
      isSet: {type: Boolean},
      url: {type: String},
      width: {type: Number},
      placeholder: {type: String}
    };
  }

  constructor() {
    super();
    this.searchResult  = [];
    this.selectedItem = '';
    this.isSelected = false;
    this.width = 200;
    this.isSet = false;
  }
  render() {
    return html`
      <style>
        .autocom:focus{
            outline: none;
        }
        .autocom{
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
        .autocom-container ul{
            padding: 0px;
        }
        .autocom-container ul li{
            list-style: none;
            padding: 15px;
            cursor: pointer;
        }
        .autocom-container ul li:hover{
            background: #1a8099;
            color: #ffffff;
        }
        .drop-down-box{
             box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
             max-height: 250px;
             overflow: auto;
             position: absolute;
             background: #ffffff;
             right: 0;
             left: 0;
             width: inherit;
        }
        #close-icon {
          color: #4a4a4a;
          font-family: 'Helvetica', 'Arial', sans-serif;
          text-align: right;
          width: inherit;
          height: 20px;
          border-radius: 1px;
          position: absolute;
          cursor: pointer;
      }
      </style>
      <div class="autocom-container" style="width: ${this.width}px">
       ${this.isSet ? html`<div id="close-icon" @click=${this.clearField}>
         <span id="x">X</span>
      </div>` : ''}
      <input name="autocom" placeholder=${this.placeholder} .value="${this.selectedItem}" class="autocom" type="text">
      ${(this.searchResult.length !== 0 && this.isSelected) ? html`<div class="drop-down-box">
         <ul>
            ${this.searchResult.map((item) => html`<li @click=${this.selectItem.bind(this, item)}>${item['name']}</li>`)}
         </ul>
       </div>` : ''
      }
       </div>`;
  }
  /*
   * TO Select item from search list
   */
  selectItem(item) {
    this.selectedItem = item.name;
    this.isSelected = false;
    this.isSet = true;
    // --- TO retun value to parent component ---//

  }
  /*
   * TO Clear selected field
   */
  clearField($event) {
    this.selectedItem = '';
    this.isSet = false;
  }
  /*
   * To Detect change in property
   */
  updated(changedProperties) {
    console.log(this.url);
    // tslint:disable-next-line:no-unused-expression
    if (this.url !== undefined && this.url !== 'undefined') {
        this.loadData(this.url);
    }
  }

  loadData(url) {
    const self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url , true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        self.searchResult = JSON.parse(this.response);
        self.isSelected = true;
      }
    };
    xhttp.send();
  }
}
customElements.define('dropdown-search-component', DropDownSearchWebComponent);
