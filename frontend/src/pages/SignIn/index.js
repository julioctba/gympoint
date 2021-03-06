import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <label>
          Seu E-mail
          <Input name="email" type="email" placeholder="Seu e-mail" />
        </label>
        <label>
          Sua Senha
          <Input name="password" type="password" placeholder="Sua senha" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
