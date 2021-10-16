//importar la vista de error
//importar la vista de success
//importar el pubsub

import PubSub from "../services/PubSub";
import { errorView, successView } from "../javascript/view";

export default class msgController{
    constructor(element){
        this.element = element;
        //por defecto, me suscribo al error
        PubSub.subscribe(PubSub.events.AD_ERROR, error => {
            this.showError(error)
        });
        PubSub.subscribe(PubSub.events.AD_SUCCESS, msg => {
            this.showSuccess(msg)
        });
    }
    showError(msg) {
        this.showError.innerHTML = errorView(msg);
        this.attachCloseMessageEventListener()
    }
    showSuccess(msg) {
        this.showSuccess.innerHTML = successView(msg);
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