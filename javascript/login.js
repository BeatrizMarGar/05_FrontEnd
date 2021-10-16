
import loginController from '../controllers/loginController';
import msgController from '../controllers/msgController';

window.addEventListener('DomContentLoaded', function(){

    const form = document.querySelector('form')

    new loginController(form)

    const msg = document.querySelector('.messages')

    new msgController(msg)

})