import firestoreAuth from 'firebase/auth';

import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../firebase/firebase.utils';

jest.mock('firebase/auth', () => {
  //Mocked functions of the firebase/auth
  return {
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn().mockImplementation(() => {
      return {
        setCustomParameters: jest.fn(),
      };
    }),
    signInWithPopup: jest.fn(),
    signInWithRedirect: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  };
});

describe('testing firebase utils functions', () => {
  it("Test signInWithGooglePopup. Should trigger firestoreAuth's signInWithPopup function", () => {
    signInWithGooglePopup();

    expect(firestoreAuth.signInWithPopup).toHaveBeenCalled();
  });

  it("Test signInWithGoogleRedirect. Should trigger firestoreAuth's signInWithRedirect function", () => {
    signInWithGoogleRedirect();

    expect(firestoreAuth.signInWithRedirect).toHaveBeenCalled();
  });

  it("Test signInAuthUserWithEmailAndPassword. Should trigger firestoreAuth's signInWithEmailAndPassword function with passed arguments", () => {
    const testEmail = 'testE';
    const testPassword = 'testP';

    signInAuthUserWithEmailAndPassword(testEmail, testPassword);

    expect(firestoreAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testEmail,
      testPassword
    );
  });

  it("Test createAuthUserWithEmailAndPassword. Should trigger firestoreAuth's signInWithRedirect function", () => {
    const testEmail = 'testE';
    const testPassword = 'testP';

    createAuthUserWithEmailAndPassword(testEmail, testPassword);

    expect(firestoreAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testEmail,
      testPassword
    );

    createAuthUserWithEmailAndPassword();

    expect(firestoreAuth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(
      1
    );
  });

  it("Test signOutUser. Should trigger firestoreAuth's signOut", () => {
    signOutUser();

    expect(firestoreAuth.signOut).toHaveBeenCalled();
  });
});
