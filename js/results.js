/* eslint-disable indent */
// Function called when the DOM is fully loaded.
function init() {
  displaySavedResults();
  document.getElementById('clearResults').addEventListener('click', clearAllSavedResults);

}

// Function to display the saved results from local storage or display a message if there are no saved results.
function displaySavedResults(){

    // Get the element with the id 'resultsList' to display the saved results.
    let resultsList = document.getElementById('resultsList');

    // Retrieve saved results from local storage.
    let savedResults = getSavedResults();

    // Loop through each saved result and display it.

    // Check to see if there are any saved results.
    if (savedResults.length === 0){
        // call the displayNoResultsMessage function.
        displayNoResultsMessage(resultsList);
    } else{
        // Loop through each saved result and display it.
        savedResults.forEach(function (result) {
            displayResult(resultsList, result);
        });

    }

}

// Function to display a message if there are no saved results to display.
function displayNoResultsMessage(resultsList){
    // Create a p element for the message.
    let noResltsMessage = document.createElement('p');
    noResltsMessage.textContent = 'No Saved Results to Display at This Time';
    noResltsMessage.className = 'results_no-results-message';
    resultsList.appendChild(noResltsMessage);
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
    // Change date format to mm/dd/yyyy
    let formattedDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}).format(new Date(result.date));


    let resultTitle = document.createElement('h3');
    resultTitle.textContent = `${result.name} - ${formattedDate}`;
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

// Function to clear all saved results using button.
function clearAllSavedResults(){
    // Remove saved results from local storage.
    localStorage.removeItem('savedResults');
    // clear results section
    let resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    // Display the no saved results message.
    displayNoResultsMessage(resultsList);
}

// Link the init function to the DOMContentLoaded event.
document.addEventListener('DOMContentLoaded', init);
