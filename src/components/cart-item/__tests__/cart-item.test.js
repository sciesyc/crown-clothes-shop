import { screen, render } from '@testing-library/react';

import CartItem from '../cart-item.component';

describe('CartItem tests', () => {
  it('CartItem render', () => {
    const mockedCartItem = {
      id: 1,
      name: 'Item A',
      imageUrl: 'test',
      price: 20,
      quantity: 2,
    };

    render(<CartItem cartItem={mockedCartItem} />);

    expect(screen.getByAltText('Item A')).toBeInTheDocument();
    expect(screen.getByText('2 x $20')).toBeInTheDocument();
  });
});
