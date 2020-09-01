import React, { createContext, useReducer, useEffect, useState } from "react";

export const CurrentUserContext = createContext(null);

const initialState = { user: null };

const reducer = (state, { type, payload }) => {
  const newState = { ...state };
  console.log("payload", payload);
  switch (type) {
    case "signUp":
      newState.user = payload;
      return newState;
      break;

    case "login":
      newState.user = payload;
      return newState;
      break;

    case "logout":
      newState.user = null;
      return newState;
      break;

    case "personalInfoUpdate":
      newState.user = payload;
      return newState;
      break;

    default:
      return state;
  }
};
// const guideReducer = (state, {type, payload}) =>{
//   const newState = {...state};
//   console.log("payload",payload);
//    switch (type){
//     case "personalInfoUpdate":
//       newState.user = payload;
//       return newState;
//       break;

//       default:
//         return state;
//    }
// }

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, dispatchCurrentUser] = useReducer(reducer, initialState);
  // const [currentUser, setCurrentUser] = useState(initialState)
  console.log("Hello World");
  console.log(initialState);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, dispatchCurrentUser, initialState }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
