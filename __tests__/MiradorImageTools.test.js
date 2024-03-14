import React from 'react';
import { render } from '@testing-library/react';
import { TestableImageTools as MiradorImageTools } from '../src/plugins/MiradorImageTools';
import ImageTool from '../src/plugins/ImageTool';
import ImageRotation from '../src/plugins/ImageRotation';
import ImageFlip from '../src/plugins/ImageFlip';

const mockPalette = {
  palette: {
    shades: { main: 'rgb(255, 255, 255)' },
    getContrastText: () => 'rgb(0, 0, 0)',
  },
};

function createWrapper(props) {
  return render(
    <MiradorImageTools
      classes={{}}
      viewer={{}}
      updateViewport={() => {}}
      updateWindow={() => {}}
      windowId="x"
      width="sm"
      theme={mockPalette}
      t={() => {}}
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
    expect(wrapper.find(ImageRotation).length).toBe(2);
  });
  it('renders ImageFlip', () => {
    wrapper = createWrapper();
    expect(wrapper.find(ImageFlip).length).toBe(1);
  });
});
