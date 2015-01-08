/**
 * Created by vitya on 19.12.14.
 */

var input = document.querySelector('#input-text'),
    ul = document.querySelector('#list').appendChild(document.createElement('ul')),
    totalAll = document.querySelector('#total-all'),
    totalCheckAll = document.querySelector('#total-select'),
    checkAll = document.querySelector('#check-all');
    buttonTotalSelect = document.querySelector('#total-select');
    filterSelect = document.querySelector('#filter')

input.addEventListener('keyup', function(e){

    if (e.target.value != '' && e.keyCode === 13) {

        var li = document.createElement('li'),
            button = document.createElement('button'),
            span = document.createElement('span');
            span.setAttribute("contenteditable", "true");
            t = document.createTextNode(e.target.value),
            chk = document.createElement("input");
            chk.setAttribute("type", "checkbox");

        button.className='btn btn-danger';
        button.innerHTML = 'Remove';
        button.onclick = function(){this.parentNode.remove();showTotalAll(ul);showTotalCheckAll(ul);};
        chk.onclick = function(e){
            if (e.target.checked == true) {
                console.log(this.parentNode);
                this.parentNode.className = 'text-li';
                showTotalCheckAll(ul);
            } else {
                this.parentNode.className = "";
                showTotalCheckAll(ul);
            }
        };

        li.appendChild(chk);

        li.appendChild(span).appendChild(t);

        ul.appendChild(li).appendChild(button);
        input.value = "";
        showTotalAll(ul);
    }
});

checkAll.addEventListener('change', function(e){
    if (e.target.checked) {
        [].forEach.call(ul.querySelectorAll('li'), function(el) {
            el.className = 'text-li';
            el.children[0].checked = true;
            showTotalCheckAll(ul);
            buttonTotalSelect.removeAttribute('disabled');
        });
    } else {
        [].forEach.call(ul.querySelectorAll('li'), function(el) {
            el.className = '';
            el.children[0].checked = false;
            showTotalCheckAll(ul);
            buttonTotalSelect.setAttribute('disabled', 'true');
        });
    }
});

function showTotalAll(ul)
{
    var allLi = ul.querySelectorAll('li');
    totalAll.textContent = ' All item: ' + allLi.length;
}

function showTotalCheckAll(ul)
{
    var allSelectLi = ul.querySelectorAll('.text-li');
    if (allSelectLi.length>0) {
        buttonTotalSelect.removeAttribute('disabled');
    } else {
        buttonTotalSelect.setAttribute('disabled', 'true');
    }
    totalCheckAll.textContent = 'Clear selected('+allSelectLi.length+')';
}

totalCheckAll.addEventListener('click', function(){
    [].forEach.call(ul.querySelectorAll('.text-li'), function(el){
        el.remove();
        checkAll.checked = false;
    });
    showTotalAll(ul);
    showTotalCheckAll(ul);
});

filterSelect.addEventListener('change', function(e){

    [].forEach.call(ul.querySelectorAll('li'), function(el){

        if (e.target.value == 'all') {
            el.style.display='';
        } else if (e.target.value == 'perfomed') {
            if (el.classList.contains('text-li')){
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        } else if (e.target.value == 'notperfomed'){
            if (el.classList.contains('text-li')){
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        }
    });
});