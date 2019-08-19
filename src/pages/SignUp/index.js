import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/M.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Field name is required'),
  email: Yup.string()
    .email('Type a valid e-mail')
    .required('Field e-mail is required'),
  password: Yup.string()
    .min(6, 'At least 6 characters')
    .required('Field password is required'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full Name" />
        <Input name="email" type="email" placeholder="Your email" />
        <Input
          name="password"
          type="password"
          placeholder="Your secret password"
        />
        <button type="submit">
          {loading ? 'Loading...' : 'Create Acconut'}
        </button>
        <Link to="/">I already have an acconut</Link>
      </Form>
    </>
  );
}
