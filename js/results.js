/* eslint-disable indent */
// Function called when the DOM is fully loaded.
function init() {
  displaySavedResults();
}

// Function to display the saved results from local storage.
function displaySavedResults(){

    // Get the element with the id 'resultsList' to display the saved results.
    let resultsList = document.getElementById('resultsList');

    // Retrieve saved results from local storage.
    let savedResults = getSavedResults();

    // Loop through each saved result and display it.
    savedResults.forEach(function(result){
        displayResult(resultsList, result);
    });

}
// Function to retrieve the saved results from local storage.

function getSavedResults(){
    return JSON.parse(localStorage.getItem('savedResults')) || [];
}

// Function to display a single saved result.
