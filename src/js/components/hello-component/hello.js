const CAT_API = 'https://catfact.ninja/fact'

const template = document.createElement('template')

template.innerHTML = `
<div>
  <h2>Cat-app</h2>
  <h4>Did you know?</h4>
  <p id="catFact"></p>
  <button class="nextButton">Another fact</button>
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
    #nextButton

    /**
     * Place holder for the cat facts.
     */
    #catFactElement

    /**
     * Lifecycle method called when the component is connected to the DOM.
     */
    connectedCallback () {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.loadCatFact()
      this.#nextButton = this.shadowRoot.querySelector('.nextButton')
      this.#catFactElement = this.shadowRoot.querySelector('#catFact')

      this.#nextButton.addEventListener('click', () => this.loadCatFact())
    }

    /**
     * Loads a random cat fact from the API and displays it in the component.
     */
    async loadCatFact () {
      try {
        const response = await fetch(CAT_API)
        const data = await response.json()

        if (response.ok) {
          this.#catFactElement.textContent = data.fact
        } else {
          console.error('Failed to fetch cat fact:', response.status, data.message)
        }
      } catch (error) {
        console.error('Error occurred while fetching cat fact:', error)
      }
    }
  })
  