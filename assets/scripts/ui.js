'use strict'
const store = require('./store')
const showMealsTemplate = require('./templates/get-meals.handlebars')
const addMealsTemplate = require('./templates/add-meals.handlebars')
const orderHistoryTemplate = require('./templates/get-finalorders.handlebars')

$('#change-password-button').hide()
$('#sign-out-button').hide()
$('#order-history-button').hide()
$('#menu-container').hide()
$('#checkout-button').hide()

// AUTHENTICATION API UI MESSAGING

const onSignUpSuccess = (responseData) => {
  $('#user-message').text('Registration successful! Please sign in to get started')
}
const onSignUpFailure = () => {
  $('.modal').hide()
  $('.fade').hide()
  $('#user-message').text('Sorry. That email address is already registered')
}
const onSignInSuccess = (responseData) => {
  $('#user-message').text('Signed in successfully. Begin shopping or check your order history')
  $('#modalLoginForm').modal('hide')
  $('#change-password-button').show()
  $('#sign-out-button').show()
  $('#order-history-button').show()
  $('#menu-container').show()
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
  $('#stock-image').hide()
  store.user = responseData.user
}
const onSignInFailure = () => {
  $('.modal').hide()
  $('.fade').hide()
  $('#user-message').text('Incorrect email or password. Try again')
}
const onChangePasswordSuccess = (responseData) => {
  $('#user-message').text('Passwored changed successfully')
}
const onChangePasswordFailure = () => {
  $('.modal').hide()
  $('.fade').hide()
  $('#user-message').text('Error. Invalid new password')
}
const onSignOutSuccess = (responseData) => {
  store.user = null
}
const onSignOutFailure = () => {
  $('.modal').hide()
  $('.fade').hide()
  $('#user-message').text('Error. You are not logged in')
}
const getMealsSuccess = (data) => {
  const showMealsHtml = showMealsTemplate({
    meals: data.meals
  })
  $('#menu-cards').html(showMealsHtml)
}
const getFinalOrdersSuccess = (data) => {
  const orderHistoryModal = orderHistoryTemplate({
    final_orders: data.final_orders
  })
  if (data.final_orders.length < 1) {
    $('#order-history-list').text('No order history. Add items to your cart now')
  } else {
    $('#order-history-list').html(orderHistoryModal)
  }
}
const addMealsSuccess = (data, total, price, mealName) => {
  const addMealsHtml = addMealsTemplate({
    orders: data.order.id,
    quantity: data.order.quantity,
    meals: data.order,
    price: price,
    total: total,
    mealName: mealName
  })
  console.log(data)
  $('#menu-card').append(addMealsHtml)
}

const createOrderSuccess = (response) => {
  const orderData = response.order
  store.order = orderData
  $('#user-message').text('Order started. Continue shopping or checkout now.')
  $('#checkout-button').show()
}

const createFinalOrderSuccess = (response) => {
  const orderData = response.final_order
  store.final_order = orderData
  $('#user-message').hide()
  $('#menu-cards').hide()
  $('#current-order').hide()
  $('#stock-image').show()
  // $('#order-again-button').show()
  $('#checkout-message').text('Order complete! Please check your email for your order details')
}

const failure = () => {
  $('.modal').hide()
  $('.fade').hide()
  $('#user-message').text('Error. Something went fatally wrong. refresh the page and try again')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure,
  getMealsSuccess,
  createOrderSuccess,
  addMealsSuccess,
  createFinalOrderSuccess,
  getFinalOrdersSuccess,
  failure
}
