import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: #fff;
  border-radius: 10px;
  margin-right: 8px;
  margin-bottom: 16px;
  border: 2px solid transparent;
  background: #5ae1c8;

  &:last-child {
    margin-right: 0;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `};

  ${props =>
    props.isFocused &&
    css`
      background: ${shade(0.4, '#5ae1c8')};
    `}

  ${props =>
    props.isFilled &&
    !props.isErrored &&
    css`
      background: ${shade(0.4, '#5ae1c8')};
    `}

  select {
    text-transform: capitalize;
    appearance: none;
    background: inherit;
    border-radius: 10px;
    color: inherit;
    border: 0;
    padding: 10px 0;
    width: 100%;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 8px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
