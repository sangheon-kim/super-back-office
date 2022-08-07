import React from 'react';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'LoginContainer',
})``;

/** 로그인 */
const LoginContainer = () => {
  return <Container>로그인</Container>;
};

export default React.memo(LoginContainer);
