class ApiMock {
  login(user) {
    console.log(user)
    return Promise.resolve({status: 200, data: user})
  }
  getRooms() {
    console.log('TITI')
    return Promise.resolve({
      status: 200, data: [
        {
          id: 1,
          name: 'Party1',
          owner: 'Alex'
        },
        {
          id: 2,
          name: 'Party2',
          owner: 'TOTO'
        },
        {
          id: 3,
          name: 'Party3',
          owner: 'TUTU'
        },
      ]
    })
  }
}
export default new ApiMock()
