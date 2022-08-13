import React from 'react';
import { Dropdown } from 'src/components/Headless/Dropdown';
import styles from './Select.module.scss';

type SelectProps = {
  value: string;
  onClick: (e: React.MouseEvent) => void;
  options: Option[];
  trigger: React.ReactElement[] | React.ReactNode;
};

const Select: React.FC<SelectProps> = (props) => {
  const { value, onClick, options, trigger } = props;

  return (
    <Dropdown value={value} onClick={onClick} className={styles.dropdown}>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu className={styles.list} role="listbox">
        {options.map((option) => {
          return (
            <Dropdown.Item
              id={option.value}
              key={option.value}
              className={styles.item}
              role="option"
              aria-selected={option.value === value ? 'true' : 'false'}
            >
              {option.label}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

Select.defaultProps = {
  value: '',
  options: [],
  trigger: React.createElement('div'),
};

export default React.memo(Select);
