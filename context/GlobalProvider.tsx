import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite";
import { getCurrentUser } from "@/lib/appwrite";

interface IContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (arg: boolean) => void;
  user: null | Models.Document;
  setUser: (arg: null | Models.Document) => void;
  isLoading: boolean;
}

const GlobalContext = createContext<IContext>({
  isLoggedIn: false,
  setIsLoggedIn: (arg: boolean) => {},
  user: null,
  setUser: (arg: null | Models.Document) => {},
  isLoading: false,
});
export const useGlobalContext = () => useContext(GlobalContext);

interface IGlobalContext {
  children: ReactNode;
}

const GlobalProvider = ({ children }: IGlobalContext) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<null | Models.Document>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
