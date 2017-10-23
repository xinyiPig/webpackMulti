/**
 * Created by z on 2017/10/23.
 */
var style =require('../css/greeter.css')
module.exports = function() {
     var greet = document.createElement('div');
    // greet.textContent = "Hi there and greetings!";
     greet.innerHTML=`<div class="root">Hi there and greetings</div>`
    return greet;
};
