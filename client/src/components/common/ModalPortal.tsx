import React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
// import { IoCloseOutline } from 'react-icons/';

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 650px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};

  svg {
    cursor: pointer;
    margin-left: auto;
  }
`;

const Title = styled.div``;

const ContentBody = styled.div`
  padding: 16px;
`;

type ModalPortalProps = {
  children: React.ReactElement[] | React.ReactNode;
  onClose: () => void;
};

const ModalPortal: React.FC<ModalPortalProps> = ({ children, onClose }) => {
  return createPortal(
    <Dimmed>
      <Content>
        <ContentHeader>
          <AiOutlineClose size={24} onClick={onClose} />
        </ContentHeader>
        <ContentBody>{children}</ContentBody>
      </Content>
    </Dimmed>,
    document.getElementById('modal') as HTMLElement
  );
};

export default React.memo(ModalPortal);
