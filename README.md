Instameal is a food ordering app where users can choose from a some pre-seeded
meals. Users create a shopping cart by adding meals to an Orders database,
and then finalize the order by pressing checkout. The back-end stores the orders,
final_orders.

Deployed website:
https://smd9788.github.io/instameal-front-client/

Deployed rails server:
https://instameal-api-client.herokuapp.com/

Wireframes/ERD:
https://imgur.com/a/HiGjYKA

Technologies Used:

JavaScript
HTML
CSS
jQuery
Ruby on Rails
Handlebars
AJAX requests from preconfigured API


Unsolved Problems/Missing features:

- Fix delete order function. Removes render on front-end, but doesn't recalc total, and
  deletes only the most recent order, not the one targeted
- Add order history feature. GET request on final_orders
- Update UI for after checkout
- Update footer text
- Update style and format of menu cards and shopping cart

User stories:

1. As a user, I want to create an account, so I can save my order history.
2. As a user, I want to store my checkout information for future use.
3. As a user, I want to see descriptions for the different food options.
4. As a user, I want to see my price update as I add more items.
