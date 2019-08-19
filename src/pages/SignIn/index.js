import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/** ReactJS form library to create uncontrolled form structures with nested fields, validations and much more!
 */
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/M.svg';

/** Data validation */
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Type a valid e-mail')
    .required('Field e-mail is required'),
  password: Yup.string().required('Field password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your email" />
        <Input
          name="password"
          type="password"
          placeholder="Your secret password"
        />
        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
        <Link to="/register">Create Free Account</Link>
      </Form>
    </>
  );
}
