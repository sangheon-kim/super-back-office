import React from 'react';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'JoinContainer',
})``;

/** 회원가입 */
const JoinContainer = () => {
  return <Container>회원가입</Container>;
};

export default React.memo(JoinContainer);
