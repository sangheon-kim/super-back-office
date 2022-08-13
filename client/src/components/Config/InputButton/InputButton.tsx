import React from 'react';
import { Button } from 'src/components/Headless/Button';
import styles from './InputButton.module.scss';
import { HiChevronDown } from 'react-icons/hi';

type InputButtonProps = {
  selectedValue: string;
  active?: boolean;
  onClick?: () => void;
};

const InputButton: React.FC<InputButtonProps> = (props) => {
  const { selectedValue, onClick, active } = props;

  return (
    <div
      className={styles.inputButton}
      aria-labelledby="dropdown-button"
      aria-expanded={active ? 'true' : 'false'}
      onClick={(e: React.MouseEvent) => {
        onClick && onClick();
      }}
    >
      <Button className={styles.button}>{selectedValue}</Button>
      <HiChevronDown
        style={{
          transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
        size={24}
      />
    </div>
  );
};

InputButton.defaultProps = {
  onClick: () => {},
};

export default InputButton;
