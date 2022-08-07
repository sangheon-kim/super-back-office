import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const LayoutWrapper = styled.main.attrs({
  'data-name': 'AuthLayout',
})``;

type Props = {};

const AuthLayout: React.FC<Props> = () => {
  return (
    <LayoutWrapper>
      Auth
      <Outlet />
    </LayoutWrapper>
  );
};

export default React.memo(AuthLayout);
