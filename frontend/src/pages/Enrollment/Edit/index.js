import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import history from '~/services/history';
import {
  formatDate,
  formatPrice,
  parseDate,
  advencedFormatDate,
  yearSimpleFormatDate,
} from '~/util/format';

import {
  Container,
  Content,
  Header,
  HeaderRight,
  ButtonHaderBack,
  ButtonHaderSave,
} from './styles';

import api from '~/services/api';
import 'react-datepicker/dist/react-datepicker.css';

export default function NewEnrollment() {
  const [enrollment, setEnrollment] = useState([]);
  const { enrollmentId } = useParams();
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [calculate, setCalculate] = useState([]);

  useEffect(() => {
    async function loadEnrollment() {
      const responseStudent = await api.get('students');
      const newSelectStudents = responseStudent.data.map(element => ({
        value: element.id,
        label: element.name,
      }));
      setStudents(newSelectStudents);

      const responsePlan = await api.get('plans');
      const newSelectPlan = responsePlan.data.map(element => ({
        value: element.id,
        label: element.title,
        duration: element.duration,
        price: element.price,
      }));
      setPlans(newSelectPlan);

      const response = await api.get(`enrollments/${enrollmentId}`);

      const { data } = response;

      const student = newSelectStudents.find(
        element => element.value === Number(data.student_id)
      );

      const plan = newSelectPlan.find(
        element => element.value === Number(data.plan_id)
      );

      const newData = {
        ...data,
        startDateFormated: parseDate(data.start_date),
        endDateFormated: formatDate(data.end_date),
        priceFormated: formatPrice(data.price),
        student_value: student.value,
        student_label: student.label,
        plan_value: plan.value,
        plan_label: plan.label,
      };

      setEnrollment(newData);

      setCalculate({
        end_date: formatDate(data.end_date),
        price: formatPrice(data.price),
      });
    }
    loadEnrollment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCalculate(start_date, id) {
    const plan = plans.find(element => element.value === Number(id));
    const end_date = addMonths(start_date, plan.duration);
    const price = formatPrice(plan.duration * plan.price);
    setCalculate({ end_date: advencedFormatDate(end_date), price });
  }

  async function handleSubmit(student, plan, startDateFormated) {
    const plan_id = Number(plan);
    const student_id = Number(student);

    const start_date = `${startDateFormated}T12:00:00-03:00`;

    try {
      await api.put(`enrollments/${enrollmentId}`, {
        student_id,
        plan_id,
        start_date,
      });
      toast.success('Dados editados com sucesso!');
    } catch (err) {
      toast.error('Não foi possivel editar os dados');
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(
      e.target.student.value,
      e.target.plan.value,
      e.target.startDateFormated.value
    );
  };

  function handleBack() {
    history.push('/enrollment');
  }

  function filterStudents(inputValue) {
    if (inputValue) {
      return students.filter(student =>
        String(student.label)
          .toLowerCase()
          .includes(String(inputValue).toLowerCase())
      );
    }
    return students;
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterStudents(inputValue));
    }, 10);
  };

  function filterPlans(inputValue) {
    if (inputValue) {
      return plans.filter(plan =>
        String(plan.label)
          .toLowerCase()
          .includes(String(inputValue).toLowerCase())
      );
    }
    return plans;
  }

  const loadOptionsPlans = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterPlans(inputValue));
    }, 10);
  };

  function handleInputChange(newValue) {
    const inputValue = newValue.replace(/\W/g, '');
    return inputValue;
  }

  return enrollment.student_label && enrollment.student_value ? (
    <Container>
      <Content>
        <Header>
          <h1>Edição de aluno</h1>
          <HeaderRight>
            <ButtonHaderBack onClick={handleBack} type="button">
              <MdKeyboardArrowLeft fontSize={20} color="#fff" />
              Voltar
            </ButtonHaderBack>
            <ButtonHaderSave form="editEnrollment" type="submit">
              <MdCheck fontSize={20} color="#fff" />
              Salvar
            </ButtonHaderSave>
          </HeaderRight>
        </Header>
        <form onSubmit={onSubmit} id="editEnrollment">
          <div className="grid-1">
            <div className="item async-select">
              <label htmlFor="start_date">ALUNO</label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={students}
                defaultValue={{
                  label: enrollment.student_label,
                  value: enrollment.student_value,
                }}
                onInputChange={handleInputChange}
                name="student"
                placeholder="Selecione o Aluno"
              />
            </div>
          </div>
          <div className="grid-3">
            <div className="item async-select">
              <label htmlFor="start_date">PLANO</label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptionsPlans}
                defaultOptions={plans}
                defaultValue={{
                  label: enrollment.plan_label,
                  value: enrollment.plan_value,
                }}
                onChange={e => {
                  setEnrollment({ ...enrollment, plan_id: e.value });
                  handleCalculate(enrollment.startDateFormated, e.value);
                }}
                name="plan"
                placeholder="Selecione o Aluno"
              />
            </div>
            <div className="item">
              <label htmlFor="start_date">DATA DE INÍCIO</label>
              <DatePicker
                name="startDateFormated"
                dateFormat="yyyy-MM-dd"
                selected={enrollment.startDateFormated}
                onChange={date => {
                  setEnrollment({
                    ...enrollment,
                    startDateFormated: date,
                  });
                  handleCalculate(date, enrollment.plan_id);
                }}
              />
            </div>
            <div className="item">
              <Input
                label="DATA DE TÉRMINO"
                name="endDateFormated"
                value={calculate.end_date}
                disabled
                readOnly
              />
            </div>
            <div className="item">
              <Input
                label="VALOR FINAL"
                name="priceFormated"
                value={calculate.price}
                disabled
                readOnly
              />
            </div>
          </div>
        </form>
      </Content>
    </Container>
  ) : (
    'Carregando'
  );
}
