'use strict';
console.log('userInfoApp.js Connected');

function UserInfo(name, date, heardUs){
  this.name = name;
  this.date = date;
  this.heardUs = heardUs;
}

const form = document.getElementById('form');

form.addEventListener('Submit', handleFormSubmit);

function handleFormSubmit (event){
  event.preventDeafult();

  function formatDate(date) {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();

    return month + '/' + day + '/' + year;
  }

  let userName = document.getElementById('name').value;
  let userDate = document.getElementById('date').value;
  let userHeardUs = document.getElementById('heard-us').value;

  let newUser = UserInfo(userName, userDate, userHeardUs);

  // Retrieve the current list of user Info from localStorage, or set it to an empty array if it does not exist.
  let userInfoData = JSON.parse(localStorage.getItem('userInfoData')) || [];

  // Add the new userInfo object to the list of userInfoData.

  userInfoData.push(newUser);

  // Convert the list of newUserData tto a JSON string and store it in the browser's localstorage.
  localStorage.setItem('userInfoData', JSON.stringify(userInfoData));

  // Reset the form inputs after the submission has been processed.
  event.target.reset();

}
