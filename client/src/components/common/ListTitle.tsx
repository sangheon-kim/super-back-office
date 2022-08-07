import React from 'react';
import styled from 'styled-components';

const Caption = styled.p`
  color: ${({ theme }) => theme.color.gray400};
  ${({ theme }) => theme.typography.caption2};
  margin-bottom: 16px;
  flex-shrink: 0;
`;

export default React.memo(Caption);
