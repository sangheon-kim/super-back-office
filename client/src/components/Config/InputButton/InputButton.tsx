import React from 'react';
import { Button } from 'src/components/Headless/Button';
import styles from './InputButton.module.scss';

type InputButtonProps = {
  selectedValue: string;
  onClick?: () => void;
};

const InputButton: React.FC<InputButtonProps> = (props) => {
  const { selectedValue, onClick } = props;

  return (
    <div className={styles.inputButton}>
      <Button
        onClick={(e: React.MouseEvent) => {
          onClick && onClick();
        }}
      >
        {selectedValue}
      </Button>
    </div>
  );
};

InputButton.defaultProps = {
  selectedValue: '선택',
  onClick: () => {},
};

export default InputButton;
