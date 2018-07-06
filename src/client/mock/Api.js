class ApiMock {
  login(user) {
    console.log(user)
    return Promise.resolve({status: 200, data: user})
  }
}
export default new ApiMock()
