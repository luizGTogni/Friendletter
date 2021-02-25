import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastData } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  toasts: ToastData[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastWithTransitions = useTransition(toasts, toast => toast.id, {
    from: { right: '-110%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-110%', opacity: 0 },
  });

  return (
    <Container>
      {toastWithTransitions.map(({ item, key, props }) => (
        <Toast
          key={key}
          style={props}
          hasDescription={!!item.description}
          toast={item}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
