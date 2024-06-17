"use strict";

//button
const editButton = document.getElementById("editToDo");

//text box
const displayInfo = document.getElementById("info");

//input fields
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");

//dropdown
const todoSelect = document.getElementById("todo");
const deadlineSelect = document.getElementById("deadline");

//nav links
const todoLink = document.getElementById("toDo");
const newTodoLink = document.getElementById("new");

//API links & Endpoints
const byUserURL = "http://localhost:8083/api/todos/byuser/";
const todoURL = "http://localhost:8083/api/todos/";
const endpointId = getQueryParam("id");

document.addEventListener("DOMContentLoaded", () => {
  
    populateDropdown();

    todoSelect.addEventListener("change", displayData);
    editButton.addEventListener("click", updateData);
    todoLink.addEventListener("click", fetchQuery);
    newTodoLink.addEventListener("click", fetchQueryNewTodo);
});

//function that allows the fetching of values in the URL
function getQueryParam(param) {

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

//populate dropdown base on the tasks on the users todo list
function populateDropdown() {

  fetch(byUserURL + endpointId)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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

      todoSelect.appendChild(fragment);
    })

    .catch((error) => console.error(error));
}

//displays the users to do list based on the category chosen
function displayData() {

  const category = todoSelect.value;

  fetch(byUserURL + endpointId)
    .then((response) => response.json())
    .then((data) => {
      displayInfo.innerHTML = " ";

      const filteredToDo = data.filter((todo) => todo.category === category);

      filteredToDo.forEach((tasks) => {
        displayInfo.innerHTML += `
              <input type="radio" name="todo" id="${tasks.id}" value="${tasks.id}">
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

//will edit the data on the api
function updateData() {

  const selectedRadio = document.querySelector('input[type="radio"]:checked');

  if (!selectedRadio) {
    console.error("No task selected.");
    return;
  }

  const endpoint = selectedRadio.value;
  console.log(selectedRadio);

  const urlEncoded = new URLSearchParams();

  if (endpointId) {
    urlEncoded.append("userid", endpointId);
  }
  if (categoryInput.value) {
    urlEncoded.append("category", categoryInput.value + " Task");
  }
  if (descriptionInput.value) {
    urlEncoded.append("description", descriptionInput.value);
  }
  if (deadlineSelect.value) {
    urlEncoded.append("deadline", deadlineSelect.value);
  }
  if (priorityInput.value) {
    urlEncoded.append("priority", priorityInput.value);
  } 

  const requestOptions = {
    method: "PUT",
    body: urlEncoded,
    redirect: "follow",
  };

  fetch(todoURL + endpoint, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const info = `
            <input type="radio" name="todo" id="${data.id}" value="${data.id}">
              <label for="${data.id}">
                  ${data.description}<br>
                 <strong>By:</strong> ${data.deadline}<br>
                 <strong>Priority:</strong> ${data.priority}<br>
              </label>
              <hr>`;

      selectedRadio.innerHTML = info;
    })
    .catch((error) => console.error(error));
}

//Fetchquery to send URL params to new todo page
function fetchQuery() {

  const endpoint = getQueryParam("username");

  fetch("http://localhost:8083/api/users/" + endpoint)
    .then((response) => response.json())
    .then((data) => {
      const username = data.username;
      const id = data.id;

      const queryString = `?username=${encodeURIComponent(
        username
      )}&id=${encodeURIComponent(id)}`;
      const newUrl = "todos.html" + queryString;

      // Redirect to the new URL with query parameters
      window.location.href = newUrl;
    })

    .catch((error) => console.error(error));
}

//Fetchquery to send URL params to new todo page
function fetchQueryNewTodo() {
  const endpoint = getQueryParam("username");

  fetch("http://localhost:8083/api/users/" + endpoint)
    .then((response) => response.json())
    .then((data) => {
      const username = data.username;
      const id = data.id;

      const queryString = `?username=${encodeURIComponent(
        username
      )}&id=${encodeURIComponent(id)}`;
      const newUrl = "new_todos.html" + queryString;

      // Redirect to the new URL with query parameters
      window.location.href = newUrl;
    })

    .catch((error) => console.error(error));
}
