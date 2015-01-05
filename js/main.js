/**
 * Created by vitya on 19.12.14.
 */

var input = document.querySelector('#input-text'),
    ul = document.querySelector('#list').appendChild(document.createElement('ul')),
    totalAll = document.querySelector('#total-all'),
    checkAll = document.querySelector('#check-all');

input.addEventListener('keyup', function(e){

    if (e.target.value != '' && e.keyCode === 13) {

        var li = document.createElement('li'),
            button = document.createElement('button'),
            t = document.createTextNode(e.target.value);
            chk = document.createElement("input");
            chk.setAttribute("type", "checkbox");

        button.className='btn btn-danger';
        button.innerHTML = 'Remove';
        button.onclick = function(){this.parentNode.remove();showTotalAll(ul);};
        chk.onclick = function(e){
            if (e.target.checked == true) {
                console.log(this.parentNode);
                this.parentNode.className = 'text-li';
            } else {
                this.parentNode.className = "";
            }
        };

        li.appendChild(chk);
        li.appendChild(t);

        ul.appendChild(li).appendChild(button);
        input.value = "";
        showTotalAll(ul);
    }
});

checkAll.addEventListener('change', function(e){
    if (e.target.checked) {
        [].forEach.call(ul.querySelectorAll('li'), function(el) {
           el.className = 'text-li';
        });
    } else {
        [].forEach.call(ul.querySelectorAll('li'), function(el) {
            el.className = '';
        });
    };
});

function showTotalAll(ul)
{
    var allLi = ul.querySelectorAll('li');
    //var selectedLi = ul.querySelectorAll('li.selected-li');

    totalAll.innerText = ' All item: ' + allLi.length;
}