import React, { useCallback, useRef } from 'react';
import { FiUser, FiLock, FiMail, FiSmile } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { main } from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container, Content, Background, FilterBG } from './styles';

interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  repassword: string;
}

interface CheckUniqueData {
  username: boolean;
  email: boolean;
}

function SignUpP1(): JSX.Element {
  const formRef = useRef<FormHandles>(null);

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
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await main.post('users/fieldAlreadyExists', {
          username: data.username,
          email: data.email,
        });

        const FieldAlreadyExists: CheckUniqueData = response.data;

        if (FieldAlreadyExists.username) {
          formRef.current?.setErrors({
            username: 'Username já existe, tente outro',
          });

          return;
        }

        if (FieldAlreadyExists.email) {
          formRef.current?.setErrors({
            email: 'E-mail já existe, tente outro',
          });

          return;
        }

        history.push({
          pathname: '/signup-continuation',
          state: data,
        });
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
    [addToast, history],
  );

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

          <Button type="submit">Continuar</Button>
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
