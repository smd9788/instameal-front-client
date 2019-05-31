# Instameal

Instameal is a food ordering app where users can choose from a list of some pre-seeded
meals. My goal in this project was to tackle a feature many ecommerce websites use,
a shopping cart.

In this app, when a user logs into their registered account, they will be displayed
a list of interactive product cards (meals). Users can add a custom quantity of
meals to their cart (orders table in database) and then finalize the order by
pressing the checkout button. This will send the total price to the final_orders
table, which has a unique relationship with each user. Users can click the
order history button to retrieve a list of their past final_orders.

#### [Rails API Repository](https://github.com/smd9788/instameal-API-client)
#### [Deployed Rails server](https://instameal-api-client.herokuapp.com/)
#### [Front-end Client Repository](https://github.com/smd9788/instameal-front-client)
#### [Deployed Client Website](https://smd9788.github.io/instameal-front-client/)
\
\
### Wireframe and ERD:

<img src="https://i.imgur.com/1nd97CV.jpg" width="450" height="650">

#### Technologies used in this repo:

- JavaScript
- jQuery
- HTML
- CSS
- Handlebars
- Bootstrap

#### Unsolved Problems/Missing features:

- Update footer text/links
- Update style and format of menu cards and shopping cart

#### User stories:

1. As a user, I want to create an account, so I can save my order history.
2. As a user, I want to store my checkout information for future use.
3. As a user, I want to see descriptions for the different food options.
4. As a user, I want to see my price update as I add more items.
