import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/logo.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { signOutStart } from '../../store/user/user.action';

import { selectCurrentUser } from '../../store/user/user.selector';

import {
  Logo,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './navigation.styles';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const handleSignOutUser = () => {
    dispatch(signOutStart());
  };

  return (
    <>
      <NavigationContainer>
        <Logo to="/">
          <CrownLogo className="logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={handleSignOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
