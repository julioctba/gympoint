import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';

import api from '~/services/api';

export default function HelpOrder({ help, loadStudents }) {
  async function handleSubmit(data) {
    const { answer } = data;

    try {
      await api.put(`help-orders/${help.id}/answer`, {
        answer,
      });
      loadStudents();
      toast.success('Resposta enviada com sucesso!');
    } catch (err) {
      toast.error('Não foi possivel enviar resposta');
    }
  }

  return (
    <Container>
      <Content>
        <h2>Pergunta do Aluno</h2>
        <p>{help.question}</p>
        <Form initialData={help} onSubmit={handleSubmit} id="editPlan">
          <div className="grid-1">
            <div className="item">
              <Input label="SUA RESPOSTA" multiline name="answer" />
            </div>
            <button type="submit">Responder aluno</button>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
