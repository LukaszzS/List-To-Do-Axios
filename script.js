let list, button, myInput, myModal, popupInput;
let index = 0;
const initialList = ['opłacić rachunki', 'ortopeda - wizyta', 'cos - działa ? '];

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
}

function prepareDOMEvents() {
    button.addEventListener('click', toggleElementClick);
    list.addEventListener('click', listClickManager);
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

    let newBtnMark = document.createElement('button');
    newBtnMark.id = 'newBtnMark';
    newBtnMark.innerHTML = 'Mark as Done';

    btnElementLi.appendChild(newBtnDelete);
    btnElementLi.appendChild(newBtnEdit);
    btnElementLi.appendChild(newBtnMark);

}

function listClickManager(eventObject) {
    if (eventObject.target.id === 'newBtnEdit') {
        console.log("kliknołeś edit")
        openPopup();
        editListElement(eventObject.target.parentNode.parentNode.id);
    } else if (eventObject.target.id === 'newBtnDelete') {
        console.log('kliknąłeś Delete')
        removeListElement(eventObject.target.parentNode.parentNode.id);
    } else if (eventObject.target.id === 'newBtnMark') {
        console.log('kliknąłeś Mark')
    } else {
        console.log("klik klik el li")
    }

}

function removeListElement(id) {
    // Usuwanie elementu z listy
    list.removeChild(document.querySelector('#' + id));
}

function editListElement(id) {
    // Pobranie informacji na temat zadania
    // Umieść dane w popupie
    let todo = document.querySelector('#' + id + ' .textNodeClass');
    popupInput.value = todo.innerText;
}

function openPopup() {
    // Otwórz popup
    myModal.style.display = "block";
}

//pomoc
function closePopup() {
    // Zamknij popup
}

document.addEventListener('DOMContentLoaded', main);
