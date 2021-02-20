import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: transparent;
  border: 4px solid #5ae1c8;
  border-radius: 10px;
  color: #5ae1c8;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 32px;
  padding: 8px;
  transition: color 0.2s, border-color 0.2s;
  width: 100%;

  &:hover {
    border-color: ${shade(0.2, '#5ae1c8')};
    color: ${shade(0.2, '#5ae1c8')};
  }
`;
