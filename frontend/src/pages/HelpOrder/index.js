import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import HelpOrder from './Answer';

import {
  Container,
  Content,
  Header,
  DivTable,
  ContentTable,
  StatusQuestion,
} from './styles';

import api from '~/services/api';

export default function Students() {
  const [helpOrders, setHelpOrders] = useState([]);

  function getNameStudent(id, objectStudents) {
    const student = objectStudents.find(
      element => Number(element.id) === Number(id)
    );
    return student ? student.name : 'Sem Nome';
  }

  async function loadStudents() {
    const responseStudent = await api.get('students');
    const response = await api.get('help-orders');

    const responseHelpOrder = response.data.map(helpOrder => ({
      ...helpOrder,
      student: getNameStudent(helpOrder.student_id, responseStudent.data),
      answered: !!helpOrder.answer,
    }));

    setHelpOrders(responseHelpOrder);
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <h1>Pedidos de auxílio</h1>
        </Header>
        <DivTable>
          <ContentTable>
            <thead>
              <tr>
                <td>ALUNO</td>
                <td>STATUS</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(helpOrder => (
                <tr key={helpOrder.id}>
                  <td>{helpOrder.student}</td>
                  <StatusQuestion answered={helpOrder.answered}>
                    <span>
                      {helpOrder.answered ? 'Respondido' : 'Não respondido'}
                    </span>
                  </StatusQuestion>
                  <td className="action">
                    <Popup
                      modal
                      trigger={<button className="edit">responder</button>}
                    >
                      <HelpOrder help={helpOrder} loadStudents={loadStudents} />
                    </Popup>
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
