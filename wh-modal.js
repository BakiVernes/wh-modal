export default class WhModal extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._open = false;
    this._$modal = null;
    this._$backdrop = null;
    this._$button = null;
  }

  connectedCallback() {
    this._root.innerHTML = `
      <style>
        .open {
          display: block !important;
          z-index: 99;
        }
        .dp-button {
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          width: 100%;
        }
        .dp-container {
          position: inherit;
        }
        .mod-container {
          display: none;
        }
        .background {
          position: fixed;
          width: 100%;
          display: none;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          cursor: pointer;
        }
      </style>
      <div class="dp-container">
        <button class="dp-button">
          <slot name="modal-opener"></slot>
        </button>
        <div class="background"></div>
        <slot name="mod-content" class="mod-container">
        </slot>
      </div>
    `;

    this._$modal = this._root.querySelector(".mod-container");

    this._$backdrop = this._root.querySelector(".background");
    this._$backdrop.addEventListener("click", (event) => {
      this.open = false
    })

    this._$button = this._root.querySelector(".dp-button")
    this._$button.addEventListener("click", (event) => {
      this.open = true
    })
  }

  set open(value) {
    const result = (value === true)
    if (this._open === value) return
    this._open = result;
    this._render();
  }

  _render() {
    if (this._open === true) {
      this._$modal.classList.add("open");
      this._$backdrop.classList.add("open");
      this.dispatchEvent(new CustomEvent("modal-opened"));
    } else {
      this._$modal.classList.remove("open");
      this._$backdrop.classList.remove("open");
      this.dispatchEvent(new CustomEvent("modal-closed"));
    }
  }
}

if (!window.customElements.get('wh-modal')) {
  window.WhModal = WhModal
  window.customElements.define("wh-modal", WhModal)
}
