import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import GameInfo from '../../../../src/client/components/Room/GameInfo'

const spectres = [
  {name: 'spectre1', gameSpectre: [2,12,14,8,8,3,9,15,8,8]},
  {name: 'spectre2', gameSpectre: [2,12,14,8,8,3,9,15,8,8]},
  {name: 'spectre3', gameSpectre: [2,12,14,8,8,3,9,15,8,8]}
]

const user = {
  loosed: false,
}

describe('>>>>GAMEINFO', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GameInfo user={user} spectres={spectres}/>)
  })
  it('GameInfo display', () => {
    const component = renderer.create(
      <GameInfo user={user} spectres={spectres}/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
