let list, buttonAdd, myInput, myModal, popupInput, closeBtn;

let elTodoId;

// const BASE_URL = 'http://195.181.210.249:3000/todo/';

let index = 0;
let currentTodo = 0;
const initialList = ['rachunki', 'ortopeda', 'siłownia '];

function main() {
    searchForElements();
    prepareDOMEvents();
    prepareInitialList();
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function getTodos() {
    list.innerHTML = '';
    let res = await axios.get('http://195.181.210.249:3000/todo/');

    res.data.forEach(el => {
        addNewElementToList(el.title, el.id, el.extra);
    });


}

function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo);
    });
}

async function addElementClick() {
    if (myInput.value.trim()) {
        await sendTodo(myInput.value);
    }
}
//++++++++++++++++++++++++++++++++POST
async function sendTodo(value) {
    let data = await axios.post('http://195.181.210.249:3000/todo/', {
        title: value,
        author: 'Lukasz'
    });
    if (data.data.status === 0){
        await getTodos();
    }
}
async function addElementEnter(eventObject) {
    let data = await axios.post('http://195.181.210.249:3000/todo/', {
        title: value,
        author: 'Lukasz'
    });
    if (eventObject.keyCode === 13) {
        addNewElementToList(myInput.value);
    }
}

// function addElementEnter(eventObject) {
//     if (eventObject.keyCode === 13) {
//         addNewElementToList(myInput.value);
//     }
// }


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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


// +++++++++++++++++++++++++DELETE+++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function removeListElement(id) {
//     list.removeChild(document.querySelector('#' + id));
// }

//usuwanie el

async function removeListElement(id) {
    await axios.delete('http://195.181.210.249:3000/todo/' + id)
        .then(()=>{
            list.innerHTML = '';
            prepareInitialList()
        });
}
//
// async function deleteTodo(elementId){
//     await axios.delete('http://195.181.210.249:3000/todo/' + elementId).remove();
//     addNewElementToList(list);
// }



// ++++++++++++++++++++++EDIT+++++++++++++++++++++++++++++++++++++++++++++++

// ------------------- PUT -------------------------------

// function editListElement(id) {
//     let todo = document.querySelector('#' + id + ' .textNodeClass');
//     popupInput.value = todo.innerText;
//     currentTodo = id;
// }


// async function editListElement() {
//     await axios.put('http://195.181.210.249:3000/todo/' + id, {
//         description: status
//     })
//         .then(function () {
//             list.innerHTML = '';
//             getTodos()
//         })
// }

async function editListElement(value) {
    let data = await axios.put('http://195.181.210.249:3000/todo/',{
        title: value,
        author: 'Lukasz'
    });
    if (data.data.status === 0){
        await getTodos();
    }
}






// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ------------------------ POST marks as done----------------------------------------
// function markElementAsDone(id) {
//     let newBtnMark = document.getElementById(id);
//     newBtnMark.classList.toggle("done");
//
// }

async function markElementAsDone(id) {
    let newBtnMark = document.getElementById(id);
    newBtnMark.classList.toggle("done");
    await axios.post('http://195.181.210.249:3000/todo/' + id, {
        author: 'Lukasz'
    });
}


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





document.addEventListener('DOMContentLoaded', main);

