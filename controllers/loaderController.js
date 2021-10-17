import PubSub from "../services/PubSub.js"
import { loaderView } from "../javascript/view.js"

export default class LoaderController {

    constructor(element) {
        this.element = element
        this.element.innerHTML = loaderView()
        PubSub.subscribe(PubSub.events.LOAD_SHOW, () => {
            this.showLoader()
        })
        PubSub.subscribe(PubSub.events.LOAD_HIDE, () => {
            this.hideLoader()
        })
    }

    hideLoader() {
        this.element.style.display = 'none'
    }

    showLoader() {
        this.element.style.display = 'initial'
    }

}
