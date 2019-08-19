import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/M.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispacth = useDispatch();

  function handleSignOut() {
    dispacth(signOut());
  }

  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Meetapp" />
          </Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">My Profile</Link>
            </div>
            <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={profile.name}
            />
          </Profile>
          <button type="button" onClick={handleSignOut}>
            Logout
          </button>
        </aside>
      </Content>
    </Container>
  );
}
