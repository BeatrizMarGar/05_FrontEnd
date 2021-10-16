
import signupControler from '../controllers/signupControler';
import msgController from '../controllers/msgController';

window.addEventListener('DomContentLoaded', function(){

    const form = document.querySelector('form')

    new signupControler(form)

    const msg = document.querySelector('.messages')

    new msgController(msg)

})