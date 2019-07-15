let list;
let button;
let myInput;

const initialList = ['opłacić rachunki' , 'ortopeda - wizyta', 'coś'];

function main() {
    searchForElements();
    prepareDOMEvents();
    prepareInitialList();
}

function searchForElements() {
    list = document.getElementById("list");
    button = document.getElementById('addTodo');
    myInput = document.getElementById('myInput');

};

function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo);
    })
}

function prepareDOMEvents() {
    button.addEventListener('click', addNewElementToList);
}

function addNewElementToList() {
    let btnElementLi = document.createElement('div');
    btnElementLi.className = 'btnElementLi';

    let newElement = document.createElement('li');
    let textNode = document.createTextNode(myInput.value);

    let textNodeClass = document.createElement('div');
    textNodeClass.className ='textNodeClass';


    // textNode.document.createElement('div');
    // textNode.className = 'textNodeClass';

    newElement.appendChild(textNodeClass);
    // newElement.appendChild(textNode);

    let newBtnDelete = document.createElement('button');
    newBtnDelete.innerHTML = 'Delete';
    let newBtnEdit = document.createElement('button');
    newBtnEdit.innerHTML = 'Edit';
    let newBtnMark = document.createElement('button');
    newBtnMark.innerHTML = 'Mark as Done';

    btnElementLi.appendChild(newBtnDelete);
    btnElementLi.appendChild(newBtnEdit);
    btnElementLi.appendChild(newBtnMark);

    newElement.appendChild(btnElementLi)

    list.appendChild(newElement);


}


document.addEventListener('DOMContentLoaded', main);