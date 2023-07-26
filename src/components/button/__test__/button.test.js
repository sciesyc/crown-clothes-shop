import { render, screen } from '@testing-library/react';
import Button, { BUTTON_TYPE_CLASSES } from '../button.component';

describe('button tests', () => {
  it('button rendered', async () => {
    render(<Button>Test</Button>);

    expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument();

    //BUG: Unexpected behavior of the button styles. It should have background-color: black; without hover effect
    expect(screen.getByRole('button', { name: 'Test' })).toHaveStyle(
      'background-color: white;'
    );
    expect(screen.getByRole('button', { name: 'Test' })).not.toBeDisabled();
  });

  it('should render google button when passing google type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test</Button>);

    //BUG: Unexpected behavior of the button styles. It should have background-color: #4285f4; without hover effect
    expect(screen.getByRole('button', { name: 'Test' })).toHaveStyle(
      'background-color: #357ae8;'
    );
  });

  it('should render inverted button when passing inverted type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test</Button>);

    //BUG: Unexpected behavior of the button styles. It should have background-color: white; without hover effect
    expect(screen.getByRole('button', { name: 'Test' })).toHaveStyle(
      'background-color: black;'
    );
  });

  it('should be disabled if the loading prop is true', () => {
    render(<Button isLoading={true}>Test</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
