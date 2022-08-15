import React from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import ModalPortal from 'src/components/common/ModalPortal';
import ContainedButton from 'src/components/Config/ContainedButton/ContainedButton';
import InputButton from 'src/components/Config/InputButton/InputButton';
import Select from 'src/components/Config/Select/Select';
import { ModalTypes } from 'src/constants/ModalTypes';
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
    align-items: center;
    margin-left: 16px;

    button + button {
      margin: 0 8px;
    }
  }
`;

const Form = styled.form``;

const Row = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  label {
    margin-right: 8px;
    flex: 1;
  }

  input {
    border: 2px solid;
    border-color: ${({ theme }) => theme.color.gray200};
    ${({ theme }) => theme.typography.body2};
    border-radius: 8px;
    padding: 4px 8px;
    flex: 2;

    &:focus,
    &:active {
      border-color: ${({ theme }) => theme.color.blue};
    }
  }

  button {
    margin-left: auto;
  }
`;

type Props = {
  children?: React.ReactNode | React.ReactElement[];
};

export const ConfigContainer: React.FC<Props> = () => {
  const [modalKey, setModalKey] = React.useState('');
  const ProjectId = React.createRef<HTMLInputElement>();
  const Description = React.createRef<HTMLInputElement>();
  const params = useParams();
  const { projects, isLoading, addProject, deleteProject } = useProjects();
  const navigate = useNavigate();
  const [selected, change] = React.useState(params.projectId || '');

  const item = projects.find((project) => project.value === selected) || {
    label: '',
  };

  React.useEffect(() => {
    change(params.projectId || '');
  }, [params.projectId]);

  const Modal = (() => {
    switch (modalKey) {
      case ModalTypes.ADD_PROJECT:
        return (
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              if (!ProjectId.current || !Description.current) return false;

              addProject.mutate({
                projectId: ProjectId.current.value,
                description: Description.current.value,
              });
              setModalKey('');
            }}
          >
            <Row>
              <label htmlFor="projectId">프로젝트 ID</label>
              <input type="text" name="projectId" ref={ProjectId} />
            </Row>
            <Row>
              <label htmlFor="description">설명</label>
              <input type="text" name="description" ref={Description} />
            </Row>
            <Row>
              <ContainedButton>등록</ContainedButton>
            </Row>
          </Form>
        );
      case ModalTypes.DELETE_PROJECT:
        return (
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              deleteProject.mutate(params.projectId || '');
              setModalKey('');
            }}
          >
            <p>정말로 삭제하시겠습니까?</p>
            <ContainedButton>삭제</ContainedButton>
          </Form>
        );
    }
  })();

  return (
    <React.Fragment>
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
              <ContainedButton onClick={() => setModalKey(ModalTypes.ADD_PROJECT)}>
                App 추가
              </ContainedButton>
              <ContainedButton onClick={() => setModalKey(ModalTypes.DELETE_PROJECT)}>
                App 삭제
              </ContainedButton>
            </div>
          </ApplicationRow>
        </Header>
        <Outlet />
      </Container>
      {modalKey && <ModalPortal onClose={() => setModalKey('')}>{Modal}</ModalPortal>}
    </React.Fragment>
  );
};

export default React.memo(ConfigContainer);
