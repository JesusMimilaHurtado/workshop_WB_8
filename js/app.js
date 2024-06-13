"use strict"

//input fields
const userName = document.getElementById('user');
const passwordInput = document.getElementById('password');
const confirmedPassword = document.getElementById('passwordConfirmation');

//button
const submitButton = document.getElementById('submit');

document.addEventListener('DOMContentLoaded', () => {

    submitButton.addEventListener('click', getData)


    document.addEventListener('keyup', event => {
        
        if(event.key === 'Enter'){
            getData()
        }

    })

})

function getData(){

    const user = userName.value
    const password = passwordInput.value

    if(user || password !== " "){
        
        fetch('http://localhost:8083/api/users/' + user)
        .then(request => request.json())
        .then(data => {

        if(data.username !== user){
            alert('Unable to find user')
        }
        else if(password !== data.password ){
            alert('Incorrect password')
        }
        else if(password === confirmedPassword.value){
            fetchQuery(user)
        }
        else{
            alert('passwords don\'t match')
        }

        })

    }   
}


function fetchQuery(endpoint){

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