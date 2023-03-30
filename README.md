# NextHorizon Labs

## Overview
This project is a web application that allows users to vote on various products and view the results of their votes. The application is built using HTML, CSS, and JavaScript. The project consists of two main pages: the home page (index.html) and the results page (results.html). The home page contains the voting section where users can vote on products, and the results page displays the saved results from local storage.

## Technologies Used
1. **HTML** - The structure and layout of the web application are built using HTML.
2. **CSS** - The styling of the web application is done using CSS to provide a visually appealing and user-friendly interface.
3. **JavaScript** - JavaScript is used to handle the user interactions, such as voting and displaying results, as well as managing local storage for saving and retrieving voting data.

## Features
1. **Voting on Products** - Users can vote on a set of randomly displayed products on the home page. They have a limited number of votes (10), which is shown on the page to inform them about the remaining votes.

2. **Displaying Voting Results** - After the user has finished voting, they can view the results in the form of a bar chart that shows the number of votes and times each product was shown. The chart is created using the Chart.js library.

3. **Saving Voting Results** - Users can save their voting results by entering their name and the date of the vote. The results are stored in the browser's local storage, allowing them to view their saved results at a later time.

4. **Viewing Saved Results** - Users can view all their saved voting results on the results page, sorted in ascending order based on the user's name. If there are no saved results, a message is displayed to inform the user that there are no saved results at this time.

5. **Clearing Saved Results** - Users have the option to clear all their saved results from local storage using a "Clear Results" button on the results page.

## How to Run the Project
1. Clone or download the project repository.
2. Open the index.html file in your preferred web browser.
3. Start voting on the products by clicking on the product images.
4. View the voting results by clicking the "View Results" button after voting.
5. Save your results by filling in your name and the date, then clicking the "Save Result" button.
6. Navigate to the results.html file to view your saved results, and clear them if desired.

## Future Enhancements
1. Add user authentication to allow users to log in and save their voting history.
2. Implement a database to store voting results for better data persistence and management.
3. Add more products and categories for users to vote on.
4. Improve the user interface and experience with additional styling and animations.
