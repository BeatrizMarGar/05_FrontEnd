
import signupControler from '../controllers/signupController.js';
import msgController from '../controllers/msgController.js';

window.addEventListener('DOMContentLoaded', function(){

    const form = document.querySelector('form')
    console.log("signup")
    new signupControler(form)

    const msg = document.querySelector('.error-message')

    new msgController(msg)

})