import React from 'react';
import { useSearchDispatch, useSearchState } from 'src/contexts/SearchContext';
import styled, { useTheme } from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const Wrapper = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray500};
  width: 100%;
  flex-shrink: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  padding: 4px 24px 4px 8px;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray600};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray500};
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 0px;
  border: none;
  display: inline-flex;
  align-items: center;
  text-align: center;
  min-width: 16px;
  min-height: 16px;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Search = () => {
  const Input = React.createRef<HTMLInputElement>();
  const theme = useTheme();
  const { searchText } = useSearchState();
  const { changeText } = useSearchDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!!Input && Input.current) {
      changeText(Input.current.value);
    }
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <StyledInput type="text" ref={Input} placeholder="메뉴 검색" />
      <IconButton>
        <AiOutlineSearch fill={theme.color.gray500} />
      </IconButton>
    </Wrapper>
  );
};

export default React.memo(Search);
