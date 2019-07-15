let list;
let button;
let myInput;
let markAsDone;

const initialList = ['opłacić rachunki', 'ortopeda - wizyta', 'coś'];

function main() {
    searchForElements();
    prepareDOMEvents();
    prepareInitialList();
}

function searchForElements() {
    list = document.getElementById('list');
    button = document.getElementById('addTodo');
    myInput = document.getElementById('myInput');

}

function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo);
    });
}

function prepareDOMEvents() {
    button.addEventListener('click', addNewElementToList);
}

function addNewElementToList(todo) {
    let btnElementLi = document.createElement('div');
    btnElementLi.className = 'btnElementLi';

    let newElement = document.createElement('li');
    let textNode = document.createTextNode(myInput.value || todo);

    let textNodeClass = document.createElement('div');
    textNodeClass.className = 'textNodeClass';
    textNodeClass.appendChild(textNode);

    newElement.appendChild(textNodeClass);

    let newBtnDelete = document.createElement('button');
    newBtnDelete.innerHTML = 'Delete';
    let newBtnEdit = document.createElement('button');
    newBtnEdit.innerHTML = 'Edit';
    let newBtnMark = document.createElement('button');
    newBtnMark.innerHTML = 'Mark as Done';

    btnElementLi.appendChild(newBtnDelete);
    btnElementLi.appendChild(newBtnEdit);
    btnElementLi.appendChild(newBtnMark);

    // newBtnMark.addEventListener('clisk', '#list') => document.getElementById(#list-inactive).className = 'done';
    //


    // markAsDone.addEventListener('click', (elementId) => document.getElementById(elementId).className = 'done')

    // markAsDone.addEventListener('click', (#list)=> document.getElementById(#list-inactive).className = 'done');



    newElement.appendChild(btnElementLi);

    list.appendChild(newElement);
}

document.addEventListener('DOMContentLoaded', main);
