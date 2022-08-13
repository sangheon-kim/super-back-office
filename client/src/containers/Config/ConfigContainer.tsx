import React from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import ContainedButton from 'src/components/Config/ContainedButton/ContainedButton';
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

const ApplicationRow = styled.div`
  display: flex;
  margin: 16px 0;

  .btn-group {
    display: flex;
    margin-left: 16px;

    button + button {
      margin: 0 8px;
    }
  }
`;

type Props = {
  children?: React.ReactNode | React.ReactElement[];
};

export const ConfigContainer: React.FC<Props> = () => {
  const params = useParams();
  const { projects, isLoading } = useProjects();
  const navigate = useNavigate();
  const [selected, change] = React.useState(params.projectId || '');

  const item = projects.find((project) => project.value === selected) || {
    label: '',
  };

  React.useEffect(() => {
    change(params.projectId || '');
  }, [params.projectId]);

  return (
    <Container>
      <Header>
        <Title>Configuration Settings</Title>
        <ApplicationRow>
          <Select
            trigger={
              <InputButton selectedValue={isLoading ? '' : item.label || 'select application'} />
            }
            options={projects}
            onClick={(e) => navigate(`/config/${e.currentTarget.id}`)}
            value={selected}
          />
          <div className="btn-group">
            <ContainedButton>App 추가</ContainedButton>
            <ContainedButton>App 삭제</ContainedButton>
          </div>
        </ApplicationRow>
      </Header>
      <Outlet />
    </Container>
  );
};

export default React.memo(ConfigContainer);
