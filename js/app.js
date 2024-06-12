"use strict"

//input fields
const userName = document.getElementById('user');
const password = document.getElementById('password');
const confirmedPassword = document.getElementById('passwordConfirmation');

//button
const submitButton = document.getElementById('submit');

document.addEventListener('DOMContentLoaded', () => {

    submitButton.addEventListener('click', getData)

})

function getData(){

    const user = userName.value
    const password = password.value

    if(user || password !== " "){

        fetch('http://localhost:8083/api/users')
        .then(request => request.json())
        .then(data => {

        let person = data.find(_user => _user.userName === user)
        let key = data.find(_user => _user.userName === user)

        if(person == null){
            alert('Unable to find user')
        }
        else if(key == null){
            alert('Incorrect password')
        }
        })
        
    }   

    else{
        alert('Please fill in user name and password')
    }
}


function fetchQuery(){

    const endpoint = userName.value

    fetch('http://localhost:8083/api/users/' + endpoint)
    .then(response => response.json())
    .then(data => {
        const id = data.id;
    
        const queryString = `?id=${encodeURIComponent(id)}`;
        const newUrl = 'todos.html' + queryString;
    
        // Redirect to the new URL with query parameters
        window.location.href = newUrl;
    })

    .catch((error) => console.error(error));

}