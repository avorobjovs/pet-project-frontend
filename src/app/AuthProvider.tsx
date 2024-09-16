import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";

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

interface ILoginResult {
  isSuccess: boolean;
  errorMessage: string;
}

interface IAuthContext extends IAuthState {
  login: (email: string, password: string, rememberMe: boolean) => Promise<ILoginResult>;
  logout: () => void | null;
};

const defaultAuthContext: IAuthContext = {
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string, rememberMe: boolean) => { 
    const delay: number = (email + password + rememberMe.toString()).length;
    const delayPromise = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delayPromise(delay);

    const result: ILoginResult = {
      isSuccess: false,
      errorMessage: ''
    };
    return result;
  },
  logout: () => {}
}

interface IFetchResult {
  isSuccess: boolean;
  data: any;
  errorMessage: string;
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

  const login = async (email: string, password: string, rememberMe: boolean): Promise<ILoginResult> => {
    const result: ILoginResult = {
      isSuccess: false,
      errorMessage: ''
    };

    removeCookie(JWT_TOKEN_COOKIE);
    removeCookie(REFRESH_TOKEN_COOKIE);

    const fetchResult = await fetchLogin(email, password);

    if (fetchResult.isSuccess) {
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

      result.isSuccess = true;
    }

    else {
      setAuthState(defaultAuthState);
      result.errorMessage = fetchResult.errorMessage;
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
      login,
      logout
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const fetchLogin = async (email: string, password: string): Promise<IFetchResult> => {
  const result: IFetchResult = {
    isSuccess: false,
    data: null,
    errorMessage: ''
  };

  const env = await import.meta.env;
  const loginUrl = `${env.VITE_API_BASE_URL}Account/authenticate`;

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      result.errorMessage = `Network error: ${response.status} (${response.statusText})`;
    }
    else {
      const responseBody = await response.json();
      if (responseBody.succeeded) {
        result.isSuccess = true;
        result.data = responseBody.data;
      }
      else {
        result.errorMessage = responseBody.message;
      }
    }
  } catch (error) {
    result.errorMessage = `Unexpected error: ${error}`;
  }

  return result;
}

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