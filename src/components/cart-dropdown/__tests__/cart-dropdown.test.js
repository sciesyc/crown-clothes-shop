import { fireEvent, screen } from '@testing-library/react';
import renderWithProviders from '../../../utils/testing/render-with-provider.utils';
import CartDropdown from '../cart-dropdown.component';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('cart dropdown tests', () => {
  it('cart dropdown render', () => {
    renderWithProviders(<CartDropdown />, {
      initialState: {
        cart: {
          cartItems: [],
        },
      },
    });

    expect(screen.getByText('your cart is empty')).toBeInTheDocument();
  });

  it('cart dropdown rendered with items', () => {
    const initialCartItems = [
      {
        id: 1,
        name: 'Item A',
        imageUrl: 'test',
        price: 20,
        quantity: 2,
      },
      { id: 2, name: 'Item B', imageUrl: 'test', price: 40, quantity: 4 },
    ];

    renderWithProviders(<CartDropdown />, {
      initialState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    expect(screen.queryByText('your cart is empty')).toBeNull();
    expect(screen.getByAltText('Item A')).toBeInTheDocument();
    expect(screen.getByAltText('Item B')).toBeInTheDocument();
  });

  it('cart button redirect to check out page', () => {
    renderWithProviders(<CartDropdown />);

    const button = screen.getByRole('button', { name: 'GO TO CHECKOUT' });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });
});
