import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface ITabsContext {
  activeTab: string;
  setActiveTab: (label: string) => void;
  [key: string]: any;
}

const TabsContext = React.createContext<ITabsContext>({
  activeTab: '',
  setActiveTab: (label: string) => null,
});

interface ITabsProps {
  children: React.ReactElement[] | React.ReactElement | React.ReactNode;
}

interface ITabProps {
  label: string;
  children: React.ReactElement[] | React.ReactNode;
}

interface IPanelProps {
  label: string;
  children: React.ReactElement[] | React.ReactNode;
}

interface ITabsComposition {
  Tab: React.FC<ITabProps>;
  Panel: React.FC<IPanelProps>;
}

const Tabs: React.FC<ITabsProps> & ITabsComposition = (props) => {
  const [activeTab, setActiveTab] = React.useState('a');
  const { children } = props;

  const params = useParams();

  React.useEffect(() => {
    const { id } = params;

    setActiveTab(id || '');
  }, [params]);

  const value = React.useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);

  return (
    <TabsContext.Provider value={{ ...TabsContext, ...value }}>{children}</TabsContext.Provider>
  );
};

const Tab: React.FC<ITabProps> = (props) => {
  const { label, children } = props;

  return (
    <div className="tab">
      <Link to={label}>{children}</Link>
    </div>
  );
};

const Panel: React.FC<IPanelProps> = (props) => {
  const { label, children } = props;
  const { activeTab } = useTabs();

  return activeTab === label ? <div>{children}</div> : <React.Fragment></React.Fragment>;
};

export const useTabs = (): ITabsContext => {
  const context = React.useContext(TabsContext);
  const { setActiveTab } = context;

  const resetTabs = () => setActiveTab('a');

  if (!context) {
    throw new Error('This component must be used within a <Tabs> component.');
  }

  return Object.assign(context, { resetTabs });
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export { Tabs };
