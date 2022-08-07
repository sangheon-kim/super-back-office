import React from 'react';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'FindPasswordContainer',
})``;

/** 비밀번호 찾기 */
const FindPasswordContainer = () => {
  return <Container>비밀번호 찾기</Container>;
};

export default React.memo(FindPasswordContainer);
