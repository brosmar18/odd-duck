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

let productSectionImages = document.createElement('div');
productSectionImages.className = 'vote__images';
productsSection.appendChild(productSectionImages);

let productImage01 = document.createElement('image');
productImage01.className = 'vote__image';
productSectionImages.appendChild(productImage01);

let productImage02 = document.createElement('image');
productImage02.className = 'vote__image';
productSectionImages.appendChild(productImage02);

let productImage03 = document.createElement('image');
productImage03.className = 'vote__image';
productSectionImages.appendChild(productImage03);




// Constructor Function
function Product(name, image, timesShown) {
  this.name = name;
  this.image = image;
  this.timesShown = timesShown;
}
