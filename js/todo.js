"use strict";

//text fields
const welcome = document.getElementById('welcome');
const todoList = document.getElementById('infoBox');

//dropdown
const taskDropdown = document.getElementById('tasks');

//API urls
const byUserURL = 'http://localhost:8083/api/todos/byuser/';
const userURL = 'http://localhost:8083/api/users/';

//API endpoints
const endpointId = getQueryParam("id");

//button
const deleteButton = document.getElementById('delete');
const editButton = document.getElementById('edit')

//nav-link
const new_todoLink = document.getElementById('newToDo')

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

  populateDropdown();
  greetUser();
  taskDropdown.addEventListener('change', createTodoList);
  deleteButton.addEventListener('click', deleteToDo)
  editButton.addEventListener('click', () => {
    window.location.href = 'edit.html'
  })
  new_todoLink.addEventListener('click', fetchQuery)

});

//function that allows the fetching of values in the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

//Greeting the user and getting the info by using the username in the URL as an endpoint
function greetUser() {

  const endpointUserName = getQueryParam("username");

  fetch(userURL + endpointUserName)
  .then((response) => response.json())
  .then((data) => {

    const greeting = `Welcome, ${data.username} <br>(${data.name})!`;
    console.log(greeting)
    console.log(`Welcome, ${data.username} <br>(${data.name})!`)
    welcome.innerHTML = greeting;

  });
};
  
//populates my tasks dropdown but it is populated solely on the task relevent to the user
function populateDropdown() {

    fetch(byUserURL + endpointId)
    .then((response) => response.json())
    .then((data) => {

      
      //greeting the user
      const greeting = `Welcome, ${data.username} <br>(${data.name})!`;
      welcome.innerHTML = greeting;

      //using set constructor to get rid of possible duplicate named options
      const categoriesSet = new Set();
      const fragment = document.createDocumentFragment();

      //creating a default select option
      const defaultOption = new Option("Choose task", 0);
      fragment.appendChild(defaultOption);

      data.forEach((task) => {
        if (!categoriesSet.has(task.category)) {
          categoriesSet.add(task.category);

          const option = new Option(task.category, task.category);
          fragment.appendChild(option);
        }
      });

      taskDropdown.appendChild(fragment);
    })

    .catch((error) => console.error(error));
}

//displays the users to do list based on the category chosen
function createTodoList() {
  
  const category = taskDropdown.value;

  fetch(byUserURL + endpointId)
    .then((response) => response.json())
    .then((data) => {
      todoList.innerHTML = " ";

      const filteredToDo = data.filter((todo) => todo.category === category);

      filteredToDo.forEach((tasks) => {
        todoList.innerHTML += `
            <input type="checkbox" id="${tasks.id}" value="${tasks.id}">
            <label for="${tasks.id}">
                ${tasks.description}<br>
               <strong>By:</strong> ${tasks.deadline}<br>
               <strong>Priority:</strong> ${tasks.priority}<br>
            </label>
            <hr>`;
      });
    })

    .catch((error) => console.error(error));
}

//allows user to delete the checked todo values from the API
function deleteToDo() {

    const selectedCheckedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    if (selectedCheckedBoxes.length === 0) {
      alert("Please select a task to delete.");
      return;
    }

    const selectedValues = Array.from(selectedCheckedBoxes).map(checkbox => checkbox.value);

    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(selectedValues),
      redirect: "follow",
    };
    
    console.log(selectedValues)
    
    selectedValues.forEach(id => {

        fetch('http://localhost:8083/api/todos/' + id, requestOptions)
        .then((response) => {
            if (response.ok) {
            // Hide the deleted tasks
            selectedCheckedBoxes.forEach(checkbox => {
                const taskElement = checkbox.closest('label');
                taskElement.style.display = 'none';
            });
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    })

}

//Fetchquery to send URL params to new todo page
function fetchQuery(){

  const endpoint = getQueryParam('username')

  fetch('http://localhost:8083/api/users/' + endpoint)
  .then(response => response.json())
  .then(data => {
      const username = data.username;
      const id = data.id;

  
      const queryString = `?username=${encodeURIComponent(username)}&id=${encodeURIComponent(id)}`;
      const newUrl = 'new_todos.html' + queryString;
  
      // Redirect to the new URL with query parameters
      window.location.href = newUrl;
  })

  .catch((error) => console.error(error));

}