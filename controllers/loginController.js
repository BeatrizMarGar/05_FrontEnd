import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"

export default class loginController{

    constructor(element){
        this.element = element
        this.attachEventListeners()
    }

    //hacemos login
    attachEventListeners(){
        this.element.addEventListener('submit', async event => {
            
            event.preventDefault()
            
            if (this.element.checkValidity()){ //check validity comprueba que esté todo completo
                const data = new FormData(this.element)
                const username = data.get('username').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                const password = data.get('password').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                const url = new URLSearchParams(window.location.search)
                const next = url.get('next') || '/' //especificamos la url de inicio donde a continuación redirigimos
                //si login == ok, redirigimos
                try {
                    const result = await DataService.login(username, password);
                    location.href = next;
                //si login falla, mensaje de error
                } catch (error) {
                    PubSub.publish(PubSub.events.AD_ERROR, error)
                }
            } else {
                PubSub.publish(PubSub.events.AD_ERROR, 'Se deben rellenar todos los campos')
            }
        })
    }
}