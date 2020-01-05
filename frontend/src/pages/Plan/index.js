import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import {
  Container,
  Content,
  HeaderRight,
  ButtonHader,
  Header,
  DivTable,
  ContentTable,
  Button,
} from './styles';

import api from '~/services/api';

export default function Plan() {
  const [plans, setPlan] = useState([]);

  async function loadPlan() {
    const response = await api.get('plans');

    setPlan(response.data);
  }

  useEffect(() => {
    loadPlan();
  }, []);

  async function handleDeleteStudent(id) {
    const confirm = window.confirm('Deseja realmente excluir o plano?');

    if (confirm) {
      try {
        await api.delete(`plans/${id}`);
        loadPlan();
        toast.success('O Plano foi deletado com sucesso!');
      } catch (err) {
        toast.error('Não foi possivel deletar o plano');
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Gerenciar planos</h1>
          <HeaderRight>
            <ButtonHader
              type="button"
              onClick={() => history.push('/plan/new')}
            >
              <MdAdd fontSize={20} />
              Cadastrar
            </ButtonHader>
          </HeaderRight>
        </Header>
        <DivTable>
          <ContentTable>
            <thead>
              <tr>
                <td>TÍTULO</td>
                <td>DURAÇÃO</td>
                <td>VALOR p/ MÊS</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.duration}</td>
                  <td>{formatPrice(plan.price)}</td>
                  <td className="action">
                    <Link to={`/plan/edit/${plan.id}`} className="edit">
                      editar
                    </Link>
                    <Button
                      onClick={() => handleDeleteStudent(plan.id)}
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
