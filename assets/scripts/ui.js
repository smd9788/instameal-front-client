'use strict'
const store = require('./store')
const showMealsTemplate = require('./templates/get-meals.handlebars')
const addMealsTemplate = require('./templates/add-meals.handlebars')

$('#change-password-button').hide()
$('#sign-out-button').hide()
$('#order-history-button').hide()
$('#menu-container').hide()
$('#checkout-button').hide()

// AUTHENTICATION API UI MESSAGING

const onSignUpSuccess = (responseData) => {
  $('#user-message').text('Registration successful!')
}
const onSignUpFailure = () => {
  $('#user-message').text('Sorry. That email address is already registered')
}
const onSignInSuccess = (responseData) => {
  $('#user-message').text('signed in successfully')
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
  $('#user-message').text('incorrect email or password. Try again')
}
const onChangePasswordSuccess = (responseData) => {
  $('#user-message').text('passwored changed successfully')
}
const onChangePasswordFailure = () => {
  $('#user-message').text('error. invalid new password')
}
const onSignOutSuccess = (responseData) => {
  $('#user-message').text('user signed out successfully')
  $('#change-password-button').hide()
  $('#sign-out-button').hide()
  $('#order-history-button').hide()
  $('#sign-up-button').show()
  $('#sign-in-button').show()
  store.user = null
}
const onSignOutFailure = () => {
  $('#user-message').text('error. you are not logged in')
}
const getMealsSuccess = (data) => {
  const showMealsHtml = showMealsTemplate({
    meals: data.meals
  })
  $('#menu-cards').html(showMealsHtml)
}

const addMealsSuccess = (data, total, mealName) => {
  console.log('data is:', data)
  const addMealsHtml = addMealsTemplate({
    orders: data.order.id,
    quantity: data.order.quantity,
    meals: data.order,
    total: total,
    mealName: mealName
  })
  $('#menu-card').append(addMealsHtml)
}

const createOrderSuccess = (response) => {
  const orderData = response.order
  store.order = orderData
  $('#user-message').text('Order started. Add your meals now.')
  $('#checkout-button').show()
}

const createFinalOrderSuccess = (response) => {
  const orderData = response.final_order
  store.final_order = orderData
  $('#user-message').hide()
  $('#current-order').html('Order complete! Please check your email for tracking info')
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
  createFinalOrderSuccess
}
