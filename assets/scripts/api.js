'use strict'
const config = require('./config')
const store = require('./store')

// AUTHENTICATION API REQUESTS

const signUp = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: formData
  })
}
const signIn = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: formData
  })
}
const changePassword = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}
const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    method: 'DELETE'
  })
}

const getMeals = function () {
  return $.ajax({
    url: config.apiUrl + '/meals',
    method: 'GET'
  })
}

const createOrder = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/orders',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const deleteOrder = () => {
  return $.ajax({
    url: config.apiUrl + '/orders/' + store.order.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createFinalOrder = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/final_orders',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  store,
  createOrder,
  getMeals,
  createFinalOrder,
  deleteOrder
}
