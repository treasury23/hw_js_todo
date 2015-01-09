/**
 * Created by vitya on 19.12.14.
 */

var input = document.querySelector('#input-text'),
    ul = document.querySelector('#list').appendChild(document.createElement('ul')),
    totalAll = document.querySelector('#total-all'),
    totalCheckAll = document.querySelector('#total-select'),
    checkAll = document.querySelector('#check-all'),
    buttonTotalSelect = document.querySelector('#total-select'),
    filterSelect = document.querySelector('#filter');

input.addEventListener('keyup', function(e){

    if (e.target.value != '' && e.keyCode === 13) {

        var li = document.createElement('li'),
            button = document.createElement('button'),
            t = document.createTextNode(e.target.value),
            darr = document.createElement('div');
            darr.innerHTML = '&darr;';
            darr.className = 'darr';
            uarr = document.createElement('div');
            uarr.innerHTML = '&uarr;';
            uarr.className = 'uarr';
            span = document.createElement('span');
            chk = document.createElement("input");
            chk.setAttribute("type", "checkbox");

        button.className = 'btn btn-danger';
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
        li.appendChild(uarr);
        li.appendChild(darr);
        input.value = "";
        showTotalAll(ul);

        uarr.addEventListener('click', function(){
            if (this.parentNode.previousSibling != null) {
                this.parentNode.parentNode.insertBefore(this.parentNode, this.parentNode.previousSibling);
            }
        });

        darr.addEventListener('click', function(){
            this.parentNode.parentNode.insertBefore(this.parentNode.nextSibling, this.parentNode);
        });


        span.addEventListener('dblclick', function(e){
            var updText = document.createElement('input');
            updText.setAttribute("maxlength", 20);
            var span = e.target;
            updText.type = 'text';
            updText.classList.add('input-upd');
            updText.value = span.textContent;
            span.style.display='none';
            li.appendChild(updText);
            updText.focus();
            updText.addEventListener('keyup', function(e){
                if (e.target.value != '' && e.keyCode === 13) {
                    span.textContent = e.target.value;
                    e.target.remove();
                    span.style.display='';
                }
            });
            updText.addEventListener('blur', function (e) {
                if (e.target.value != '') {
                    span.textContent = e.target.value;
                    e.target.remove();
                    span.style.display='';
                }
            });
        });
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