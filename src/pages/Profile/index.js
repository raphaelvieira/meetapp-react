import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispacth = useDispatch();
  const profile = useSelector(state => state.user.profile);
  function handleSubmit(data) {
    dispacth(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Full Name" />
        <Input name="email" type="email" placeholder="Your e-mail adress" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Your Current Password"
        />
        <Input type="password" name="password" placeholder="New Password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your Password"
        />

        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <strong>Update profile</strong>
        </button>
      </Form>
    </Container>
  );
}
