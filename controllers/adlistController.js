import { adView } from '../javascript/view.js'
import DataService from '../services/DataService.js'


export default class AdListController {

    constructor(element, errorMessageController) {
        this.element = element
        this.errorMessageController = errorMessageController
    }

    async renderAds() {
        try {
            const ads = await DataService.getAds()
            for (const ad of ads) {
                const adElement = document.createElement('article')
                adElement.innerHTML = adView(ad)
                this.element.appendChild(adElement)
            }
        } catch (error) {
            console.log("error", error)
            //this.errorMessageController.showError(error)
        }
    }

}
