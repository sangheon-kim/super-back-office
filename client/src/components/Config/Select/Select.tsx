import React from 'react';
import { Dropdown } from 'src/components/Headless/Dropdown';
import styles from './Select.module.scss';

interface Option {
  label: string;
  value: string;
  [key: string]: any;
}

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Array<Option>;
  trigger: React.ReactElement[] | React.ReactNode;
};

const Select: React.FC<SelectProps> = (props) => {
  const { value, onChange, options, trigger } = props;

  return (
    <Dropdown value={value} onChange={onChange}>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu className={styles.list}>
        {options.map((option) => {
          return (
            <Dropdown.Item value={option.value} key={option.value} className={styles.item}>
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
  onChange: () => {},
  options: [],
  trigger: React.createElement('div'),
};

export default React.memo(Select);
