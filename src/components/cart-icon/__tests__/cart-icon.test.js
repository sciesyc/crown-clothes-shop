import { screen } from '@testing-library/react';

import CartIcon from '../cart-icon.component';

import renderWithProviders from '../../../utils/testing/render-with-provider.utils';

const mockClick = jest.fn();

describe('CartIcon component test', () => {
  it('rendering CartItem component with one item and the quantity of 2', () => {
    const initialCartItems = [
      {
        id: 1,
        name: 'Item A',
        imageUrl: 'test',
        price: 20,
        quantity: 2,
      },
    ];

    renderWithProviders(<CartIcon />, {
      initialState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    expect(screen.getByText('shopping-bag.svg')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
