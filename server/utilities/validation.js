const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = {
  validateRegisterInput (data, isEditData) {
    if (!data.firstName) {
      return {
        isValid: false,
        msg: 'First Name is required.'
      }
    }
    if (!data.lastName) {
      return {
        isValid: false,
        msg: 'Last Name is required.'
      }
    }
    if (!data.username) {
      return {
        isValid: false,
        msg: 'Username is required.'
      }
    }
    if (data.username.length < 4) {
      return {
        isValid: false,
        msg: 'Username too short.'
      }
    }
    if (!data.email) {
      return {
        isValid: false,
        msg: 'Email is required.'
      }
    }
    if (!emailRegex.test(data.email)) {
      return {
        isValid: false,
        msg: 'Email is invalid.'
      }
    }
    if (data.password.length < 6) {
      return {
        isValid: false,
        msg: 'Password too short.'
      }
    }
    if (data.password.length > 50) {
      return {
        isValid: false,
        msg: 'Password too long.'
      }
    }
    return {
      isValid: true,
      msg: ''
    }
  }
}
