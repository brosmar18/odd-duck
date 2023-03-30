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
function displayResult(resultsList, result){
    // Div to style and display the result.
    let resultsDisplay = document.createElement('div');
    resultsDisplay.className = 'results__display';

    // Title for the saved result with the user's name and date.

    let resultTitle = document.createElement('h3');
    resultTitle.textContent = `${result.name} - ${result.date}`;
    resultTitle.className = 'results__display-title';
    resultsDisplay.appendChild(resultTitle);

    // Image element with the saved result.
    let resultImage = document.createElement('img');
    resultImage.src = result.imageURL;
    resultImage.alt = `${result.name} - ${result.date}`
    resultImage.className = 'results__display-image';
    resultsDisplay.appendChild(resultImage);

    // Append the resultsDisplay to the results list.
    resultsList.appendChild(resultsDisplay);
}

// Link the init function to the DOMContentLoaded event.
document.addEventListener('DOMContentLoaded', init);
