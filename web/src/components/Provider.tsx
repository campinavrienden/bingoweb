import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useSnapshot, getVersion } from "valtio";

type ProviderProps = {
  children: ReactNode;
} & Record<string, any>;

const StoreContext = createContext<Record<string, any> | null>(null);

export const Provider = ({ children, ...stores }: ProviderProps) => {
  return (
    <StoreContext.Provider value={stores}>
      {children}
    </StoreContext.Provider>
  );
};

const isValtioProxy = (obj: any) => typeof getVersion(obj) === 'number'

type Keys = string | string[];

export function inject(...keysOrArray: Keys[]) {
  const keys: string[] = Array.isArray(keysOrArray[0])
    ? (keysOrArray[0] as string[])
    : (keysOrArray as string[]);

  return function <P extends Record<string, any>>(
    Component: React.ComponentType<P>
  ): React.FC<Omit<P, typeof keys[number]>> {
    return (props) => {
      const context = useContext(StoreContext);
      if (!context) throw new Error("inject must be used within a <Provider>");

      const injectedProps: Record<string, any> = {};
      for (const key of keys) {
        const value = context[key];
        if (value === undefined) {
          throw new Error(`Store or prop "${key}" not found in Provider`);
        }
        const isProxy: boolean = isValtioProxy(value);
        console.log(`Provider it's '${key}' is ${ !!isProxy ? '' : 'not ' }a proxy object`)
        injectedProps[key] = isProxy ? useSnapshot(value) : value;
      }

      return <Component {...(props as P)} {...(injectedProps as P)} />;
    };
  };
}
