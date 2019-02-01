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
    .then(ui.onSignInSuccess, onGetMeals(event))
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

  const mealName = event.target.parentNode.parentNode.childNodes['1'].innerText
  const price = event.target.dataset.price

  const id = event.target.dataset.id
  const quantity = parseInt(getFormFields(event.target).quantity)
  const total = parseFloat(price) * quantity
  store.price += total
  $('#tooltip').html(`<h5>Added ${quantity} ${mealName} to cart</h5>`)
  $('#tooltip').append(`<h5>Order Total: ${Math.round(store.price * 100) / 100}</h5>`)
  const data = {
    order: {
      user_id: store.user.id,
      meal_id: id,
      total: total,
      quantity: quantity
    }
  }

  api.createOrder(data)
    .then((response) => {
      ui.createOrderSuccess(response)
      ui.addMealsSuccess(response, total, mealName)
    })
    .catch(ui.failure)
}

const onCreateFinalOrder = (event) => {
  event.preventDefault()
  console.log(event)
  const price = event.target.dataset.price
  const quantity = parseInt(getFormFields(event.target).quantity)
  const total = parseFloat(price) * quantity
  // $('#current-order').html(`<h5>Order Total: ${total}</h5>`)

  const data = {
    final_order: {
      user_id: store.user.id,
      total: total
    }
  }
  api.createFinalOrder(data)
    .then(ui.createFinalOrderSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('body').on('submit', '.order-meal-button', onCreateOrder)
  $('body').on('submit', '.order-meal-button', onCreateFinalOrder)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onGetMeals,
  addHandlers,
  onCreateOrder,
  onCreateFinalOrder
}
