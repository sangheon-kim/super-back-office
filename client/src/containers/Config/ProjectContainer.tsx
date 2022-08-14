import React from 'react';
import { useParams } from 'react-router-dom';
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
`;

const Caption = styled.caption`
  ${({ theme }) => theme.typography.body2};
  margin-bottom: 12px;
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

type ProjectListProps = {
  projectId: string;
};

const ProjectList: React.FC<ProjectListProps> = ({ projectId }) => {
  const {
    isLoading,
    data: { project, items },
  } = useItems(projectId);

  return isLoading && !!project ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <Title>{project.projectId} Properties</Title>
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
                <tr key={item.key}>
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                  <td>X</td>
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
