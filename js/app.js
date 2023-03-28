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
  new Product('Solar-energy', 'images/solar-energy.png'),
  new Product('teleport-device', 'images/teleport-device.png'),
  new Product('watch', 'images/watch.png'),
  new Product('mirror', 'images/mirror.png'),
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

// Defined the total number of times the user can vote and the current round the user is on.
let totalRounds = 25;
let currentRound = 0;

// Creates a paragraph element to display the remainding number of votes.
let remainingVotesDisplay = document.createElement('p');
remainingVotesDisplay.className = 'vote__remaining-votes';
voteSection.appendChild(remainingVotesDisplay);
updateRemainingVotesDisplay();


// Function to update the text content of the remainingVotesDisplay
function updateRemainingVotesDisplay() {
  remainingVotesDisplay.textContent = `You have ${totalRounds - currentRound} votes remaining.`;
}

// Function to display three random products from the productImages array.
function displayProducts() {
  // array to store the indices of selected products.
  let indices = [];

  // Generate three random numbers to add to the indices array.
  while (indices.length < 3) {
    let randomNum = getRandomNum();
    if (indices.indexOf(randomNum) === -1) {
      indices.push(randomNum);
    }
  }
  // Empty array to store the selected products.
  let selectedProducts = [];

  // Loop through the indices array and add the corresponding Product instances to the selectedProducts array.
  for (let i = 0; i < indices.length; i++) {
    selectedProducts.push(productImages[indices[i]]);
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
    viewResultsButton.textContent = 'View Results';
    viewResultsButton.addEventListener('click', displayResults);
    voteSection.appendChild(viewResultsButton);
  }
}

// Function to display the voting results.
function displayResults() {
  let resultsList = document.createElement('ul');
  voteSection.appendChild(resultsList);

  // Sort the productImages array in descending order of clicks and store it in the sortedProducts variable.

  // slice() creates a new array containing the same elements as productImages.

  // sort() sorts the elements of an array in place, and returns the sorted array. The function subtracts the number of clicks of the second element from the number of clicks of the first element, resulting in a descending order based on the clicks property.

  let sortedProducts = productImages.slice().sort(function (a, b) {
    return b.clicks - a.clicks;
  });

  // Loop through the productImages array and create a new list item element for each product. The text content displays the product name, number of clicks, and number of times it was displayed on the page.
  for (let i = 0; i < productImages.length; i++) {
    let resultItem = document.createElement('li');
    resultItem.textContent = `${sortedProducts[i].name} had ${sortedProducts[i].clicks} votes, and was seen ${sortedProducts[i].shown} times.`;
    resultsList.appendChild(resultItem);


    if (i < 3) {
      let img = document.createElement('img');
      img.src = sortedProducts[i].src;
      img.alt = sortedProducts[i].name;
      resultItem.appendChild(img);
    }
  }
}


voteSection.addEventListener('click', handleImageClick);
