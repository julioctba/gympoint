import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
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
  const [student, setStudent] = useState([]);
  const { studentId } = useParams();

  async function loadStudent(studentId) {
    const response = await api.get(`students/${studentId}`);
    setStudent(response.data);
  }

  useEffect(() => {
    loadStudent(studentId);
  }, [studentId]);

  async function handleSubmit(data) {
    const { name, email, age, height, weight } = data;

    try {
      await api.put(`students/${studentId}`, {
        name,
        email,
        age,
        height,
        weight,
      });
      toast.success('Dados editados com sucesso!');
      loadStudent(studentId);
    } catch (err) {
      toast.error('Não foi possivel editar os dados');
    }
  }

  function handleBack() {
    history.push('/student');
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Edição de aluno</h1>
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
        <Form initialData={student} onSubmit={handleSubmit} id="editStudent">
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
