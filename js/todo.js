"use strict"

const welcome = document.getElementById('welcome');
const todoList = document.getElementById('infoBox')

document.addEventListener('DOMContentLoaded', () => {

    getUserData()

})

function getQueryParam(param){

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

function getUserData(){
    
    const endpoint = getQueryParam('username');

    fetch('http://localhost:8083/api/users/' + endpoint)
    .then(response => response.json())
    .then(data => { 
            console.log(data)
            welcome.innerHTML = `Welcome, ${data.username} (${data.name})!`
        
    })
    .catch((error) => console.error(error));
};

function getTodoItems(){
    
    const endpoint = getQueryParam('username');

    fetch('http://localhost:8083/api/users/' + endpoint)
    .then(response => response.json())
    .then(data => { 
            console.log(data)
            welcome.innerHTML = `Welcome, ${data.username} (${data.name})!`
        
    })
    .catch((error) => console.error(error));
};


// function deleteCourse(){

//     const endpoint = getQueryParam('id');
//     const urlencoded = new URLSearchParams();

//     fetch('http://localhost:8090/api/courses/' + endpoint)
//     .then(response => response.json())
//     .then(data => {

//         urlencoded.append("id", data.id)
//         urlencoded.append("dept", data.dept);
//         urlencoded.append("courseNum", data.courseNum);
//         urlencoded.append("courseName", data.courseName);
//         urlencoded.append("instructor", data.instructor);
//         urlencoded.append("startDate", data.startDate);
//         urlencoded.append("numDays", data.numDays);})

//     .catch((error) => console.error(error));

//     const requestOptions = {
//         method: "DELETE",
//         body: urlencoded,
//         redirect: "follow"
//     };

//     fetch('http://localhost:8090/api/courses/' + endpoint, requestOptions)
//     .then(response => response.json())
//     .then(data => data)
//     .catch((error) => console.error(error));
   
// };