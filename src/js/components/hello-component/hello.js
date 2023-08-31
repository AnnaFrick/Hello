const template = document.createElement('template')

template.innerHTML = `
<div>
  <h2>Hello there</h2>
  <h4>Please enter your name</h4>
  <input type="text" id="name">
  <button id="enterButton">Enter name</button>
  <p id="greeting"></p>
</div>

<style>
  button {
    background-color: lightblue;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    transition: all 0.3s;
  }
  
  button:hover {
    background-color: royalblue;
  }
</style>
`
customElements.define('hello-app',

  /**
   * Custom element definition for the cat-app component.
   */
  class extends HTMLElement {
    /**
     * A button to show the next cat fact.
     */
    #enterButton

    /**
     * Place holder for a surprise greeting.
     */
    #greeting
    
    #name

    /**
     * Lifecycle method called when the component is connected to the DOM.
     */
    connectedCallback () {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.loadGreeting()
      this.#enterButton = this.shadowRoot.querySelector('#enterButton')
      this.#name = this.shadowRoot.querySelector('#name')
      this.#greeting = this.shadowRoot.querySelector('#greeting')

      this.#enterButton.addEventListener('click', () => {
        const name = this.#name.value
        this.loadGreeting(name)
      })
    }

    /**
     * Loads a random cat fact from the API and displays it in the component.
     */
    async loadGreeting (name) {
      if (name != '') {
      try {
        this.#greeting.textContent = 'Hello there ' + name + ', hope you are having a great day'
      } catch (error) {
        console.error(error)
      }
      } else {
        this.#greeting.textContent = 'Hmm, that is not much of a name...'
      }
    }
  })
  