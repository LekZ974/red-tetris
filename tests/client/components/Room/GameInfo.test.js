import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import GameInfo from '../../../../src/client/components/Room/GameInfo'

const spectres = [
  {name: 'spectre1', gameSpectre: 'gameSpectre1'},
  {name: 'spectre2', gameSpectre: 'gameSpectre2'},
  {name: 'spectre3', gameSpectre: 'gameSpectre3'}
]

describe('>>>>GAMEINFO', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GameInfo spectres={spectres}/>)
  })
  it('GameInfo display', () => {
    const component = renderer.create(
      <GameInfo spectres={spectres}/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
