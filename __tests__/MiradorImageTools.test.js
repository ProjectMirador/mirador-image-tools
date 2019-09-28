import React from 'react';
import { shallow } from 'enzyme';
import MiradorImageTools from '../src/plugins/MiradorImageTools';
import ImageTool from '../src/plugins/ImageTool';

function createWrapper(props) {
  return shallow(
    <MiradorImageTools
      TargetComponent={'<div>hello</div>'}
      targetProps={{}}
      {...props}
    />,
  );
}

describe('MiradorImageTools', () => {
  let wrapper;
  it('renders ImageTools', () => {
    wrapper = createWrapper();
    expect(wrapper.find(ImageTool).length).toBe(4);
  });
});
