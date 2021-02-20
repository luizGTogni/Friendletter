import React, { useCallback, useRef } from 'react';
import { FiUser, FiLock, FiMail, FiSmile } from 'react-icons/fi';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, FilterBG } from './styles';

interface FormData {
  email: string;
  password: string;
}

const SignUpP2: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SubmitHandler<FormData>) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Friendletter" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Crie sua conta gratuita agora</h1>

          <Input name="name" icon={FiUser} placeholder="Nome Completo" />
          <Input name="username" icon={FiSmile} placeholder="Username" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="signin">
          Já tem uma conta?
          <strong> Entrar</strong>
        </Link>
      </Content>

      <Background>
        <FilterBG />
      </Background>
    </Container>
  );
};

export default SignUpP2;
