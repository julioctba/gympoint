import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import history from '~/services/history';

import {
  Container,
  Content,
  HeaderRight,
  ButtonHader,
  InputHeader,
  Header,
  DivTable,
  ContentTable,
  Button,
} from './styles';

import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');

  async function loadStudents() {
    if (!query) {
      const response = await api.get('students');
      setStudents(response.data);
    } else {
      const response = await api.get(`students?q=${query}`);
      setStudents(response.data);
    }
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function handleDeleteStudent(id) {
    const confirm = window.confirm('Deseja realmente excluir o aluno?');

    if (confirm) {
      try {
        await api.delete(`students/${id}`);
        loadStudents();
        toast.error('O Aluno foi deletado com sucesso!');
      } catch (err) {
        toast.error('Não foi possivel deletar o aluno');
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Alunos</h1>
          <HeaderRight>
            <ButtonHader
              type="button"
              onClick={() => history.push('/student/new')}
            >
              <MdAdd fontSize={20} />
              Cadastrar
            </ButtonHader>
            <InputHeader onChange={handleInputChange} />
          </HeaderRight>
        </Header>
        <DivTable>
          <ContentTable>
            <thead>
              <tr>
                <td>NOME</td>
                <td>E-MAIL</td>
                <td>IDADE</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td className="action">
                    <Link to={`/student/edit/${student.id}`} className="edit">
                      editar
                    </Link>
                    <Button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="delete"
                    >
                      apagar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ContentTable>
        </DivTable>
      </Content>
    </Container>
  );
}
