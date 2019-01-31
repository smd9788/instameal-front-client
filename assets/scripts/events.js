const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

// AUTHENTICATION API EVENTS
const onSignUp = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
  $('form').trigger('reset')
  $('#modalRegisterForm').modal('hide')
}
const onSignIn = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
  $('form').trigger('reset')
}
const onChangePassword = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
  $('form').trigger('reset')
  $('#modalChangePasswordForm').modal('hide')
}
const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
  $('#change-password').hide()
  $('#sign-out').hide()
}

const onGetMeals = (event) => {
  event.preventDefault()
  api.getMeals()
    .then(ui.getMealsSuccess)
    .catch(ui.failure)
}

const onCreateOrder = (event) => {
  event.preventDefault()
  console.log(event)
  const price = event.target.dataset.price
  const id = event.target.dataset.id
  console.log(price)
  const quantity = parseInt(getFormFields(event.target).quantity)
  console.log(quantity)
  const total = parseFloat(price) * quantity
  console.log(total)
  event.target.parentNode.firstElementChild.innerHTML = `<p>Sum is ${total}</p>`

  const data = {
    order: {
      user_id: store.user.id,
      meal_id: id,
      total: total,
      quantity: quantity
    }
  }
  console.log(data)
  api.createOrder(data)
    .then(ui.createOrderSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#getMealsButton').on('click', onGetMeals)
  $('body').on('submit', '.order-meal-button', onCreateOrder)
  // $('.content').on('click', '.delete-meal', onDeleteMeal)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onGetMeals,
  addHandlers,
  onCreateOrder
}
