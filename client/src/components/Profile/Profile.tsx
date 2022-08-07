import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  'data-name': 'Profile',
})`
  display: flex;
  align-items: center;
  padding-right: 16px;
`;

const Thumbnail = styled.div<{ url: string }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray400};
  margin-right: 16px;
`;

const Info = styled.div``;

const Name = styled.div`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray900};
`;

const Description = styled.div`
  ${({ theme }) => theme.typography.caption2};
  color: ${({ theme }) => theme.color.gray600};
  margin-top: 4px;
`;

const Profile = () => {
  return (
    <Wrapper>
      <Thumbnail url={''} />
      <Info>
        <Name>Young Bin</Name>
        <Description>Business Developer</Description>
      </Info>
    </Wrapper>
  );
};

export default React.memo(Profile);
