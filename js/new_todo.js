"use strict"

//input fields
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const deadlineInput = document.getElementById('deadline');
const priorityInput = document.getElementById('priority');

//button
const addToDoButton = document.getElementById('addToDo');

//nav-link
const todoLink = document.getElementById('toDo');
const editLink = document.getElementById('edit')

document.addEventListener('DOMContentLoaded', () => {

    addToDoButton.addEventListener('click', addNewTodo)
    todoLink.addEventListener('click', fetchQuery)
    editLink.addEventListener('click', fetchQueryEdit)

})

//get values from URL params
function getQueryParam(param) {

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//get user info from the URL params
function addNewTodo(){

    const userId = getQueryParam('id')

    const urlencoded = new URLSearchParams();

    urlencoded.append("userid", userId);
    urlencoded.append("category", categoryInput.value + ' Task');
    urlencoded.append("description", descriptionInput.value);
    urlencoded.append("deadline", deadlineInput.value);
    urlencoded.append("priority", priorityInput.value);


    const requestOptions = {
        method: "POST",
        body: urlencoded,
        redirect: "follow"
    };

    fetch('http://localhost:8083/api/todos', requestOptions)
    .then(response => response.json())
    .then(data => { `
            userid: ${data.userid}
            category: ${data.category}
            description: ${data.description}
            deadline: ${data.deadline}
            priority: ${data.priority}`
    })
    .catch((error) => console.error(error));

}

//Fetchquery to send URL params back to the todo page
function fetchQuery(){

    const endpoint = getQueryParam('username')
  
    fetch('http://localhost:8083/api/users/' + endpoint)
    .then(response => response.json())
    .then(data => {
        const username = data.username;
        const id = data.id;
  
    
        const queryString = `?username=${encodeURIComponent(username)}&id=${encodeURIComponent(id)}`;
        const newUrl = 'todos.html' + queryString;
    
        // Redirect to the new URL with query parameters
        window.location.href = newUrl;
    })
  
    .catch((error) => console.error(error));
  
}

//Fetchquery to send URL params to new todo page
function fetchQueryEdit(){

    const endpoint = getQueryParam('username')
  
    fetch('http://localhost:8083/api/users/' + endpoint)
    .then(response => response.json())
    .then(data => {
        const username = data.username;
        const id = data.id;
  
        const queryString = `?username=${encodeURIComponent(username)}&id=${encodeURIComponent(id)}`;
        const newUrl = 'edit.html' + queryString;
    
        // Redirect to the new URL with query parameters
        window.location.href = newUrl;
    })
  
    .catch((error) => console.error(error));
  
  }