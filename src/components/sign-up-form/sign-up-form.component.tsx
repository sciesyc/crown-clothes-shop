import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { signUpStart } from '../../store/user/user.action';
import { SignUpContainer } from './sign-up-form.styles';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFormFieldsState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFieldsState);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields({ ...defaultFormFieldsState });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('not equal passwords');
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, email already in use');
      } else {
        console.log(
          'Error message of user creation: ',
          (error as Error).message
        );
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
    <SignUpContainer>
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
    </SignUpContainer>
  );
};

export default SignUpForm;
