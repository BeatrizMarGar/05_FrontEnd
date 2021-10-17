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
                    const username = data.get('username').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                    console.log(username)
                    const password = data.get('password').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                    const result = await DataService.registerUser(username, password)
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
        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('input', () => {
               this.checkPasswordEqual()
            })
        })

        // controlamos cambios en cada uno de los inputs y validamos el formulario para activar o desactivar el botón
        this.element.querySelectorAll('input').forEach(inputElement => {
            
            // para cada input del formulario
            console.log("ahora")
            inputElement.addEventListener('input', () => {
                // cada vez que el usuario escriba en cada input
                if (this.element.checkValidity()) {
                    // si el formulario esta ok, habilitamos boton
                    this.element.querySelector('button').removeAttribute('disabled')
                } else {
                    // si no esta ok, deshabilitamos boton
                    this.element.querySelector('button').setAttribute('disabled', true)
                }
            })
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
