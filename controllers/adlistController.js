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
            for (const tweet of tweets) {
                const tweetElement = document.createElement('article')
                tweetElement.innerHTML = adView(ad)
                this.element.appendChild(tweetElement)
            }
        } catch (error) {
            console.log("error")
            //this.errorMessageController.showError(error)
        }
    }

}
