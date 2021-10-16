import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"

export default class signupControler {
    constructor(element){
        this.element = element;
        this.attachEventListeners()
    }
    attachEventListeners(){
        this.element.addEventListener('submit', async function(event){
            event.preventDefault()
            if (this.checkValidity()){
                try{
                    const data = new FormData(this)
                    const username = data.get('username')
                    const password = data.get('password')
                    const result = await DataService.registerUser(username,password)
                    PubSub.publish(PubSub.events.AD_SUCCESS, 'Usuario registrado')
                } catch (error){
                    PubSub.publish(PubSub.events.AD_ERROR, error)
                }
            } else {
                let errorMessage = ""
                for (const element of this.elements){
                    if (element.validity.valid === false){
                        errorMessage += `Error en el campo ${element.name}: ${element.validationMessage}. `
                    }
                }
                PubSub.publish(PubSub.events.AD_ERROR, errorMessage)
            }
        })
    }
    checkPasswordEqual(){
        const inputsPassword = this.element.querySelectorAll('input[type="password"]')
        let passwords = []
        for (const input of inputsPassword) {
            if (passwords.includes(input.value) === false) {
                passwords.push(input.value)
            }
        }
        if (passwords.length == 1) {
            for (const input of inputsPassword) {
                input.setCustomValidity('')
            }
        } else { //si no son iguales
            for (const input of inputsPassword) {
                input.setCustomValidity('Las password no son iguales')
            }
        }

    }


}
