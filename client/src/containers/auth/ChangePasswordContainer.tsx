import React from 'react';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'ChangePasswordCotnainer',
})``;

/** 비밀번호 변경 */
const ChangePasswordCotnainer = () => {
  return <Container>비밀번호 변경</Container>;
};

export default React.memo(ChangePasswordCotnainer);
