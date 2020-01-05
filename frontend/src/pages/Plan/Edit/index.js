import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import {
  Container,
  Content,
  Header,
  HeaderRight,
  ButtonHaderBack,
  ButtonHaderSave,
} from './styles';

import api from '~/services/api';

export default function NewPlan() {
  const [plan, setPlan] = useState([]);
  const { planId } = useParams();
  const [variablesCalc, setVariablesCalc] = useState([]);
  const [calc, setCalc] = useState([]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${planId}`);
      setPlan(response.data);

      if (!variablesCalc.duration || !variablesCalc.price) {
        setVariablesCalc({
          duration: response.data.duration,
          price: response.data.price,
        });
      }
      const result = formatPrice(variablesCalc.duration * variablesCalc.price);
      setCalc({
        result,
      });
    }
    loadPlan();
  }, [planId, variablesCalc.duration, variablesCalc.price]);

  async function handleSubmit(data) {
    const { title, duration, price } = data;

    try {
      await api.put(`plans/${planId}`, {
        title,
        duration,
        price,
      });
      toast.success('Dados editados com sucesso!');
    } catch (err) {
      toast.error('Não foi possivel editar os dados');
    }
  }

  function handleBack() {
    history.push('/plan');
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
            <ButtonHaderSave form="editPlan" type="submit">
              <MdCheck fontSize={20} color="#fff" />
              Salvar
            </ButtonHaderSave>
          </HeaderRight>
        </Header>
        <Form initialData={plan} onSubmit={handleSubmit} id="editPlan">
          <div className="grid-1">
            <div className="item">
              <Input label="NOME DO PLANO" name="title" />
            </div>
          </div>
          <div className="grid-3">
            <div className="item">
              <Input
                label="DURAÇÃO"
                name="duration"
                onChange={e =>
                  setVariablesCalc({
                    ...variablesCalc,
                    duration: e.target.value,
                  })
                }
              />
            </div>
            <div className="item">
              <Input
                label="PREÇO"
                name="price"
                onChange={e =>
                  setVariablesCalc({ ...variablesCalc, price: e.target.value })
                }
              />
            </div>
            <div className="item">
              <Input
                label="PREÇO TOTAL"
                name="total"
                value={calc.result}
                readOnly
                disabled
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
