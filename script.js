let list, button, myInput, myModal;

const initialList = ['opłacić rachunki', 'ortopeda - wizyta', 'cos - działa ? '];

function main() {
    searchForElements();
    prepareDOMEvents();
    prepareInitialList();
    openPopup();
    // closePopup();
}

function searchForElements() {
    list = document.getElementById('list');
    button = document.getElementById('addTodo');
    myInput = document.getElementById('myInput');
    myModal = document.getElementById('myModal');

}

function prepareDOMEvents() {
    button.addEventListener('click', addNewElementToList);
    list.addEventListener('click', listClickManager);
}


function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo);
    });
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

    // newBtnMark.addEventListener('click',() => (newBtnMark.parentElement.parentElement.className = 'done')
    // );
    newElement.appendChild(btnElementLi);
    list.appendChild(newElement);
}

function listClickManager(eventObject) {
    if (eventObject.target.id === 'newBtnEdit') {
        console.log("kliknołeś edit")
    } else if (eventObject.target.id === 'newBtnDelete') {
        console.log('kliknąłeś Delete')
        // eventObject.target.remove('newElement');
    } else if (eventObject.target.id === 'newBtnMark') {
        console.log('kliknąłeś Mark')
    } else {
        console.log("klik klik el li")
    }

}
//pomoc
function removeListElement(/* id */) {
    // Usuwanie elementu z listy
}

//pomoc
function editListElement(/* id */) {
    // Pobranie informacji na temat zadania
    // Umieść dane w popupie
}




//pomoc
function openPopup() {
    // Otwórz popup
    // if(eventObject.target.id === 'newBtnDelete'){}
        myModal.style.display = "none";

}
//pomoc
function closePopup() {
    // Zamknij popup
}

document.addEventListener('DOMContentLoaded', main);
