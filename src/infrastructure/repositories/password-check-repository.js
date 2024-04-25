module.exports = class PasswordCheckRepository {
  async save (password) {
    // We can do any action here, like save it into DB

    console.log(password)

    return true
  }
}
