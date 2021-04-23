// TODO Step 7 import "./score.component.html"
import { parseUrl } from '../../utils/utils';

// TODO Step 7 remove this closure

class ScoreComponent {
    constructor(id) {
        let params = parseUrl();
        this.name = params.name;
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    init() {
        document.getElementById('name').innerText = this.name;
        document.getElementById('size').innerText = this.size;
        document.getElementById('time').innerText = this.time;
    }
}
// TODO Step 3.1 create a class

// TODO Step 6 implement getTemplate() {}


// put component in global scope, tu be runnable right from the HTML.
// TODO Step 7 export ScoreComponent
window.ScoreComponent = ScoreComponent;

