import React from 'react';

interface IButtonContext {}

const ButtonContext = React.createContext<IButtonContext>({});

interface IButtonProps {
  children: React.ReactElement[] | React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  [key: string]: any;
}

const useButton = (): IButtonContext => {
  const context = React.useContext(ButtonContext);

  if (!context) {
    throw new Error('This component must be used within a <Dropdown> component.');
  }

  return context;
};

interface IButtonComposition {}

const Button: React.FC<IButtonProps> & IButtonComposition = (props) => {
  const {} = useButton();
  const { children, css, onClick, ...rest } = props;

  const contextValue = React.useMemo(() => ({}), []);

  return (
    <ButtonContext.Provider value={contextValue}>
      <button onClick={onClick} {...rest}>
        {children}
      </button>
    </ButtonContext.Provider>
  );
};

export { Button };
