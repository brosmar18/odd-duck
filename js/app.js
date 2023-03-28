'use strict';
console.log('file connected');

// Global Variables
let voteSection = document.getElementById('vote');
let productsSection = document.createElement('section');
productsSection.className = 'vote__prooducts';
voteSection.appendChild(productsSection);

let productsSectionTitle = document.createElement('h2');
productsSectionTitle.className = 'vote__title';
productsSectionTitle.textContent = 'Vote On Our Products';
productsSection.appendChild(productsSectionTitle);

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.shown = 0;
}

let productImages = [
  new Product('Bike', '../images/bike.png'),
  new Product('Car', '../images/car.png'),
  new Product('Cyborg', '../images/cyborg.png'),
  new Product('Drone', '../images/drone.png'),
  new Product('Food', '../images/food.png'),
  new Product('Solar-energy', '../images/solar-energy.png'),
  new Product('teleport-device', '../images/teleport-device.png'),
  new Product('watch', '../images/watch.png'),
];

function getRandomNum() {
  return Math.floor(Math.random() * productImages.length);
}

function displayProducts() {
  let indices = [];

  while (indices.length < 3) {
    let randomNum = getRandomNum();
    if (indices.indexOf(randomNum) === -1) {
      indices.push(randomNum);
    }
  }

  let selectedProducts = [];
  for (let i = 0; i < indices.length; i++) {
    selectedProducts.push(productImages[indices[i]]);
  }

  for (let i = 0; i < selectedProducts.length; i++) {
    selectedProducts[i].clicks++;
  }

  let productSectionImages = document.createElement('div');
  productSectionImages.className = 'vote__images';
  productsSection.appendChild(productSectionImages);

  for (let i = 0; i < selectedProducts.length; i++) {
    let img = document.createElement('img');
    img.className = 'vote__image';
    img.src = selectedProducts[i].src;
    img.alt = selectedProducts[i].name;
    productSectionImages.appendChild(img);
    for (let i = 0; i < selectedProducts.length; i++) {
      selectedProducts[i].shown++;}

  }
}

displayProducts();

const totalRounds = 25;
let currentRound = 0;


function handleImageClick(event) {

  for (let i = 0; i < productImages.length; i++) {
    if (event.target.src.includes(productImages[i].src)) {
      productImages[i].clicks++;
      break;
    }
  }


  productsSection.removeChild(productsSection.lastElementChild);


  currentRound++;
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

function displayResults() {
  let resultsList = document.createElement('ul');
  voteSection.appendChild(resultsList);


  let sortedProducts = productImages.slice().sort(function (a, b) {
    return b.clicks - a.clicks;
  });

  for (let i = 0; i < productImages.length; i++) {
    let resultItem = document.createElement('li');
    resultItem.textContent = `${sortedProducts[i].name} had ${sortedProducts[i].clicks} votes, and was seen ${sortedProducts[i].shown} times.`;
    resultsList.appendChild(resultItem);


    if (i < 3) {
      let img = document.createElement('img');
      img.src = sortedProducts[i].src;
      img.alt = sortedProducts[i].name;
      img.width = 300;
      img.height = 300;
      resultItem.appendChild(img);
    }
  }
}


voteSection.addEventListener('click', handleImageClick);
