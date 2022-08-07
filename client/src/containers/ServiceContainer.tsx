import React from 'react';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'ServiceContainer',
})``;

type Props = {
  children?: React.ReactNode | React.ReactElement[];
};

export const ServiceContainer: React.FC<Props> = () => {
  return (
    <Container>
      <p>ServiceContainer</p>
    </Container>
  );
};

export default React.memo(ServiceContainer);
