import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up-form.styles.scss';

const defaultFormFieldsState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFieldsState);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields({ ...defaultFormFieldsState });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('not equal passwords');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('Error message of user creation: ', error.message);
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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up With your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Display Name'}
          type="text"
          required={true}
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label={'Email'}
          type="email"
          required={true}
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label={'Password'}
          type="password"
          required={true}
          name="password"
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label={'Confirm Password'}
          type="password"
          required={true}
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
