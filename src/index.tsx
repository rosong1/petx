import * as React from "react";

function noop() {}

type TSetStoreState<T> = (nextState: Partial<T>) => void;
export function createStore<T, P extends { children: React.ReactNode }>(
  initState: T
) {
  const Store = React.createContext({
    ...initState,
    setStoreState: noop as TSetStoreState<T>,
  });

  const useStore = () => React.useContext(Store);

  const reducer = (state: T, action: { payload: Partial<T> }): T => {
    return {
      ...state,
      ...action.payload,
    };
  };

  const Provider: React.FC<P> = (props) => {
    const { children, ...restProps } = props;

    const [state, dispatch] = React.useReducer(reducer, {
      ...initState,
    });

    const setStoreState: TSetStoreState<T> = React.useCallback((nextState) => {
      dispatch({ payload: nextState });
    }, []);

    const value: T &
      Omit<P, "children"> & { setStoreState: TSetStoreState<T> } =
      React.useMemo(() => {
        return {
          ...state,
          ...restProps,
          setStoreState,
        };
      }, [state, restProps, setStoreState]);

    return <Store.Provider value={value}>{children}</Store.Provider>;
  };

  return {
    useStore,
    Provider,
  };
}
