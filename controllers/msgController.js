//importar la vista de error
//importar la vista de success
//importar el pubsub

import PubSub from "../services/PubSub.js";
import { errorView, successView } from "../javascript/view.js";

export default class msgController{
    constructor(element){
        this.element = element;
        PubSub.subscribe(PubSub.events.AD_ERROR, error => {
            this.showError(error)
        });
        PubSub.subscribe(PubSub.events.AD_SUCCESS, msg => {
            this.showSuccess(msg)
        });
    }
    showError(error) {
        console.log("fallo")
        this.element.innerHTML = errorView(error);
        this.attachCloseMessageEventListener()
    }
    showSuccess(msg) {
        this.element.innerHTML = successView(msg);
        this.attachCloseMessageEventListener()
    }
    attachCloseMessageEventListener() { //el boton de error esconde el mensaje
        const button = this.element.querySelector('button')
        button.addEventListener('click', () => {
            this.hideError()
        })
    }
    hideError() {
        this.element.innerHTML = ''
    }
}