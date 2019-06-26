import { html, render } from 'lit-html';

class Test extends HTMLElement {

  static get observedAttributes () {
    return ['title'];
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    if(val) {
      return this.setAttribute('title', val);
    }
    return this.removeAttribute('title');
  }

  constructor () {
    super();

    this.seconds = 0;
    this.minutes = 0;
    this.interval = null;

    const shadowRoot = this.attachShadow({mode: 'open'});

    this.increment = this.increment.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);

  }
  connectedCallback () {
    console.log('comp did mount');
    this.render();
    // this.shadowRoot.querySelector('.start').addEventListener('click', this.start, false);
    // this.shadowRoot.querySelector('.pause').addEventListener('click', this.pause, false);
    // this.shadowRoot.querySelector('.reset').addEventListener('click', this.reset, false);
  }
  disconnectedCallback () {
    console.log('comp unmount')
  }
  attributeChangedCallback (attr, prevVal, newVal) {
    console.log(attr, prevVal, newVal);
    this.render();
  }
  increment () {
    this.seconds++;

    if (this.seconds >= 5) {
      this.minutes++;
      this.seconds = 0;
    }
    this.render();
  }
  start () {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.increment();
    }, 1000);
  }
  pause () {
    clearInterval(this.interval);
  }
  reset () {
    this.pause();
    this.seconds = 0;
    this.minutes = 0;
    this.render();
  }
  render () {

    const template = () => html`
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <div class="card">
        <div class="card-body">
          <div class="title">${this.title}</div>
          <h4><span class="minutes">${this.minutes}</span>:<span class="seconds">${this.seconds}</span></h4>
        </div>
        <div class="card-footer">
          <button class="start btn btn-primary" @click="${this.start}">Start</button>
          <button class="pause btn btn-warning" @click="${this.pause}">Pause</button>
          <button class="reset btn btn-danger" @click="${this.reset}">Reset</button>
        </div>
      </div>
    `;

    render(template(), this.shadowRoot);
  }
}

customElements.define('test-comp', Test);