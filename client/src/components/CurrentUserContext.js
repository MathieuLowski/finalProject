import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext(null);

const initialState = { user: null };

const reducer = (state, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case "signUp":
      newState.user = payload;
      return newState;
      break;

    case "signOut":
      newState.user = payload;
      return newState;
      break;
    default:
      return initialState;
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, dispatchCurrentUser] = useReducer(reducer, initialState);
  // const [currentUser, setCurrentUser] = useState(initialState)

  return (
    <CurrentUserContext.Provider value={{ currentUser, dispatchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
