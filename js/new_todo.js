"use strict"

//input fields
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const deadlineInput = document.getElementById('deadline');
const priorityInput = document.getElementById('priority');

//button
const addToDoButton = document.getElementById('addToDo')

document.addEventListener('DOMContentLoaded', () => {

    addToDoButton.addEventListener('click', addNewToDo)

})

function getQueryParam(param) {

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function getUserId(){

    const endpoint = getQueryParam('')

}