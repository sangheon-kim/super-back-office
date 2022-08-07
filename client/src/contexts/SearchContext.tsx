import React, { Dispatch } from 'react';

const CHANGE_TEXT = 'search/CHANGE_TEXT';

type SearchState = {
  searchText: string;
  menus: IMenu[];
  filterMenus: IMenu[];
};

const changeTextAction = (value: string) => ({ type: CHANGE_TEXT, payload: { value } });

type SearchAction = ReturnType<typeof changeTextAction>;

type SearchDispatch = Dispatch<SearchAction>;

const SearchStateContxt = React.createContext<SearchState | null>(null);
const SearchDispatchContext = React.createContext<SearchDispatch | null>(null);

const initialState: SearchState = {
  searchText: '',
  menus: [],
  filterMenus: [],
};

function reducer(state: SearchState, { type, payload }: SearchAction): SearchState {
  switch (type) {
    case CHANGE_TEXT: {
      if (state.searchText !== payload.value) {
        return {
          ...state,
          searchText: payload.value,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

type Props = {
  children: React.ReactElement | React.ReactNode;
};

export function SearchProvider(props: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <SearchStateContxt.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {props.children}
      </SearchDispatchContext.Provider>
    </SearchStateContxt.Provider>
  );
}

export function useSearchState() {
  const context = React.useContext(SearchStateContxt);

  if (!context) {
    throw new Error('This hook must be used within a <SearchProvider> component.');
  }

  return context;
}

export function useSearchDispatch() {
  const dispatch = React.useContext(SearchDispatchContext);
  if (!dispatch) {
    throw new Error('This hook must be used within a <SearchProvider> component.');
  }

  const changeText = (value: string) => dispatch(changeTextAction(value));

  return { changeText };
}
