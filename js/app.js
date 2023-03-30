'use strict';
console.log('file connected');

// Global Variables

let linkResults = document.getElementById('link');
let voteSection = document.getElementById('vote');


let voteSectionTitle = document.createElement('h2');
voteSectionTitle.className = 'vote__title';
voteSectionTitle.textContent = 'Vote On Our Products';
voteSection.appendChild(voteSectionTitle);


let productSectionDescription = document.createElement('p');
productSectionDescription.className = 'vote__description';
productSectionDescription.textContent = 'Vote for our next innovation! Click on the images below and help us decide which product to create next';
voteSection.appendChild(productSectionDescription);

// Defined the total number of times the user can vote and the current round the user is on.
let totalRounds = 10;
let currentRound = 0;

// Creates a paragraph element to display the remainding number of votes.
let remainingVotesDisplay = document.createElement('p');
remainingVotesDisplay.className = 'vote__remaining-votes';
voteSection.appendChild(remainingVotesDisplay);

// Constructor function called "Product".
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.shown = 0;
}

// Array of Product instances representing a product with a name and image source.
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



// Function to generate a random number based on the length of the productImages array.
function getRandomNum() {
  return Math.floor(Math.random() * productImages.length);
}


// Function to update the text content of the remainingVotesDisplay
function updateRemainingVotesDisplay() {
  remainingVotesDisplay.textContent = `You have ${totalRounds - currentRound} votes remaining.`;
}

// Function to display three random products from the productImages array.
function displayProducts() {
  // array to store the indexes of selected products.
  let indexes = [];

  // Generate three random numbers to add to the indexes array.
  while (indexes.length < 3) {
    let randomNum = getRandomNum();

    /* if randomNum does not exist in the array, index() returns -1, which means indexOf(randomNum) === 1 is true.
    If randomNum already exists in the indexes array, indexOf(randomNum) === -1 will be false, and the loop will continue to generate new numbers until it finds three unique ones.
    */
    if (indexes.indexOf(randomNum) === -1) {
      indexes.push(randomNum);
    }
  }
  // Empty array to store the selected products.
  let selectedProducts = [];

  // Loop through the indexes array and add the corresponding Product instances to the selectedProducts array.

  for (let i = 0; i < indexes.length; i++) {
    selectedProducts.push(productImages[indexes[i]]);
  }

  // Increment the clicks property of each selected product.
  for (let i = 0; i < selectedProducts.length; i++) {
    selectedProducts[i].clicks++;
    selectedProducts[i].shown++;
  }


  let productSectionImages = document.createElement('div');
  productSectionImages.className = 'vote__images';
  voteSection.appendChild(productSectionImages);

  // Loop through the selectedProducts array and create a new HTML element'img' for each product image.
  for (let i = 0; i < selectedProducts.length; i++) {
    let img = document.createElement('img');
    img.className = 'vote__image';
    img.src = selectedProducts[i].src;
    img.alt = selectedProducts[i].name;
    productSectionImages.appendChild(img);

    // Increment the shown property of each selected product.
    for (let i = 0; i < selectedProducts.length; i++) {
      selectedProducts[i].shown++;}

  }
}

// Call the displayProducts function to display the initial set of product images.
displayProducts();


// Event handler function that is called when the user clicks on a product image.
function handleImageClick(event) {
// Loop through the productImages array and find the Product instance that matches the image that was clicked on by checking if the image source URL contains the source URL of the current product image in the loop.
  for (let i = 0; i < productImages.length; i++) {
    if (event.target.src.includes(productImages[i].src)) {
      // Increment the clicks prperty of the matched Product instance by 1.
      productImages[i].clicks++;
      break;
    }
  }

  // Remove the product images from the page by removing the last child element of the voteSection element.
  voteSection.removeChild(voteSection.lastElementChild);

  // Increment the current round number and update the remainding votes display.
  currentRound++;
  updateRemainingVotesDisplay();

  // If there are remaining voting rounds, display a new set of product images by calling the displayProducts function. Otherwise, remove the event listener from the voteSection element and display a "view results" button by creating the displayResults function when clicked.
  if (currentRound < totalRounds) {
    displayProducts();
  } else {
    voteSection.removeEventListener('click', handleImageClick);


    let viewResultsButton = document.createElement('button');
    viewResultsButton.className = 'results__view-button';
    viewResultsButton.textContent = 'View Results';
    viewResultsButton.addEventListener('click', displayResults);
    voteSection.appendChild(viewResultsButton);
  }
}

// Function to display the voting results.
function displayResults() {
  // Get the canvas element from the HTML.
  let resultsCanvas = document.getElementById('resultsChart');
  // Get the 2D context of the canvas element.
  let ctx = resultsCanvas.getContext('2d');

  // Sort the productImages array in descending order of clicks.
  let sortedProducts = productImages.slice().sort(function (a, b) {
    return b.clicks - a.clicks;
  });

  // Create empty arrays to store the product names, clicks, and shown counts.
  let productNames = [];
  let productClicks = [];
  let productShown = [];



  // Loop through the sortedProducts array and populate the three arrays with the corresponding values.
  for (let i = 0; i < sortedProducts.length; i++) {
    let product = sortedProducts[i];
    productNames.push(product.name);
    productClicks.push(product.clicks);
    productShown.push(product.shown);
  }
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes',
        data: productClicks,
        backgroundColor: 'rgba(65, 131, 215, 0.8)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1
      }, {
        label: 'Shown',
        data: productShown,
        backgroundColor: 'rgba(26, 55, 78, 0.6)',
        borderColor: 'rgba(179, 206, 224, 1)',

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






  // Add an event listener to the form button.
  let saveResultButton = document.getElementById('button');
  saveResultButton.addEventListener('click', saveResult);


showForm();
}


// Add a click event listener to the voteSection element, which calls the handleImageClick function when a product image is clicked.
voteSection.addEventListener('click', handleImageClick);

// Function to save the result.
function saveResult(event){
  // Prevent the form from submitting and refreshing the page.
  event.preventDefault();

  // Get the user's name from the input field.
  let userName = document.getElementById('userName').value;

  // Get the date from the input field with id 'resultDate'.
  let resultDate = document.getElementById('resultDate').value;

  //check if both name and date are provided, otherwise show an alert.
  if(!userName || !resultDate){
    alert('Both name and date fields are required to save the result.');
    return;
  }

  // Get the URL of the chart image from the canvas element.
  let chartImageURL = document.getElementById('resultsChart').toDataURL('image/png');

  // Retrieve saved results from local storage or use empty array if there are no saved results.
  let savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];

  // Push the new result to the savedResults array.
  savedResults.push({name: userName, date: resultDate, imageURL: chartImageURL});

  // Save the updated savedResults array back to local storage.
  localStorage.setItem('savedResults', JSON.stringify(savedResults));

  // Show an alert to inform the user that the result was saved successfully.
  alert('Result saved successfully');

}

// Function to remove the 'hidde' attribute and display the form.
function showForm() {
  let form = document.getElementById('form');
  form.removeAttribute('hidden');
}
