# Boo!camp Spot

*View Haunted Places from around the world!*

[Visit it here!](https://boocamp-spot.herokuapp.com/)

[![boo!campspot-landing](demo/landing_page.gif)](https://boocamp-spot.herokuapp.com/)

### Table of Contents

[Concept and Utilization](#concept-and-utilization)<br>
[About](#about)<br>
[Demo](#demo)<br>
[Technologies](#technologies)<br>
[Future Functionality](#future-functionality)

## Concept and Utilization

Boo!camp Spot allows users to view haunted places from around the world. Each place has a card with its title, location, description, and image. Places can be filtered by type (Building, Forests, Prisons, etc.). After clicking the card, the user is directed to the place's page, which also shows reviews and accounts from other users who have visited. 

Users who have signed up can create new places as well as submit their own reviews. On the user's profile page, places and reviews created by the user can be edited or deleted. Other information, such as the user's gravatar image, username, and 'boo day' (date of sign up) is also displayed. 

## About

### Overview

This app uses a node.js/express server and a SQL database for the backend. The files served to the front end are created using handlebars templates (server-side rendering). However, there is still a significant amount of client-side rendering. For example, some of the data in the front end is loaded via AJAX queries to backend API routes and subsequent dynamic rendering. Authentication is accomplished via JSON web tokens and passport.

### Front End HTML Routes

|HTML Route              |Description                  |
|------------------------|-----------------------------|
|/                       |landing page                 |
|/home                   |home page                    |
|/signup                 |signup form                  |
|/login                  |login form                   |
|/explore                |view haunted places          |
|/explore/new            |create new haunted place form|
|/explore/:type          |view haunted places by type  |
|/u/:username            |user profile/dashboard       |
|/u/:username/quickreview|create new review form       |
|/p/:haunted_place       |specific haunted place page  |

### Back End API Routes

|Method|Endpoint(base: /api/v1)                     |Functionality                                           |
|------|--------------------------------------------|--------------------------------------------------------|
|GET   |/users/:id                                  |get one user, with associated haunted places and reviews|
|GET   |/types                                      |get all types                                           |
|GET   |/types/:id                                  |get one type, with associated haunted places            |
|GET   |/hauntedplaces                              |get all haunted places                                  |
|GET   |/hauntedplaces/:id                          |get one haunted place, with associated reviews          |
|POST  |/hauntedplaces                              |create haunted place; requires auth user                |
|PUT   |/hauntedplaces/:id                          |update haunted place; requires auth user having place   |
|DELETE|/hauntedplaces/:id                          |delete haunted place; requires auth user having place   |
|GET   |/hauntedplaces/:haunted_place_id/reviews    |get all reviews belonging to a haunted place            |
|GET   |/hauntedplaces/:haunted_place_id/reviews/:id|get one review                                          |
|POST  |/hauntedplaces/:haunted_place_id/reviews    |create review; requires auth user                       |
|PUT   |/hauntedplaces/:haunted_place_id/reviews/:id|update reivew; requires auth user having review         |
|DELETE|/hauntedplaces/:haunted_place_id/reviews/:id|delete review; requires auth user having review         |

### Data Integrity

* To ensure that the data entering the database is what is desired, several layers of validation were utilized: 
  * front end form validations via JavaScript and jQuery
  * sequelize model validations
  * SQL database constraints (data type, null/not null, unique, etc.)

### API Usage

* While the thumbnail images for places comes from randomly selecting from a set of 12 static images, the image on each place's page comes from the Flickr API.
* The title of the haunted place is used as the search term for a Flickr API route, and a randomly selected link to a static asset is used as the source for the image. 

## Demo

* [deployed link](https://boocamp-spot.herokuapp.com/)

* Haunted places can be explored by clicking 'Places to see' on the home page.

  ![boo!campspot-explore](demo/explore.gif)

* They can also be filtered according to category by selecting a type from the navbar.

  ![boo!campspot-places-filter](demo/places_filter.gif)

* Reviews can be added by clicking 'Submit a review' on the home page (logged in users only).

  ![boo!campspot-review](demo/submit_review.gif)

* Haunted places can be created by clicking 'Report a sighting!' on the home page or the '+' button on the navbar (logged in users only).

  ![boo!campspot-create](demo/create_hp.gif)

* New users who sign up will be redirected to a user profile page, which will show their gravatar image, username, email, and 'boo day' (date the account was created). Any haunted places or reviews they create will also be visible on their profile page.

  ![boo!campspot-signup](demo/user_signup.gif)

## Technologies

### Back End

* Node.js, Express, Handlebars,js, SQL, Sequelize, Restful API, APIs
* bcryptjs, jsonwebtoken, passport, passport-jwt (authentication)

### Front End

* JavaScript, jQuery, Bootstrap 4

## Future Functionality

* Interactive map displaying haunted places
* Collect user photos from places
* Chat feature to allow visitors to chat with one another
* Autosuggested places for users based on location and past reviews
* Profile badges for users based on their activity - reviews, places submitted, and amount of time they've been signed up
