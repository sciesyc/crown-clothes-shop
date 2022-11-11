import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFieldsState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  console.log('defaultFormFieldsState: ', { defaultFormFieldsState });
  const [formFields, setFormFields] = useState(defaultFormFieldsState);
  console.log('formFields: ', formFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields({ ...defaultFormFieldsState });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('password', password);
      console.log('confirmPassword', confirmPassword);
      alert('not equal passwords');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log('user', user);
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
    <div>
      <h1>Sign Up With your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Display Name</label>
        <input
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={formFields.displayName}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={formFields.email}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={formFields.password}
        />
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassword"
          onChange={handleChange}
          value={formFields.confirmPassword}
        />
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default SignUpForm;
