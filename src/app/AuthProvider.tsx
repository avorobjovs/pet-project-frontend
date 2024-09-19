import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import { executeFetch } from "./networkUtils";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

interface IAuthState {
  token: string;
  refreshToken: string;
  isAuthenticated: boolean;
  user: IUser|null;
};

const defaultAuthState: IAuthState = {
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  user: null
}

interface IAuthResult {
  succeeded: boolean;
  messages: string[];
}

interface IAuthContext extends IAuthState {
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    description: string) => Promise<IAuthResult>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<IAuthResult>;
  logout: () => void;
};

const defaultAuthContext: IAuthContext = {
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  user: null,
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    description: string
  ) => { 
    const delayMs = (firstName + lastName + email + password + confirmPassword + description).length;
    const delayPromise = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delayPromise(delayMs);
    const result: IAuthResult = {
      succeeded: false,
      messages: []
    };
    return result;
  },
  login: async (email: string, password: string, rememberMe: boolean) => { 
    const delayMs = (email + password + rememberMe.toString()).length;
    const delayPromise = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delayPromise(delayMs);
    const result: IAuthResult = {
      succeeded: false,
      messages: []
    };
    return result;
  },
  logout: () => {}
}

const JWT_TOKEN_COOKIE = 'pet-project-jwt-token';
const REFRESH_TOKEN_COOKIE = 'pet-project-refresh-token';

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<IAuthState>(defaultAuthState);
  const [cookies, setCookie, removeCookie] = useCookies();

  const storedJwtToken: string|null|undefined = cookies[JWT_TOKEN_COOKIE];
  if (storedJwtToken) {
    const storedRefreshToken: string = cookies[REFRESH_TOKEN_COOKIE];
    const newAuthState: IAuthState = {
      token: storedJwtToken,
      refreshToken: storedRefreshToken,
      isAuthenticated: true,
      user: parseUserFromToken(storedJwtToken)
    };
    setAuthState(newAuthState);
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    description: string
  ): Promise<IAuthResult> => {
    const registerUrl = `${import.meta.env.VITE_API_BASE_URL}Account/register`;
    const request = new Request(registerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, confirmPassword, description })
    });
    const fetchResult = await executeFetch(request);
  
    const result: IAuthResult = {
      succeeded: fetchResult.succeeded,
      messages: fetchResult.messages
    };
    return result;
  }

  const login = async (email: string, password: string, rememberMe: boolean): Promise<IAuthResult> => {
    const result: IAuthResult = {
      succeeded: false,
      messages: []
    };

    removeCookie(JWT_TOKEN_COOKIE);
    removeCookie(REFRESH_TOKEN_COOKIE);

    const loginUrl = `${import.meta.env.VITE_API_BASE_URL}Account/authenticate`;
    const request = new Request(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const fetchResult = await executeFetch(request);

    if (fetchResult.succeeded) {
      const newAuthState: IAuthState = {
        token: fetchResult.data.jwToken,
        refreshToken: fetchResult.data.refreshToken,
        isAuthenticated: true,
        user: parseUserFromToken(fetchResult.data.jwToken)
      };
      setAuthState(newAuthState);

      if (rememberMe) {
        setCookie(JWT_TOKEN_COOKIE, fetchResult.data.jwToken);
        setCookie(REFRESH_TOKEN_COOKIE, fetchResult.data.refreshToken);
      }

      result.succeeded = true;
    }

    else {
      setAuthState(defaultAuthState);
      result.messages = fetchResult.messages;
    }
    
    return result;
  };

  const logout = () => {
    removeCookie(JWT_TOKEN_COOKIE);
    removeCookie(REFRESH_TOKEN_COOKIE);
    setAuthState(defaultAuthState);
  };

  // Memoized value of the authentication context
  const contextValue = useMemo<IAuthContext>(
    () => ({
      token: authState.token,
      refreshToken: authState.refreshToken,
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      register,
      login,
      logout
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const parseUserFromToken = (token: string): IUser => {
  const decoded: any = jwtDecode(token);

  const roles: string[] = [];
  if (decoded.roles) {
    roles.push(decoded.roles);
  }

  const user: IUser = {
    id: decoded.uid,
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    email: decoded.email,
    roles
  };
  return user;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;