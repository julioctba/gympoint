import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdCheckCircle, MdAdd, MdLoop } from 'react-icons/md';
import { formatDate } from '~/util/format';
import history from '~/services/history';
import {
  Container,
  Content,
  HeaderRight,
  ButtonHader,
  Header,
  DivTable,
  ContentTable,
  Button,
  Actived,
} from './styles';

import api from '~/services/api';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  function getNamePlan(id, objectPlan) {
    const plan = objectPlan.find(element => Number(element.id) === Number(id));

    return plan ? plan.title : 'Sem Plano';
  }

  function getNameStudent(id, objectStudent) {
    const student = objectStudent.find(element => element.id === Number(id));
    return student ? student.name : '';
  }

  async function loadEnrollments() {
    const responseStudent = await api.get('students');

    const responsePlan = await api.get('plans');

    const response = await api.get('enrollments');

    const responseEnrrolment = response.data.map(enrollment => ({
      ...enrollment,
      formatedStartDate: formatDate(enrollment.start_date),
      formatedEndDate: formatDate(enrollment.end_date),
      student: getNameStudent(enrollment.student_id, responseStudent.data),
      plan: getNamePlan(enrollment.plan_id, responsePlan.data),
    }));

    setEnrollments(responseEnrrolment);
  }

  useEffect(() => {
    loadEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDeleteStudent(id) {
    const confirm = window.confirm('Deseja realmente excluir a matricula?');

    if (confirm) {
      try {
        await api.delete(`enrollments/${id}`);
        loadEnrollments();
        toast.sucess('O matricula foi deletada com sucesso!');
      } catch (err) {
        toast.error('Não foi possivel deletar a matricula');
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Gerenciando matrículas</h1>
          <HeaderRight>
            <ButtonHader
              type="button"
              onClick={() => history.push('/enrollment/new')}
            >
              <MdAdd fontSize={20} /> Cadastrar
            </ButtonHader>
          </HeaderRight>
        </Header>
        <DivTable>
          <ContentTable>
            <thead>
              <tr>
                <td>ALUNO</td>
                <td>PLANO</td>
                <td>INÍCIO</td>
                <td>TÉRMINO</td>
                <td>ATIVA</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {enrollments ? (
                enrollments.map(enrollment => (
                  <tr key={enrollment.id}>
                    <td>{enrollment.student}</td>
                    <td>{enrollment.plan}</td>
                    <td>{enrollment.formatedStartDate}</td>
                    <td>{enrollment.formatedEndDate}</td>
                    <td>
                      <Actived active={enrollment.active}>
                        <MdCheckCircle fontSize={20} />
                      </Actived>
                    </td>
                    <td className="action">
                      <Link
                        to={`/enrollment/edit/${enrollment.id}`}
                        className="edit"
                      >
                        editar
                      </Link>

                      <Button
                        onClick={() => handleDeleteStudent(enrollment.id)}
                        className="delete"
                      >
                        apagar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <MdLoop className="loading-class" size={20} />
              )}
            </tbody>
          </ContentTable>
        </DivTable>
      </Content>
    </Container>
  );
}
