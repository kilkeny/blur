import React from 'react';
import renderer from 'react-test-renderer';
import { LeaderboardRow } from '../index';

describe('LeaderboardRow', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LeaderboardRow
        order={1}
        username="username"
        avatar=""
        score={1000}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
