export default class Rooms {
	constructor(socketID) {
		this.socketID = socketID
	}

	getRooms() {
	  return [
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
      {
        id: 4,
        name: 'PartyA',
        owner: 'Alex'
      },
      {
        id: 5,
        name: 'PartyB',
        owner: 'TOTO'
      },
      {
        id: 6,
        name: 'PartyC',
        owner: 'TUTU'
      },
    ];
  }
}
