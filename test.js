import test from 'ava';
import React from 'react/addons';
import Rotation from './index';
const shallowRenderer = React.addons.TestUtils.createRenderer();
shallowRenderer.render(<Rotation className="rotation" data={[0, 1, 2]} />);
const rotation = shallowRenderer.getRenderOutput();

test('should be a Rotation', t => {
  t.plan(8);
  t.true(rotation.props.className === 'rotation');
  t.true(rotation.props.children.length === 3);

  rotation.props.children.forEach((child, i) => {
    t.true(child.type === 'img');
    t.true(child.props.src === i);
  });
});
