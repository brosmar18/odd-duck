// Use strict mode to enforce better coding practices
'use strict';
console.log('file connected');

// Declare global variables for the elements we'll be working with
let linkResults = document.getElementById('link');
let voteSection = document.getElementById('vote');

// Create and configure a new 'h2' element for the vote section title
let voteSectionTitle = document.createElement('h2');
voteSectionTitle.className = 'vote__title';
voteSectionTitle.textContent = 'Vote On Our Products';
// Append the vote section title to the vote section element
voteSection.appendChild(voteSectionTitle);

// Create and configure a new paragraph element for the product section description
let productSectionDescription = document.createElement('p');
productSectionDescription.className = 'vote__description';
productSectionDescription.textContent = 'Vote for our next innovation! Click on the images below and help us decide which product to create next';
// Append the product section description to the vote section element
voteSection.appendChild(productSectionDescription);

// Define the total number of times the user can vote and the current round the user is on
let totalRounds = 10;
let currentRound = 0;

// Create and configure a new paragraph element to display the remaining number of votes
let remainingVotesDisplay = document.createElement('p');
remainingVotesDisplay.className = 'vote__remaining-votes';
// Append the remaining votes display to the vote section element
voteSection.appendChild(remainingVotesDisplay);

// Constructor function called "Product" to create new product instances
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.shown = 0;
}

// Array of Product instances, each representing a product with a name and image source
let productImages = [
  new Product('Bike', 'images/bike.png'),
  new Product('Car', 'images/car.png'),
  new Product('Cyborg', 'images/cyborg.png'),
  new Product('Drone', 'images/drone.png'),
  new Product('Food', 'images/food.png'),
  new Product('Solar Energy', 'images/solar-energy.png'),
  new Product('Teleport Device', 'images/teleport-device.png'),
  new Product('Watch', 'images/watch.png'),
  new Product('Mirror', 'images/mirror.png'),
  new Product('Robotic System', 'images/robotic-system.png'),
  new Product('Water Filter', 'images/water-filter.png'),
  new Product('Space Elevator', 'images/space-elevator.png'),
  new Product('Iron Suit', 'images/iron-suit.png'),
  new Product('Hover Board', 'images/hover-board.png')
];


// Function to generate a random number based on the length of the productImages array
function getRandomNum() {
  return Math.floor(Math.random() * productImages.length);
}

// Function to update the text content of the remainingVotesDisplay element
function updateRemainingVotesDisplay() {
  remainingVotesDisplay.textContent = `You have ${ totalRounds - currentRound } votes remaining.`;
}

// This function displays three random products from the productImages array.
function displayProducts() {

  // An array to store the indexes of selected products.
  let indexes = [];

  // This loop generates three random numbers to add to the indexes array.
  while (indexes.length < 3) {
    let randomNum = getRandomNum(); // calling getRandomNum function to generate a random number.

    // if randomNum does not exist in the indexes array, index() returns -1, which means indexOf(randomNum) === -1 is true.
    // If randomNum already exists in the indexes array, indexOf(randomNum) === -1 will be false, and the loop will continue to generate new numbers until it finds three unique ones.
    if (indexes.indexOf(randomNum) === -1) {
      indexes.push(randomNum);
    }

  }

  // An empty array to store the selected products.
  let selectedProducts = [];

  // This loop goes through the indexes array and adds the corresponding Product instances to the selectedProducts array.
  for (let i = 0; i < indexes.length; i++) {
    selectedProducts.push(productImages[indexes[i]]);
  }

  // This loop increments the clicks and shown property of each selected product.
  for (let i = 0; i < selectedProducts.length; i++) {
    selectedProducts[i].clicks++;
    selectedProducts[i].shown++;
  }

  // Creating a new div element with class name 'vote__images' and adding it to the voteSection element.
  let productSectionImages = document.createElement('div');
  productSectionImages.className = 'vote__images';
  voteSection.appendChild(productSectionImages);

  // This loop goes through the selectedProducts array and creates a new HTML 'img' element for each product image.
  for (let i = 0; i < selectedProducts.length; i++) {
    let img = document.createElement('img');
    img.className = 'vote__image';
    img.src = selectedProducts[i].src; // Setting the source attribute of the 'img' element to the source of the selected product image.
    img.alt = selectedProducts[i].name; // Setting the alt attribute of the 'img' element to the name of the selected product image.
    productSectionImages.appendChild(img);

  }
}

// Calling the displayProducts function to display the initial set of product images.
displayProducts();


// This is an event handler function that is called when the user clicks on a product image.
function handleImageClick(event) {

  // This loop goes through the productImages array and finds the Product instance that matches the image that was clicked on by checking if the image source URL contains the source URL of the current product image in the loop.
  for (let i = 0; i < productImages.length; i++) {
    if (event.target.src.includes(productImages[i].src)) {
      // If the matching Product instance is found, increment the clicks property of that Product instance by 1.
      productImages[i].clicks++;
      break;
    }
  }

  // Remove the product images from the page by removing the last child element of the voteSection element.
  voteSection.removeChild(voteSection.lastElementChild);

  // Increment the current round number and update the remaining votes display.
  currentRound++;
  updateRemainingVotesDisplay();

  // If there are remaining voting rounds, display a new set of product images by calling the displayProducts function.
  // Otherwise, remove the event listener from the voteSection element and display a "view results" button by creating the displayResults function when clicked.
  if (currentRound < totalRounds) {
    displayProducts();
  } else {
    voteSection.removeEventListener('click', handleImageClick);

    // Create a new button element with class name 'results__view-button', text content 'View Results', and an event listener that calls the displayResults function.
    let viewResultsButton = document.createElement('button');
    viewResultsButton.className = 'results__view-button';
    viewResultsButton.textContent = 'View Results';
    viewResultsButton.addEventListener('click', displayResults);
    // Add the new button element to the voteSection element.
    voteSection.appendChild(viewResultsButton);

  }
}

// This is a function to display the voting results.
function displayResults() {

  // Get the canvas element with ID 'resultsChart' from the HTML.
  let resultsCanvas = document.getElementById('resultsChart');
  // Get the 2D context of the canvas element.
  let ctx = resultsCanvas.getContext('2d');

  // Sort the productImages array in descending order of clicks and assign it to a new variable sortedProducts.
  let sortedProducts = productImages.slice().sort(function (a, b) {
    return b.clicks - a.clicks;
  });

  // Create empty arrays to store the product names, clicks, and shown counts.
  let productNames = [];
  let productClicks = [];
  let productShown = [];

  // This loop goes through the sortedProducts array and populates the three arrays with the corresponding values.
  for (let i = 0; i < sortedProducts.length; i++) {
    let product = sortedProducts[i];
    productNames.push(product.name);
    productClicks.push(product.clicks);
    productShown.push(product.shown);
  }



  // This Chart object is a bar chart that shows the number of votes and number of times each product was shown.
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames, // The labels of the x-axis are the product names.
      datasets: [{
        label: 'Votes', // The label of the first dataset is 'Votes'.
        data: productClicks, // The data for the first dataset is the number of clicks for each product.
        backgroundColor: 'rgba(65, 131, 215, 0.8)', // The background color for the first dataset is blue.
        borderColor: 'rgba(255, 255, 255, 1)', // The border color for the first dataset is white.
        borderWidth: 1
      }, {
        label: 'Shown', // The label of the second dataset is 'Shown'.
        data: productShown, // The data for the second dataset is the number of times each product was shown.
        backgroundColor: 'rgba(26, 55, 78, 0.6)', // The background color for the second dataset is dark blue.
        borderColor: 'rgba(179, 206, 224, 1)', // The border color for the second dataset is light blue.
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 20
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 20
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 20
            }
          }
        },
        title: {
          display: true,
          text: 'Product Votes',
          font: {
            size: 30
          }
        }
      }
    }
  });

  // Get the form button element with ID 'button'.
  let saveResultButton = document.getElementById('button');
  // Add an event listener to the form button that calls the saveResult function.
  saveResultButton.addEventListener('click', saveResult);

  // Call the showForm function to display the form.
  showForm();
}


// Add a click event listener to the voteSection element that calls the handleImageClick function when a product image is clicked.
voteSection.addEventListener('click', handleImageClick);

// This function saves the result.
function saveResult(event) {
  // Prevent the form from submitting and refreshing the page.
  event.preventDefault();

  // Get the user's name from the input field.
  let userName = document.getElementById('userName').value;

  // Get the date from the input field with id 'resultDate'.
  let resultDate = document.getElementById('resultDate').value;

  // Check if both name and date are provided, otherwise show an alert.
  if (!userName || !resultDate) {
    alert('Both name and date fields are required to save the result.');
    return;
  }

  // Get the URL of the chart image from the canvas element.
  let chartImageURL = document.getElementById('resultsChart').toDataURL('image/png');

  // Retrieve saved results from local storage or use empty array if there are no saved results.
  let savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];

  // Push the new result to the savedResults array.
  savedResults.push({ name: userName, date: resultDate, imageURL: chartImageURL });

  // Save the updated savedResults array back to local storage.
  localStorage.setItem('savedResults', JSON.stringify(savedResults));

  // Show an alert to inform the user that the result was saved successfully.
  alert('Result saved successfully');

  // Create a link to the results page.
  let resultsLink = document.createElement('a');
  resultsLink.href = 'results.html';
  resultsLink.className = 'link__link';
  resultsLink.textContent = 'Go to Results page';
  linkResults.appendChild(resultsLink);
}

// This function removes the 'hidden' attribute and displays the form.
function showForm() {
  let form = document.getElementById('form');
  form.removeAttribute('hidden');
}
