'use strict'
const events = require('./events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out-button').on('click', events.onSignOut)
  events.addHandlers()
  // $('#order-history-button').on('click', events.onFindGames)
  // $('#modal-form').on('submit', events.onSubmitForm)
})
