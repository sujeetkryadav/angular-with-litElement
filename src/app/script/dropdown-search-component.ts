import {
  LitElement,
  html
} from 'lit-element';
class DropDownSearchWebComponent extends LitElement {
  private searchResult: [];
  private selectedItem: string;
  private isSelected: boolean;
  private url: string;
  private width: number;
  private isSet: boolean;
  private placeholder: string;
  private static: string;
  private selectedList: any;
  private selectedLabels: any;
  private searchable = 'false';
  private multiple: string;
  private data: any;
  constructor() {
    super();
    this.searchable = 'false';
    this.searchResult = [];
    this.selectedItem = '';
    this.isSelected = false;
    this.width = 200;
    this.isSet = false;
    this.static = 'true';
    this.selectedList = [];
    this.selectedLabels = [];
    this.searchable = 'false';
  }
  createRenderRoot() {
    return this;
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
      },
      static: {
        type: String
      },
      data: {
        type: []
      },
      multiple: {
        type: String
      },
      selectedList: {
        type: []
      },
      selectedLabels: {
        type: []
      },
      searchable: {
        type: String
      }
    };
  }
  render() {
    return html `
      <style>
        dropdown-search-component .autocom-container-search .autocom:focus{
            outline: none;
        }
        dropdown-search-component .autocom-container-search{
            display: flex;
            flex-direction: row-reverse;
        }
        dropdown-search-component .autocom-container-search .autocom{
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
        dropdown-search-component .autocom-container-search ul{
            padding: 0px;
        }
        dropdown-search-component .autocom-container-search ul li{
            list-style: none;
            padding: 15px;
            cursor: pointer;
        }
        dropdown-search-component .autocom-container-search ul li:hover{
            background: #1a8099;
            color: #ffffff;
        }
        dropdown-search-component .autocom-container-search .drop-down-box{
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
        dropdown-search-component #close-icon {
          color: #4a4a4a;
          font-family: 'Helvetica', 'Arial', sans-serif;
          text-align: right;
          width: 20px;
          height: 20px;
          border-radius: 1px;
          position: absolute;
          cursor: pointer;
      }
      dropdown-search-component .autocom-container-search #list-container-dropdown{
        display: none;
        margin-left: 10px;
      }
    
      dropdown-search-component .btn{
        font-weight: 400;
        font-size: 12px;
        line-height: 1.2;
        text-shadow: none;
        text-transform: uppercase;
        background-image: none;
        border: 0;
        border-radius: 65px;
        box-shadow: none;
        padding: 11px 17px 9px;
        transform: translateZ(0);
        white-space: normal;
        word-wrap: break-word;
        max-width: 100%;
        background-color: #0f4958;
        color: #ffffff;
        cursor: pointer;
      }
      dropdown-search-component .btn-box{
        float: right;
        padding-right: 20px;
        padding-bottom: 20px;
      }
     
      </style>
      <div class="autocom-container-search" style="width: ${this.width}px">
      
      ${this.searchable === 'false' ? html `
      <input name="autocom" placeholder=${this.placeholder} .value="${this.selectedItem}" class="autocom" type="text" @click=${this.open} @keyup=${this.filter} readonly>` : html `<input name="autocom" placeholder=${this.placeholder} .value="${this.selectedItem}" class="autocom" type="text" @click=${this.open} @keyup=${this.filter}>`}
      ${!this.isSet ? html `<div style="position: absolute;"><i class="fa fa-angle-down"></i></div>` : ''}
      ${this.isSet ? html `<div id="close-icon" @click=${this.clearField} style="left: ${this.width - 10}px;">
        <i class="fa fa-times"></i> </div>` : ''}
      <div class="drop-down-box" id="list-container-dropdown">
         <ul id="list">
            ${this.searchResult.map((item, index) => html `
            <li @click=${this.selectItem.bind(this, item, index)}>
            ${this.multiple === 'true' ? html ` <input type="checkbox" id=check${index}>` : ''}
            ${item['name']}</li>`)}
         </ul>
         ${this.multiple === 'true' ? html `<div class="btn-box"><span class="btn" @click=${this.submit}>Ok</span></div>` : ''}
       </div>
       </div>`;
  }
  submit($event) {
    document.getElementById('list-container-dropdown').style.display = 'none';
    this.selectedItem = this.selectedLabels.join(',');
    this.isSet = true;
    this.dispatchEvent(new CustomEvent('on-change', {
      detail: this.selectedList
    }));
  }
  open($event) {
    document.getElementById('list-container-dropdown').style.display = 'block';
  }
  /*
   * TO Select item from search list
   */
  selectItem(item, index) {
    if (this.multiple !== 'true') {
      this.selectedItem = item.name;
      this.isSelected = false;
      this.isSet = true;
      document.getElementById('list-container-dropdown').style.display = 'none';
      // --- TO retun value to parent component ---//
      this.dispatchEvent(new CustomEvent('on-change', {
        detail: item
      }));
    } else {
      document.getElementById('check' + index)['checked'] = !document.getElementById('check' + index)['checked'];
      if (document.getElementById('check' + index)['checked']) {
        const indexExist = this.selectedList.indexOf(item);
        if (indexExist === -1)
          this.selectedList.push(item);
        this.selectedLabels.push(item['name']);
      } else {
        const indexTODelete = this.selectedList.indexOf(item);
        this.selectedList.splice(indexTODelete, 1);
        this.selectedLabels.splice(indexTODelete, 1);
      }
    }
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
    changedProperties.forEach((oldValue, propName) => {
      if (this.static === 'false') {
        if (propName === 'url' && (this.url !== undefined && this.url !== 'undefined')) {
          this.loadData(this.url);
        }
      } else if (propName === 'data') {
        this.searchResult = JSON.parse(this.data);
      }
    });
  }
  loadData(url) {
    const self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.searchResult = JSON.parse(this.response);
      }
    };
    xhttp.send();
  }
  filter($event) {
    this.isSelected = true;
    document.getElementById('list-container-dropdown').style.display = 'block';
    document.querySelectorAll('#list li').forEach((val, index) => {
      const txtValue = val.textContent;
      if (txtValue.toUpperCase().indexOf($event.target.value.toUpperCase()) > -1) {
        val['style'].display = 'block';
      } else {
        val['style'].display = 'none';
      }
    });
  }
}
customElements.define('dropdown-search-component', DropDownSearchWebComponent);
