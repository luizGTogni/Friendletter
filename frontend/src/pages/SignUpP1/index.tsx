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
  name: string;
  username: string;
  email: string;
  password: string;
  repassword: string;
}

const SignUpP1: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SubmitHandler<FormData>) => {
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
            /^[a-z0-9_.-]*$/,
            'Contém Espaços ou outros caracteres indevidos',
          ),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
          .matches(
            /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd@$!%*#?&]{8,}$/,
            'Deve conter 8 caracteres, pelo menos uma maiúscula, uma minúscula e um número',
          )
          .oneOf([Yup.ref('repassword'), null], 'As senhas devem corresponder'),
        repassword: Yup.string()
          .required('Confirmação da senha obrigatória')
          .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder'),
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

export default SignUpP1;
