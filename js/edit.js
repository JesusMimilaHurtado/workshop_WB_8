"use strict"

const infoButton = document.getElementById('infoButton');
const updateButton = document.getElementById('updateButton');
const cancel = document.getElementById('cancel');

const displayInfo = document.getElementById('info');
const updatedInfo = document.getElementById('updateInfo');

const userId = document.getElementById('userId');
const title = document.getElementById('title');
const completed = document.getElementById('completed');

document.addEventListener('DOMContentLoaded', () => {
    
    infoButton.addEventListener('click', displayData)
    updateButton.addEventListener('click', getData)

})

function getData(){

    const endpoint = document.getElementById('todoId').value

    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", userId.value);
    urlencoded.append("title", title.value);
    urlencoded.append("completed", completed.value);

    const requestOptions = {
        method: "PUT",
        body: urlencoded,
        redirect: "follow"
    };

    fetch('https://jsonplaceholder.typicode.com/todos/' + endpoint, requestOptions)
    .then(response => response.json())
    .then(data => {
        const info = `
        <strong> User Id: </strong> ${data.userId} <strong> Id: </strong>${data.id} 
        <strong> Title: </strong>${data.title} <strong> Completed: </strong>${data.completed}`
        displayInfo.innerHTML = info
    })
    .catch((error) => console.error(error));
}

function displayData(){

    const endpoint = document.getElementById('todoId').value

    fetch('https://jsonplaceholder.typicode.com/todos/' + endpoint)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let info = `
        <strong> User Id: </strong> ${data.userId} <strong> Id: </strong>${data.id} 
        <strong> Title: </strong>${data.title} <strong> Completed: </strong>${data.completed}`
        displayInfo.innerHTML = info
    })
    .catch((error) => console.error(error));

}