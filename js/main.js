/**
 * Created by vitya on 19.12.14.
 */

var input = document.querySelector('#input-text'),
    ul = document.querySelector('#list').appendChild(document.createElement('ul'));

input.addEventListener('keyup', function(e){

    if (e.target.value != '' && e.keyCode === 13) {

        var li = document.createElement('li'),
            button = document.createElement('button');

        button.className='button';
        button.innerHTML = 'Remove'

        li.innerHTML = '<input type="checkbox">' + e.target.value;

        ul.appendChild(li).appendChild(button);
        input.value = "";
    }
})
