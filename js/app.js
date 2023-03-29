'use strict';
console.log('file connected');

// Global Variables
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
      selectedProducts[i].shown++;
    }

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


  // Loop through the sortedProducts array and populate the three arrays with the corresponding values.
  for (let i = 0; i < sortedProducts.length; i++) {
    let product = sortedProducts[i];
    productNames.push(product.name);
    productClicks.push(product.clicks);
  }
  // Create a bar chart using Chart.js.
  new Chart(ctx, {
    // Set the chart type to bar.
    type: 'bar',
    // Set the chart data with the labels, datasets, and other options.
    data: {
      labels: productNames,
      datasets: [
        {
          label: 'Votes',
          data: productClicks,
          backgroundColor: 'rgba(63, 81, 94, 0.2)',
          borderColor: 'rgba(126, 158, 177, 1)',
          borderWidth: 1
        }
      ]
    },
    // Set the chart options with the scales, legend, and title.
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Product Votes'
        }
      }
    }
  });

}
// Add a click event listener to the voteSection element, which calls the handleImageClick function when a product image is clicked.
voteSection.addEventListener('click', handleImageClick);
