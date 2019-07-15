var button;
var list;
var myInput;

function main() {
    searcForElements();
    prepareDOMEvents();
    // removeNewElementList();
}

function searcForElements() {
    list = document.getElementById("list");
    button = document.getElementById('addTodo');
    myInput = document.getElementById('myInput');  /* bez volue - wyświetla komunikat [object HTMLInputElement] a z volue - nic nie wyświetla tylko btn*/

};

function prepareDOMEvents() {
    button.addEventListener('click', addNewElementToList);



}

function addNewElementToList() {
    var newElement = document.createElement('li');
    var textNode = document.createTextNode(myInput);


    // newElement.innerText = 'nowy element';
    newElement.appendChild(textNode);

    var newBtnDelete = document.createElement('button');
    newBtnDelete.innerHTML = '<div>Delete</div>';

    var newBtnEdit = document.createElement('button');
    newBtnEdit.innerHTML = '<div>Edit</div>';

    var newBtnMark = document.createElement('button');
    newBtnMark.innerHTML = '<div>Mark as Done</div>';


    newElement.appendChild(newBtnDelete);
    newElement.appendChild(newBtnEdit);
    newElement.appendChild(newBtnMark);

    // newElement.style.display.flex.justifyContent = 'center';

    list.appendChild(newElement);


}
// function removeNewElementList() {
//     newBtnDelete.addEventListener('click', removeNewElementList);
//
// }


document.addEventListener('DOMContentLoaded', main);