import React from 'react';
import { Button } from 'src/components/Headless/Button';
import styles from './ContainedButton.module.scss';

type ContainedButtonProps = {
  onClick?: () => void;
  children: React.ReactElement[] | React.ReactNode;
};

const ContainedButton: React.FC<ContainedButtonProps> = (props) => {
  const { onClick, children } = props;

  return (
    <Button
      className={styles.button}
      onClick={(e: React.MouseEvent) => {
        onClick && onClick();
      }}
    >
      {children}
    </Button>
  );
};

ContainedButton.defaultProps = {
  onClick: () => {},
};

export default ContainedButton;
