import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo-header.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <ul>
            <li>
              <img src={logo} alt="GoBarber" />
            </li>
            <li>
              <Link to="/student">Alunos</Link>
            </li>
            <li>
              <Link to="/plan">Planos</Link>
            </li>
            <li>
              <Link to="/enrollment">Matrículas</Link>
            </li>
            <li>
              <Link to="/helporder">Pedidos de Auxílio</Link>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button onClick={handleSignOut}>Sair do sistema</button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
