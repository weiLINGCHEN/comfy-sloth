import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [theUser, setTheUser] = useState(null);
  useEffect(() => {
    setTheUser(user);
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        user,

        theUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
