import React from 'react';
import styled from 'styled-components';

const Container = styled.section.attrs({
  'data-name': 'FindIdContainer',
})``;

/** 아이디 찾기 */
const FindIdContainer = () => {
  return <Container>아이디 찾기</Container>;
};

export default React.memo(FindIdContainer);
