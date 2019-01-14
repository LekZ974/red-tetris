import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import GameInfo from '../../../../src/client/components/Room/GameInfo'

const user = {
  loosed: false,
}

const game = {
  players: null,
  params: {gameMode: 'A GAME MODE'}
}

describe('>>>>GAMEINFO', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GameInfo user={user} game={game}/>)
  })
  it('GameInfo display', () => {
    const component = renderer.create(
      <GameInfo user={user} game={game}/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
