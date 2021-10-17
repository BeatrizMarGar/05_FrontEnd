import DataService from "../services/DataService.js";
import PubSub from "../services/PubSub.js"

export default class adnewController {

    constructor(element) {
        this.element = element
        this.attachEventListeners()
    }

    attachEventListeners() {
        this.element.addEventListener('submit', async event => {
            event.preventDefault()

            if (this.element.checkValidity()) {
                const data = new FormData(this.element)
                const name = data.get('name')
                const sale = data.get('sale')
                const price = data.get('price')
                const description = data.get('description')
                try {
                    const result = await DataService.createAd(name, sale, price, description)
                    PubSub.publish(PubSub.events.AD_SUCCESS, 'Anunciado creado!')
                } catch (error) {
                    PubSub.publish(PubSub.events.AD_ERROR, error)
                }
            }
        })
    }

}
