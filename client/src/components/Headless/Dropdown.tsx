import React from 'react';

interface IDropdownContext {
  value: string;
  onChange: (value: string) => void;
  active: boolean;
  setActive: (active: boolean) => void;
}

const DropdownContext = React.createContext<IDropdownContext>({
  value: '',
  onChange: (value: string) => null,
  active: false,
  setActive: (_: boolean) => null,
});

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactElement[] | React.ReactNode;
}

interface TriggerProps {
  as: React.ReactElement[] | React.ReactNode;
}

interface MenuProps {
  children: React.ReactElement[] | React.ReactNode;
  [key: string]: any;
}

interface ItemProps {
  value: string;
  children: React.ReactElement[] | React.ReactNode;
  [key: string]: any;
}

interface DropdownComposition {
  Trigger: React.FC<TriggerProps>;
  Menu: React.FC<MenuProps>;
  Item: React.FC<ItemProps>;
}

const useDropdown = (): IDropdownContext => {
  const context = React.useContext(DropdownContext);

  if (!context) {
    throw new Error('This component must be used within a <Dropdown> component.');
  }

  return context;
};

const Dropdown: React.FC<DropdownProps> & DropdownComposition = (props) => {
  const { children, value, onChange } = props;
  const [active, setActive] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({ value, onChange, active, setActive }),
    [value, onChange, active]
  );

  return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
};

const Trigger: React.FC<TriggerProps> = (props) => {
  const { setActive, active } = useDropdown();

  const element = React.cloneElement(props.as as React.ReactElement, {
    onClick: () => {
      setActive(!active);
    },
  });

  return element;
};

const Menu: React.FC<MenuProps> = (props) => {
  const { active } = useDropdown();
  const { children, ...rest } = props;

  return active ? <ul {...rest}>{children}</ul> : <React.Fragment></React.Fragment>;
};

const Item: React.FC<ItemProps> = (props) => {
  const { onChange, setActive } = useDropdown();
  const { children, ...rest } = props;
  return (
    <li
      onClick={() => {
        onChange(props.value);
        setActive(false);
      }}
      {...rest}
    >
      {children}
    </li>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export { Dropdown };
