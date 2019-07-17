let list, button, myInput, myModal, popupInput, closePopup;
let index = 0;
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
    closePopup = document.getElementById('closePopup');
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
        markElementAsDone(textNodeClass)
    }

}

function removeListElement(id) {
    list.removeChild(document.querySelector('#' + id));
}

function editListElement(id) {
    let todo = document.querySelector('#' + id + ' .textNodeClass');
    popupInput.value = todo.innerText;
}

function myModalClickManager(eventObject) {
    console.log(eventObject.target);
    if (eventObject.target.id === 'closePopup') {
        closePPopup();
    } else if (eventObject.target.id === 'btn_cancel') {
        closePPopup();
    } else if (eventObject.target.id === 'btn_done') {
        console.log('klik done');
    }

}

function openPopup() {
    myModal.style.display = "block";
}

function closePPopup() {
    myModal.style.display = "none";
}

// function markElementAsDone(/* id */) {
function markElementAsDone() {
    //zaznacz element jako wykonany (podmień klasę CSS)
    newBtnMark.classList.add("done");

}

document.addEventListener('DOMContentLoaded', main);
