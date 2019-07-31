let list, buttonAdd, myInput, myModal, popupInput, closeBtn;
let index = 0;
let currentTodo = 0;

const BASE_URL = 'http://195.181.210.249:3000/todo/';

function main() {
    searchForElements();
    prepareDOMEvents();
    getTodos();
}

function searchForElements() {
    list = document.getElementById('list');
    buttonAdd = document.getElementById('addTodo');
    myInput = document.getElementById('myInput');
    myModal = document.getElementById('myModal');
    popupInput = document.getElementById('popupInput');
    closeBtn = document.getElementById('closeBtn');
}

function prepareDOMEvents() {
    buttonAdd.addEventListener('click', addElementClick);
    list.addEventListener('click', listClickManager);
    myModal.addEventListener('click', myModalClickManager);
    myInput.addEventListener('keyup', addElementEnter);
}

async function getTodos() {
    list.innerHTML = '';
    let res = await axios.get(BASE_URL);
    res.data.forEach(el => {
        addNewElementToList(el.title, el.id, el.extra);
    });
}

async function addElementClick() {
    if (myInput.value.trim()) {
        await sendTodo(myInput.value);
    }
}

async function sendTodo(value) {
    let data = await axios.post(BASE_URL, {
        title: value,
        author: 'LukaszS'
    });
    if (data.data.status === 0) {
        await getTodos();
    }
}

async function addElementEnter(eventObject) {
    if (eventObject.keyCode === 13) {
        let data = await axios.post(BASE_URL, {
            title: myInput.value,
            author: 'LukaszS'
        });
        addNewElementToList(myInput.value);
    }
}

function addNewElementToList(todo, id, extra) {
    let btnElementLi = document.createElement('div');
    btnElementLi.className = 'btnElementLi';
    let newElement = document.createElement('li');
    newElement.id = id;
    newElement.setAttribute('data-id', id);

    if (extra) {
        newElement.classList.add("done");
    }

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
    newBtnMark.style.overflow = 'visible';
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

async function removeListElement(id) {
    await axios.delete(BASE_URL + id);
    document.getElementById(id).remove();
}

function editListElement(id) {
    let todo = document.querySelector('li[data-id="' + id + '"] .textNodeClass');
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

async function acceptChangeHandler() {
    let todo = document.querySelector('li[data-id="' + currentTodo + '"] .textNodeClass');
    todo.innerText = popupInput.value;
    let data = await axios.put(BASE_URL + currentTodo, {
        title: popupInput.value,
        author: 'LukaszS',
    });
    if (data.data.status === 0) {
        await getTodos();
        closePopup();
    }
}

function openPopup() {
    myModal.style.display = "block";
}

function closePopup() {
    myModal.style.display = "none";
    popupInput.value = '';
}

async function markElementAsDone(id) {
    let todo = document.getElementById(id);
    let data = await axios.put(BASE_URL + id, {
        extra: todo.classList.contains("done") ? null : "done",
        author: "LukaszS"
    });
    todo.classList.toggle("done");
    if (data.data.status === 0) {
        await getTodos();
    }
}

document.addEventListener('DOMContentLoaded', main);