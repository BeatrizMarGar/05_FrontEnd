
import loginController from '../controllers/loginController';
//TODO : AÑADIR EL MENSAJE Y LA VISTA

window.addEventListener('DomContentLoaded', function(){
    const form = document.querySelector('form');
    new loginController(form)
})