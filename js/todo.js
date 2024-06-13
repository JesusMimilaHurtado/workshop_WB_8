"use strict";

//text fields
const welcome = document.getElementById('welcome');
const todoList = document.getElementById('infoBox');

//dropdown
const taskDropdown = document.getElementById('tasks');

//most used url
const byUserURL = 'http://localhost:8083/api/todos/byuser/';

//button
const deleteButton = document.getElementById('delete');

document.addEventListener('DOMContentLoaded', () => {

  getUserData();
  populateDropdown();
  taskDropdown.addEventListener('change', createTodoList);
  deleteButton.addEventListener('click', deleteToDo)

});

//function that allows the fetching of values in the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

//uses the URL value 'username' as the endpoint of the API URL
function greetUser() {
  const endpoint = getQueryParam("username");

  fetch("http://localhost:8083/api/users/" + endpoint)
    .then((response) => response.json())
    .then((data) => {
      const greeting = `Welcome, ${data.username} <br>(${data.name})!`;
      welcome.innerHTML = greeting;
    })
    .catch((error) => console.error(error));
}

//populates my tasks dropdown but it is populated solely on the task relevent to the user
function populateDropdown() {
  const endpoint = getQueryParam("id");

  fetch(byUserURL + endpoint)
    .then((response) => response.json())
    .then((data) => {
      const categoriesSet = new Set();
      const fragment = document.createDocumentFragment();

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
  const endpoint = getQueryParam("id");
  const category = taskDropdown.value;

  fetch(byUserURL + endpoint)
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
function fetchQuery(endpoint){

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