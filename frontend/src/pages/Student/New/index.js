import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import history from '~/services/history';

import {
  Container,
  Content,
  Header,
  HeaderRight,
  ButtonHaderBack,
  ButtonHaderSave,
} from './styles';

import api from '~/services/api';

export default function NewStudent() {
  async function handleSubmit(data) {
    const { name, email, age, height, weight } = data;

    try {
      await api.post(`students/`, {
        name,
        email,
        age,
        height,
        weight,
      });
      toast.success('Aluno Cadastrado com suceso!');
      history.push('/student');
    } catch (err) {
      toast.error('Não foi possivel cadastrar Aluno');
    }
  }

  function handleBack() {
    history.push('/student');
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Cadastro de aluno</h1>
          <HeaderRight>
            <ButtonHaderBack onClick={handleBack} type="button">
              <MdKeyboardArrowLeft fontSize={20} color="#fff" />
              Voltar
            </ButtonHaderBack>
            <ButtonHaderSave form="editStudent" type="submit">
              <MdCheck fontSize={20} color="#fff" />
              Salvar
            </ButtonHaderSave>
          </HeaderRight>
        </Header>
        <Form onSubmit={handleSubmit} id="editStudent">
          <div className="grid-1">
            <div className="item">
              <Input label="NOME COMPLETO" name="name" />
            </div>
            <div className="item">
              <Input label="ENDEREÇO DE E-MAIL" name="email" />
            </div>
          </div>
          <div className="grid-3">
            <div className="item">
              <Input label="IDADE" name="age" />
            </div>
            <div className="item">
              <Input label="ALTURA" name="height" />
            </div>
            <div className="item">
              <Input label="PESO (em kg)" name="weight" />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
