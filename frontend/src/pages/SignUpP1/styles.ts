import styled from 'styled-components';
import { shade } from 'polished';

import SignUpBackground from '../../assets/background-sign.jpg';

export const Container = styled.div`
  align-items: stretch;
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  max-width: 800px;
  width: 100%;

  img {
    width: 20rem;
  }

  form {
    margin: 40px 0;
    width: 380px;

    h1 {
      margin-bottom: 24px;
      font-size: 28px;
      text-align: center;
    }

    > div {
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    a {
      margin-top: 16px;
      display: block;
    }
  }

  a {
    color: #71d3c1;
    text-decoration: none;
    transition: color 0.2s;
    margin-bottom: 32px;

    &:hover {
      color: ${shade(0.2, '#71D3C1')};
    }

    span {
      color: #5ad7b6;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignUpBackground}) no-repeat center;
  background-size: cover;
  position: relative;
`;

export const FilterBG = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.8;

  &::after {
    content: '';
    background: #5ad7b6;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
