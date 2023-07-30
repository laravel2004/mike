import React, {createContext, useContext, useReducer} from "react";
import { initialState, Reducer } from "../reducer/reducer";

export const RootContext = createContext();

export const Context = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const data = {state, dispatch};
  return(
    <RootContext.Provider value={data}>
      {props.children}
    </RootContext.Provider>
  )
}

export const useRootContext = () => {
  return useContext(RootContext)
}