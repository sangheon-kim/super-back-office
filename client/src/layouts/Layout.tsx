import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Tabs } from 'src/components/Tabs/Tabs';
import { SearchProvider } from 'src/contexts/SearchContext';
import Search from 'src/components/common/Search';
import Caption from 'src/components/common/ListTitle';
import Profile from 'src/components/Profile/Profile';

import { BiLogOut } from 'react-icons/bi';

const LayoutWrapper = styled.main.attrs({
  'data-name': 'Layout',
})`
  display: flex;
  height: 100%;
`;

const SearchWrapper = styled.div`
  margin: 16px 0;
  padding-right: 16px;
`;

const GNB = styled.nav.attrs({})`
  display: flex;
  flex-direction: column;
  width: 200px;
  max-height: 100%;
  background-color: ${({ theme }) => theme.color.bg100};
  padding-left: 16px;
  padding-bottom: 24px;
`;

const Logo = styled.div`
  width: 100%;
  height: 75px;
  flex-shrink: 0;
  text-align: center;
  color: ${({ theme }) => theme.color.gray600};
  ${({ theme }) => theme.typography.headline4};
  line-height: 75px;
  padding-right: 16px;
`;

const LNB = styled.nav`
  flex: 1;
  overflow: overlay;
  margin-right: 4px;
  margin-bottom: 16px;
`;

const Content = styled.section``;

const ProfileWrapper = styled.div`
  margin-top: auto;
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.color.gray700};
  margin-top: 24px;
  background-color: ${({ theme }) => theme.color.gray300};
  padding: 8px 8px;
  margin-right: 16px;
  border-radius: 8px;
  text-align: left;

  svg {
    fill: ${({ theme }) => theme.color.gray700};
    margin-right: 16px;
    width: 16px;
    height: 16px;
  }
`;

type Props = {};

const Layout: React.FC<Props> = () => {
  return (
    <LayoutWrapper>
      <GNB>
        <Logo>Logo</Logo>
        <SearchProvider>
          <SearchWrapper>
            <Search />
          </SearchWrapper>
          <Caption>MENU</Caption>
          <LNB>
            <Tabs>
              <Tabs.Tab label="a">Tab A</Tabs.Tab>
              <Tabs.Tab label="b">Tab B</Tabs.Tab>
              <Tabs.Tab label="c">Tab C</Tabs.Tab>
            </Tabs>
          </LNB>
        </SearchProvider>
        <ProfileWrapper>
          <Caption>PROFILE</Caption>
          <Profile />
        </ProfileWrapper>
        <LogoutBtn>
          <BiLogOut fill="" />
          Log out
        </LogoutBtn>
      </GNB>
      <Outlet />
    </LayoutWrapper>
  );
};

export default React.memo(Layout);
