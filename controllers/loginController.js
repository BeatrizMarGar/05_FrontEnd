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
                const user = data.get('username')
                const password = data.get('password')
                const url = new URLSearchParams(window.location.search)
                const next = url.get('next') || '/' //especificamos la url de inicio donde a continuación redirigimos
                //si login == ok, redirigimos
                try {
                    const result = await DataService.login(user, password);
                    location.href = next;
                //si login falla, mensaje de error
                } catch (error) {
                    PubSub.publish(PubSub.events.ERROR, error)
                }
            } else {
                PubSub.publish(PubSub.events.ERROR, 'Se deben rellenar todos los campos')
            }
        })
    }
}