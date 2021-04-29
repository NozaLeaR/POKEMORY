import './card.component.scss';
import './card.component.html';
import template from './card.component.html';
import { Component } from '../../../utils/component';


export class CardComponent extends Component {
    constructor(id) {
        super('card')
        // is this card flipped ?
        this._flipped = false;
        // has the matching card has been discovered already ?
        this.matched = false;
        this._id = id;


        const elt = super.getElement();
        this._imageElt = elt.querySelector('.card-wrapper');
        this._imageElt.querySelector('img.front-face').src = `src/app/components/game/card/assets/card-${this._id}.png`;
        this._imageElt.querySelector('img.back-face').src = 'src/app/components/game/card/assets/back.png';


    }

    getTemplate() {
        return template;
    }

    flip() {
        this._imageElt.classList.toggle('flip');
        this._flipped = !this._flipped;
    }

    equals(card) {
        return card._id === this._id;
    }

    get flipped() {
        return this._flipped;
    }

    get host() {
        debugger
        throw new Error(atob('VG9vIGJhZCEgV2l0aG91dCBjbG9zdXJlLCBJIGNhbiBjb2xsaWRlIGJ5IG1pc3Rha2VzICB3aXRoIGdsb2JhbCB2YXJpYWJsZXMgdGhhdCBoYXZlIGJlZW4gc2V0IGluIGFub3RoZXIgZmlsZQ'));
    }
}

// TODO Step 6 implement getTemplate() {}

var environment = {
    api: {}
};

