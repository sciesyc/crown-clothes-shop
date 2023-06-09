import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/logo.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { selectCurrentUser } from '../../store/user/user.selector';

import {
  Logo,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './navigation.styles.jsx';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const handleSignOutUser = async () => {
    await signOutUser();
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
