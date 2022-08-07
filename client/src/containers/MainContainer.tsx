import React from 'react';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'MainContainer',
})``;

type Props = {
  children?: React.ReactNode | React.ReactElement[];
};

export const MainContainer: React.FC<Props> = () => {
  return (
    <Container>
      <p>MainContainer</p>
    </Container>
  );
};

export default React.memo(MainContainer);
