const GREETING_API = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&idRange=0-200"
const template = document.createElement('template')

template.innerHTML = `
<div>
  <h2>Hello there</h2>
  <div id="nameInput">
    <h4>Please enter your name</h4>
    <input type="text" id="name">
    <button id="enterButton">Enter name</button>
  </div>
  <p id="greeting"></p>
  <p id="joke"></p>
  <button id="newNameButton">Enter another name</button>
</div>

<style>
  button {
    background-color: royalblue;
    border: none;
    color: white;
    padding: 3px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    transition: all 0.1s;
    cursor: grab;
  }
  
  button:hover {
    background-color: darkblue;
  }

  #newNameButton {
    visibility: hidden;
  }
</style>
`
customElements.define('hello-app',

  /**
   * Custom element definition for the hello component.
   */
  class extends HTMLElement {
    /**
     * A button to enter a name.
     */
    #enterButton

    /**
     * Place holder for a surprise greeting.
     */
    #greeting

    #nameInput

    #name

    #joke

    #resetNameInput

    /**
     * Lifecycle method called when the component is connected to the DOM.
     */
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nameInput = this.shadowRoot.querySelector('#nameInput')
      this.#enterButton = this.shadowRoot.querySelector('#enterButton')
      this.#greeting = this.shadowRoot.querySelector('#greeting')
      this.#name = this.shadowRoot.querySelector('#name')
      this.#joke = this.shadowRoot.querySelector('#joke')
      this.#resetNameInput = this.shadowRoot.querySelector('#newNameButton')

      this.#enterButton.addEventListener('click', () => {
        const name = this.#name.value
        this.loadGreeting(name)
      })

      this.#resetNameInput.addEventListener('click', () => {
        this.#name.value = '';
        this.#nameInput.style.visibility = 'visible';
        this.#resetNameInput.style.visibility = 'hidden';
        this.#greeting.textContent = '';
        this.#joke.textContent = '';
      })
    }

    async loadGreeting(name) {
      try {
        if (name !== '' && name !== undefined) {
          this.#greeting.textContent = 'Hello there ' + name + ', hope you are having a great day. Here is a joke to make it even better: '
          
          const response = await fetch(GREETING_API)
          const jokeData = await response.json()
          const joke = jokeData.joke
          this.#joke.textContent = joke
          this.#nameInput.style.visibility = 'hidden'
          this.#resetNameInput.style.visibility = 'visible'
        } else {
          this.#greeting.textContent = 'Hmm, that is not much of a name...'
        }        
      } catch (error) {
          console.error(error)
      }
    }
  })
