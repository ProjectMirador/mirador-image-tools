import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from './test-utils';
import { TestableImageTools as MiradorImageTools } from '../src/plugins/MiradorImageTools';

const mockPalette = {
  palette: {
    getContrastText: () => 'rgb(0, 0, 0)',
    shades: { main: 'rgb(255, 255, 255)' },
  },
};

vi.mock('@custom-react-hooks/use-element-size', () => ({
  useElementSize: () => [undefined, { height: 200, width: 100 }],
}));

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
      {...props}
    />,
  );
}

describe('MiradorImageTools', () => {
  it('renders buttons', async () => {
    createWrapper();

    expect(screen.getByRole('button', { name: 'brightness' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'contrast' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'saturation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'greyscale' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'invert' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'revert' })).toBeInTheDocument();
  });
  it('renders ImageRotation', () => {
    createWrapper();

    expect(screen.getByRole('button', { name: 'rotateLeft' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'rotateRight' })).toBeInTheDocument();
  });
  it('renders ImageFlip', () => {
    createWrapper();
    expect(screen.getByRole('button', { name: 'flip' })).toBeInTheDocument();
  });
});

describe('MiradorImageTools rotation and flip', () => {
  it('rotateRight calls updateViewport with rotation: 90', () => {
    const updateViewport = vi.fn();
    createWrapper({ updateViewport, viewConfig: { flip: false, rotation: 0 } });

    fireEvent.click(screen.getByRole('button', { name: 'rotateRight' }));

    expect(updateViewport).toHaveBeenCalledWith('x', { rotation: 90 });
  });

  it('rotateLeft calls updateViewport with rotation: -90', () => {
    const updateViewport = vi.fn();
    createWrapper({ updateViewport, viewConfig: { flip: false, rotation: 0 } });

    fireEvent.click(screen.getByRole('button', { name: 'rotateLeft' }));

    expect(updateViewport).toHaveBeenCalledWith('x', { rotation: -90 });
  });

  it('flip calls updateViewport with flip: true', () => {
    const updateViewport = vi.fn();
    createWrapper({ updateViewport, viewConfig: { flip: false, rotation: 0 } });

    fireEvent.click(screen.getByRole('button', { name: 'flip' }));

    expect(updateViewport).toHaveBeenCalledWith('x', { flip: true });
  });

  it('rotateRight with flip active inverts rotation direction', () => {
    const updateViewport = vi.fn();
    createWrapper({ updateViewport, viewConfig: { flip: true, rotation: 0 } });

    fireEvent.click(screen.getByRole('button', { name: 'rotateRight' }));

    expect(updateViewport).toHaveBeenCalledWith('x', { rotation: -90 });
  });
});
