import React from 'react';
import { useParams } from 'react-router-dom';
import ModalPortal from 'src/components/common/ModalPortal';
import ContainedButton from 'src/components/Config/ContainedButton/ContainedButton';
import { ModalTypes } from 'src/constants/ModalTypes';
import useItems from 'src/hooks/Config/useItems';
import styled from 'styled-components';

const Wrapper = styled.section.attrs({
  'data-name': 'ProjectContainer',
})`
  padding-top: 16px;
`;

const NoContent = styled.h4`
  ${({ theme }) => theme.typography.headline3};
  text-align: center;
`;

const Title = styled.h5`
  ${({ theme }) => theme.typography.headline5};
  flex: 1;
  text-align: left;
`;

const Caption = styled.caption`
  ${({ theme }) => theme.typography.body2};
  margin-bottom: 12px;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;

  .btn-group {
    button + button {
      margin: 0 8px;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 2px solid black;

  tr {
    height: 50px;
  }
  th {
    text-align: left;
  }

  .button {
    width: 30px;
    flex-shrink: 0;
  }
`;

const TableBody = styled.tbody``;

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

type ProjectListProps = {
  projectId: string;
};

type ItemPopupProps = {
  property?: string;
  value?: string;
  isEdit?: boolean;
  onSubmit: (form: { [key: string]: any }) => void;
};

function ItemPopup(props: ItemPopupProps) {
  const [form, setForm] = React.useState({
    key: props.property || '',
    value: props.value || '',
  });

  const { key, value } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm({ ...form, [e.target.name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(form);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <label htmlFor="key">Key</label>
        <input type="text" name="key" value={key} onChange={onChange} />
      </Row>
      <Row>
        <label htmlFor="value">value</label>
        <input type="text" name="value" value={value} onChange={onChange} />
      </Row>
      <Row>
        <ContainedButton>{props.isEdit ? '수정' : '추가'}</ContainedButton>
      </Row>
    </Form>
  );
}

const ProjectList: React.FC<ProjectListProps> = ({ projectId }) => {
  const [currentItem, setCurrentItem] = React.useState({
    key: '',
    value: '',
  });
  const {
    isLoading,
    data: { project, items },
    addItem,
    updateItem,
    deleteItem,
  } = useItems(projectId);
  const [modalKey, setModalKey] = React.useState('');

  const addItemSubmit = (form: { [key: string]: any }) => {
    const { key, value } = form as { key: string; value: string };

    if (!key || !value) {
      return;
    }

    addItem.mutate({
      key,
      value,
      projectId,
    });

    setModalKey('');
  };

  const updateItemSubmit = (form: { [key: string]: any }) => {
    const { key, value } = form as { key: string; value: string };

    if (!key || !value) {
      return;
    }

    updateItem.mutate({
      key,
      value,
      projectId,
      previousKey: currentItem.key,
    });

    setModalKey('');
  };

  const Modal = () => {
    switch (modalKey) {
      case ModalTypes.ADD_ITEM:
        return <ItemPopup onSubmit={addItemSubmit} />;
      case ModalTypes.ADD_MULTILINE_ITEM:
        return <Form></Form>;
      case ModalTypes.UPDATE_ITEM:
        return (
          <ItemPopup
            onSubmit={updateItemSubmit}
            isEdit={true}
            {...currentItem}
            property={currentItem.key}
          />
        );
      case ModalTypes.DELETE_ITEM:
        return (
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();

              deleteItem.mutate(currentItem.key);
              setModalKey('');
            }}
          >
            <p>정말로 삭제하시겠습니까?</p>
            <ContainedButton>삭제</ContainedButton>
          </Form>
        );
      default:
        return null;
    }
  };

  return isLoading && !!project ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <ProjectHeader>
        <Title>{project.projectId} Properties</Title>
        <div className="btn-group">
          <ContainedButton onClick={() => setModalKey(ModalTypes.ADD_ITEM)}>
            Item 추가
          </ContainedButton>
          <ContainedButton onClick={() => setModalKey(ModalTypes.ADD_MULTILINE_ITEM)}>
            Multi-Line Item 추가
          </ContainedButton>
        </div>
      </ProjectHeader>
      <Table>
        <Caption>{project.description}</Caption>
        <TableHead>
          <tr>
            <th scope="col">키</th>
            <th scope="col">값</th>
            <th scope="col" className="button">
              제거
            </th>
          </tr>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <tr
                  key={item.key}
                  onClick={() => {
                    console.log(item);
                    setCurrentItem(item);
                    setModalKey(ModalTypes.UPDATE_ITEM);
                  }}
                >
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentItem(item);
                      setModalKey(ModalTypes.DELETE_ITEM);
                    }}
                  >
                    X
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Properties</td>
            </tr>
          )}
        </TableBody>
      </Table>
      {Modal() && <ModalPortal onClose={() => setModalKey('')}>{Modal() || ''}</ModalPortal>}
    </React.Fragment>
  );
};

/** Project Container */
const ProjectContainer = () => {
  const params = useParams();

  return (
    <Wrapper>
      {!params.projectId ? (
        <NoContent>Select Your Application</NoContent>
      ) : (
        <ProjectList projectId={params.projectId}></ProjectList>
      )}
    </Wrapper>
  );
};

export default React.memo(ProjectContainer);
