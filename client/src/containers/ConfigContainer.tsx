import React from 'react';
import InputButton from 'src/components/Config/InputButton/InputButton';
import Select from 'src/components/Config/Select/Select';
import useProjects from 'src/hooks/Config/useProjects';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'ConfigContainer',
})`
  padding: 16px;
  width: 100%;
  flex: 1;
`;

const Header = styled.header.attrs({
  'data-name': 'Header',
})`
  border-bottom: 2px solid ${({ theme }) => theme.color.gray300};
  padding-bottom: 8px;
`;

const Title = styled.h5.attrs({
  'data-name': 'Title',
})`
  ${({ theme }) => theme.typography.headline5}
`;

type Props = {
  children?: React.ReactNode | React.ReactElement[];
};

export const ConfigContainer: React.FC<Props> = () => {
  const {} = useProjects();
  return (
    <Container>
      <Header>
        <Title>Configuration Settings</Title>
        <Select trigger={<InputButton selectedValue="선택" />} />
      </Header>
    </Container>
  );
};

export default React.memo(ConfigContainer);
