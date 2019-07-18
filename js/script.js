let list, button, myInput, myModal, popupInput, closeBtn;
let index = 0;
let currentTodo = 0;
const initialList = ['opłacić rachunki', 'ortopeda - wizyta', 'karnet - siłownia '];

function main() {
    searchForElements();
    prepareDOMEvents();
    prepareInitialList();
}

function searchForElements() {
    list = document.getElementById('list');
    button = document.getElementById('addTodo');
    myInput = document.getElementById('myInput');
    myModal = document.getElementById('myModal');
    popupInput = document.getElementById('popupInput');
    closeBtn = document.getElementById('closeBtn');
}

function prepareDOMEvents() {
    button.addEventListener('click', toggleElementClick);
    list.addEventListener('click', listClickManager);
    myModal.addEventListener('click', myModalClickManager);
}

function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo);
    });
}

function toggleElementClick() {
    if (myInput.value.trim()) {
        addNewElementToList(myInput.value);
    }
}

function addNewElementToList(todo) {
    let btnElementLi = document.createElement('div');
    btnElementLi.className = 'btnElementLi';

    let newElement = document.createElement('li');
    newElement.id = 'todo' + ++index;

    let textNode = document.createTextNode(todo);
    let textNodeClass = document.createElement('div');
    textNodeClass.className = 'textNodeClass';
    textNodeClass.appendChild(textNode);

    newElement.appendChild(textNodeClass);
    createButtons(btnElementLi);
    newElement.appendChild(btnElementLi);
    list.appendChild(newElement);
}

function createButtons(btnElementLi) {
    let newBtnDelete = document.createElement('button');
    newBtnDelete.id = 'newBtnDelete';
    newBtnDelete.innerHTML = 'Delete';

    let newBtnEdit = document.createElement('button');
    newBtnEdit.id = 'newBtnEdit';
    newBtnEdit.innerHTML = 'Edit';
    // <i class="fas fa-check-circle"></i>';
    let newBtnMark = document.createElement('button');
    newBtnMark.id = 'newBtnMark';
    newBtnMark.innerHTML = 'Mark as Done';

    btnElementLi.appendChild(newBtnDelete);
    btnElementLi.appendChild(newBtnEdit);
    btnElementLi.appendChild(newBtnMark);
}

function listClickManager(eventObject) {
    if (eventObject.target.id === 'newBtnEdit') {
        openPopup();
        editListElement(eventObject.target.parentNode.parentNode.id);
    } else if (eventObject.target.id === 'newBtnDelete') {
        removeListElement(eventObject.target.parentNode.parentNode.id);
    } else if (eventObject.target.id === 'newBtnMark') {
        markElementAsDone(eventObject.target.parentNode.parentNode.id)
    }
}

function removeListElement(id) {
    list.removeChild(document.querySelector('#' + id));
}

function editListElement(id) {
    let todo = document.querySelector('#' + id + ' .textNodeClass');
    popupInput.value = todo.innerText;
    currentTodo = id;
}

function myModalClickManager(eventObject) {
    console.log(eventObject.target);
    if (eventObject.target.id === 'closeBtn') {
        closePopup();
    } else if (eventObject.target.id === 'btn_cancel') {
        closePopup();
    } else if (eventObject.target.id === 'btn_done') {
        acceptChangeHandler();
        console.log('klik done');
    }
}

function acceptChangeHandler() {
    let todo = document.querySelector('#' + currentTodo + ' .textNodeClass');
    todo.innerText = popupInput.value;
    closePopup();
}

function openPopup() {
    myModal.style.display = "block";
}

function closePopup() {
    myModal.style.display = "none";
    popupInput.value = '';
}

function markElementAsDone(id) {
    let newBtnMark = document.getElementById(id);
    newBtnMark.classList.toggle("done");

}

document.addEventListener('DOMContentLoaded', main);

