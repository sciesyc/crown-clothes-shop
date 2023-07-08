import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { AuthError, AuthErrorCodes } from 'firebase/auth';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles.jsx';

const defaultFormFieldsState = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFieldsState);
  const { email, password } = formFields;

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => {
    setFormFields({ ...defaultFormFieldsState });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert('incorrect password for email');
          break;
        case AuthErrorCodes.USER_DELETED:
          alert('incorrect password for email');
          break;
        default:
          console.log('ERROR :', (error as Error).message);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <form onSubmit={handleSubmit}>
        <h2>I already have an account</h2>
        <span>Sign In with your email and password</span>
        <FormInput
          label={'Email'}
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label={'Password'}
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
