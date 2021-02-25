import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiUser, FiLock, FiMail, FiSmile } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import { main } from '../../services/api';

import { getCountries } from '../../utils/getCountries';
import { getCities } from '../../utils/getCities';
import {
  generateYears,
  generateMonths,
  generateDays,
  getAge,
} from '../../utils/date';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import { useToast } from '../../hooks/toast';

import { Container, Content, Background, FilterBG } from './styles';

interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  repassword: string;
  dayBirth: string;
  monthBirth: string;
  yearBirth: string;
  gender: string;
  country: string;
  city: string;
}

function SignUpP1(): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const [days, setDays] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome obrigatório')
            .min(10, 'Nome precisa ser real'),
          username: Yup.string()
            .required('Username obrigátorio')
            .min(4, 'Muito curto')
            .max(25, 'Muito longo')
            .matches(
              /^[a-zA-Z0-9_.-]*$/,
              'Contém Espaços ou outros caracteres indevidos',
            ),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(8, 'Muito curta, precisa de pelo menos 8 caracteres')
            .oneOf(
              [Yup.ref('repassword'), null],
              'As senhas devem corresponder',
            ),
          repassword: Yup.string()
            .required('Confirmação da senha obrigatória')
            .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder'),
          dayBirth: Yup.string().required(
            'Dia do seu nascimento é obrigatório',
          ),
          monthBirth: Yup.string().required(
            'Mês do seu nascimento é obrigatório',
          ),
          yearBirth: Yup.string().required(
            'Ano do seu nascimento é obrigatório',
          ),
          gender: Yup.string().required('O seu gênero é obrigatório'),
          country: Yup.string().required('O seu país é obrigatório'),
          city: Yup.string().required('A sua cidade é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const ageOfUser = getAge(
          `${data.yearBirth}-${`0${data.monthBirth}`.slice(-2)}-${
            data.dayBirth
          }`,
        );

        console.log(ageOfUser);

        if (ageOfUser < 13) {
          formRef.current?.setErrors({
            dayBirth: 'Precisa ter mais de 13 anos para cadastrar-se',
            monthBirth: 'Precisa ter mais de 13 anos para cadastrar-se',
            yearBirth: 'Precisa ter mais de 13 anos para cadastrar-se',
          });
          throw new Error('Você é menor de 13 anos');
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast],
  );

  const handleSelectChange = useCallback(() => {
    setCities([]);
    const country: string = formRef.current?.getFieldValue('country');
    getCities(country.toLowerCase())
      .then(response => setCities(response))
      .catch(err => formRef.current?.setErrors(err));
  }, []);

  useEffect(() => {
    setDays(generateDays());
    setMonths(generateMonths());
    setYears(generateYears(110));
    getCountries().then(response => setCountries(response));
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Friendletter" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Crie sua conta gratuita agora</h1>

          <Input name="name" icon={FiUser} placeholder="Nome Completo" />
          <Input name="username" icon={FiSmile} placeholder="Username" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />
          <Input
            name="repassword"
            icon={FiLock}
            placeholder="Confirme sua senha"
            type="password"
          />

          <div>
            <Select name="dayBirth" placeholder="Dia">
              {days.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
            <Select name="monthBirth" placeholder="Mês">
              {months.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </Select>
            <Select name="yearBirth" placeholder="Ano">
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
          <Select name="gender" placeholder="Selecione seu sexo">
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </Select>
          <Select
            name="country"
            placeholder="Selecione seu país"
            onChange={handleSelectChange}
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
          <Select name="city" placeholder="Selecione sua cidade">
            {cities.map(city => (
              <option key={`${city}${uuid()}`} value={city}>
                {city}
              </option>
            ))}
          </Select>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          Já tem uma conta?
          <strong> Entrar</strong>
        </Link>
      </Content>

      <Background>
        <FilterBG />
      </Background>
    </Container>
  );
}

export default SignUpP1;
