import React from 'react';
import { shallow } from 'enzyme';
import MiradorImageTools from '../src/plugins/MiradorImageTools';
import ImageTool from '../src/plugins/ImageTool';
import ImageRotation from '../src/plugins/ImageRotation';

function createWrapper(props) {
  return shallow(
    <MiradorImageTools
      TargetComponent={'<div>hello</div>'}
      targetProps={{
        windowId: 'abc123',
      }}
      {...props}
    />,
  );
}

describe('MiradorImageTools', () => {
  let wrapper;
  it('renders ImageTools', () => {
    wrapper = createWrapper();
    expect(wrapper.find(ImageTool).length).toBe(5);
  });
  it('renders ImageRotation', () => {
    wrapper = createWrapper();
    expect(wrapper.find(ImageRotation).length).toBe(1);
  });
});
