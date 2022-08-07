import React from 'react';

interface IDropdownContext {
  value: string;
  onChange: (_: React.MouseEvent<HTMLLIElement>) => void;
  active: boolean;
  setActive: (active: boolean) => void;
}

const DropdownContext = React.createContext<IDropdownContext>({
  value: '',
  onChange: (_: React.MouseEvent<HTMLLIElement>) => null,
  active: false,
  setActive: (_: boolean) => null,
});

interface DropdownProps {
  value: string;
  onChange: (e: React.MouseEvent<HTMLLIElement>) => null;
  children: React.ReactElement[] | React.ReactNode;
}

interface TriggerProps {
  as: React.ReactElement[] | React.ReactNode;
}

interface MenuProps {
  children: React.ReactElement[] | React.ReactNode;
}

interface ItemProps {
  value: string;
  children: React.ReactElement[] | React.ReactNode;
}

interface DropdownComposition {
  Trigger: React.FC<TriggerProps>;
  Menu: React.FC<MenuProps>;
  Item: React.FC<ItemProps>;
}

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
  const { as } = props;

  return <React.Fragment>{as}</React.Fragment>;
};

const Menu: React.FC<MenuProps> = (props) => {
  const { active } = useDropdown();
  return active ? <ul className="menu">{props.children}</ul> : <React.Fragment></React.Fragment>;
};

const Item: React.FC<ItemProps> = (props) => {
  const { onChange } = useDropdown();
  return (
    <li className="item" onClick={onChange}>
      {props.children}
    </li>
  );
};

const useDropdown = (): IDropdownContext => {
  const context = React.useContext(DropdownContext);

  if (!context) {
    throw new Error('This component must be used within a <Dropdown> component.');
  }

  return context;
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export { Dropdown };
