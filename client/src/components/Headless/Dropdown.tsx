import React from 'react';
import { useParams } from 'react-router-dom';

interface IDropdownContext {
  value: string;
  onClick: (e: React.MouseEvent) => void;
  active: boolean;
  setActive: (active: boolean) => void;
}

const DropdownContext = React.createContext<IDropdownContext>({
  value: '',
  onClick: (e: React.MouseEvent) => null,
  active: false,
  setActive: (_: boolean) => null,
});

interface DropdownProps {
  value: string;
  className?: string;
  onClick: (e: React.MouseEvent) => void;
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
  const { children, value, onClick, className } = props;
  const [active, setActive] = React.useState(false);
  const params = useParams();

  React.useEffect(() => {
    setActive(false);
  }, [params]);

  const contextValue = React.useMemo(
    () => ({ value, onClick, active, setActive }),
    [value, onClick, active]
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </DropdownContext.Provider>
  );
};

const Trigger: React.FC<TriggerProps> = (props) => {
  const { setActive, active } = useDropdown();

  const element = React.cloneElement(props.as as React.ReactElement, {
    active,
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
  const { onClick, setActive } = useDropdown();
  const { children, ...rest } = props;

  return (
    <li
      onClick={(e) => {
        onClick(e);
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
