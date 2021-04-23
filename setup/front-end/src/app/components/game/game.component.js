// TODO Step 7 import "./game.component.html"
import { parseUrl } from '../../utils/utils';

   // TODO Step 7 remove this closure
    let environment = {
        api: {
            host: 'http://localhost:8081'
        }
    };

    // TODO Step 3.1 create a class
    /* class GameComponent constructor */
    class GameComponent {
        constructor(id) {
            // gather parameters from URL
            let params = parseUrl();
            // save player name & game ize
            this._name = params.name;
            this._size = parseInt(params.size) || 9;
            this._flippedCard = null;
            this._matchedPairs = 0;
        }

        async init() {
            // fetch the cards configuration from the server
            const config = await this.fetchConfig();
            // TODO Step 3.2: use arrow function
            // create a card out of the config
            // TODO Step 3.3: use Array.map()
            this._cards = config.ids.map(x => new CardComponent(x));

            this._boardElement = document.querySelector('.cards');

            this._cards.forEach( // TODO Step 3.3: use Array.forEach()
                ((x) => {
                    let card = x;
                    this._boardElement.appendChild(card.getElement());
                    card.getElement().addEventListener('click', () => { this._flipCard(card) }); // TODO use arrow function.
                }));
            this.start();

        }

        start() {
            this._startTime = Date.now();
            let seconds = 0;
            // TODO Step 3.2: use template literals
            document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time:${seconds++}`;

            this._timer = setInterval(() => { // TODO Step 3.2: use arrow function
                // TODO Step 3.2: use template literals
                document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time:${seconds++}`;
            }, 1000);
        }

        gotoScore() {
            let timeElapsedInSeconds = Math.floor((Date.now() - this._startTime) / 1000);
            clearInterval(this._timer);

            setTimeout(() => { window.location = `../score/score.component.html?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`; }, 750);
            // TODO Step 3.2: use arrow function.
            // TODO Step 1: replace with '../score.component.html' location
            // TODO Step 3.2: use template literals
            // TODO Step 7: change path to: `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`;
            // TODO Step 3.2: Why bind(this)?
        }

        async fetchConfig() {
            return fetch(`${environment.api.host}/board?size=${this._size}`, {
                method: "GET"
            })
                .then(response => response.json())
                .catch(error => console.log("Fetch config error", error));
        }


        _flipCard(card) {
            if (this._busy) {
                return;
            }

            if (card.flipped) {
                return;
            }

            // flip the card
            card.flip();

            // if flipped first card of the pair
            if (!this._flippedCard) {
                // keep this card flipped, and wait for the second card of the pair
                this._flippedCard = card;
            } else {
                // second card of the pair flipped...

                // if cards are the same
                if (card.equals(this._flippedCard)) {
                    this._flippedCard.matched = true;
                    card.matched = true;
                    this._matchedPairs += 1;

                    // reset flipped card for the next turn.
                    this._flippedCard = null;

                    if (this._matchedPairs === this._size) {
                        this.gotoScore();
                    }
                } else {
                    this._busy = true;

                    // cards did not match
                    // wait a short amount of time before hiding both cards
                    // TODO Step 3.2 use arrow function
                    setTimeout(() => {
                        // hide the cards
                        this._flippedCard.flip();
                        card.flip();
                        this._busy = false;

                        // reset flipped card for the next turn.
                        this._flippedCard = null;
                    }, 500);
                }
            }
        }
    }

    // TODO Step 6 implement getTemplate() {}


    // put component in global scope, tu be runnable right from the HTML.
    // TODO Step 7: export GameComponent
    window.GameComponent = GameComponent;


