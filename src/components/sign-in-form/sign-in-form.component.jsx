import { useState } from 'react';
import {
  auth,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultFormFieldsState = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFieldsState);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields({ ...defaultFormFieldsState });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('SIGNIN user: ', user);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('incorrect password for email');
          break;
        default:
          console.log('ERROR :', error.message);
      }
    }
  };

  const handleChange = (event) => {
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
