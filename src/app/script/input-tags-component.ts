import {
  LitElement,
  html
} from 'lit-element';
class InputTagsWebComponent extends LitElement {
  private searchResult: [];
  private selectedItem: string;
  private isSelected: boolean;
  private url: string;
  private width: number;
  private isSet: boolean;
  private placeholder: string;
  private userList: any;
  constructor() {
    super();
    this.searchResult = [];
    this.selectedItem = '';
    this.isSelected = false;
    this.width = 200;
    this.isSet = false;
    this.userList = [];
    this.url = undefined;
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
      userList: {
        type: []
      },
    };
  }
  render() {
    return html `
      <style>
      input-tags-component #tags {
        max-width: 600px;
        border-bottom: 1px solid #4a4a4a;
        padding: 5px;
        padding-left:0px;
    }
    input-tags-component #tags .tag {
        display: flex;
        float: left;
        color: #FFFFFF;
        background: gray;
        padding: 4px 22px 6px 8px;
        border-radius: 10px;
        line-height: 12px;
        transition: all 0.3s ease-in-out;
        margin-right: 5px;
        margin-top: 1px;
    }
    input-tags-component #tags .tag .close {
        background: #1a8099;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.3s;
        margin-right: -15px;
        margin-left: 5px;
    }
    input-tags-component #tags .tag .close:after {
        content: "×";
        font-weight: 900;
        float: right;
    }
    input-tags-component #add_tag{
      outline: none;
      border: none;
    }
    input-tags-component .autocom-container-tags ul{
      padding: 0px;
  }
  input-tags-component .autocom-container-tags ul li{
      list-style: none;
      padding: 15px;
      cursor: pointer;
  }
  input-tags-component .autocom-container-tags ul li:hover{
      background: #1a8099;
      color: #ffffff;
  }
  input-tags-component #close-icon {
          color: #4a4a4a;
          font-family: 'Helvetica', 'Arial', sans-serif;
          text-align: right;
          width: 20px;
          height: 20px;
          border-radius: 1px;
          position: absolute;
          cursor: pointer;
      }
      input-tags-component .autocom-container-tags .drop-down-box{
       box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
       max-height: 250px;
       overflow: auto;
       position: absolute;
       background: #ffffff;
       right: 0;
       left: 0;
       width: inherit;
       display: none;
        margin-left: 10px;
        margin-top: 0; 
  }
   
      </style>
      <div class="autocom-container-tags" style="width: ${this.width}px">
      <div id="tags">
        <div id="tag-wrapper">
        ${this.userList.map((item) => html `<div class="tag"><div>${item['name']}</div><div class="close" @click=${this.removeUser.bind(this, item)}></div><div>`)}
        </div>
        <div id="input-wrapper">
          <input type="text" id="add_tag" 
          placeholder=${this.placeholder} .value="${this.selectedItem}" @keyup=${this.filter}>
        </div>
      </div>
      
       <div class="drop-down-box" id="list-container-tags">
         <ul id="list">
            ${this.searchResult.map((item) => html `<li @click=${this.selectItem.bind(this, item)}>${item['name']}</li>`)}
         </ul>
       </div></div>`;
  }
  /*
   * TO Select item from search list
   */
  selectItem(item) {
    this.selectedItem = null;
    this.isSelected = false;
    this.isSet = true;
    document.getElementById('list-container-tags').style.display = 'none';
    if (this.userList.indexOf(item) === -1) {
      this.userList.push(item);
      // this.shadowRoot.getElementById('tag-wrapper')
      // .insertAdjacentHTML('beforeend', '<div class="tag"><div>'+item.name+'</div><div class="close"></div><div>');
    }
    // --- TO retun value to parent component ---//
    this.dispatchEvent(new CustomEvent('on-change', {
      detail: this.userList
    }));
  }
  /*
   * TO Clear selected field
   */
  clearField($event) {
    this.selectedItem = '';
    this.isSet = false;
    this.userList = [];
    this.dispatchEvent(new CustomEvent('on-change', {
      detail: this.userList
    }));
  }
  /*
   * To Detect change in property
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'url' && (this.url !== undefined && this.url !== 'undefined')) {
        this.loadData(this.url);
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
    document.getElementById('list-container-tags').style.display = 'block';
    document.querySelectorAll('#list li').forEach((val, index) => {
      const txtValue = val.textContent;
      if (txtValue.toUpperCase().indexOf($event.target.value.toUpperCase()) > -1) {
        val['style'].display = 'block';
      } else {
        val['style'].display = 'none';
      }
    });
  }
  removeUser(item) {
    const indexToDelete = this.userList.indexOf(item);
    this.userList = this.userList.filter((toDelete, index) => index !== indexToDelete);
    this.dispatchEvent(new CustomEvent('on-change', {
      detail: this.userList
    }));
  }
}
customElements.define('input-tags-component', InputTagsWebComponent);
