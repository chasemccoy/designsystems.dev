import { html } from 'https://unpkg.com/lit-html/lit-html.js'
import { css } from 'https://unpkg.com/lit-element?module'
import { component, useState } from 'https://unpkg.com/haunted/haunted.js'

const styles = css`
  :host {
    display: block;
    background: gray;
  }

  button {
    appearance: none;
    -webkit-appearance: none;
  }
`

function Counter({ start = 0 }) {
  const [count, setCount] = useState(parseInt(start))

  return html`
    <style>
      ${styles}
    </style>

    <div id="count">${count}</div>
    <button type="button" @click=${() => setCount(count + 1)}>
      Increment
    </button>
  `
}

Counter.observedAttributes = ['start']

customElements.define('my-counter', component(Counter))
