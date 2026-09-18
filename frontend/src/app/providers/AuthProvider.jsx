import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "../../lib/authStorage";

import {
  login as loginRequest,
} from "../../services/auth/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setTokenState] = useState(
    getToken()
  );

  const [user, setUserState] = useState(
    getStoredUser()
  );

  const isAuthenticated = Boolean(
    token && user
  );

  async function login(credentials) {
    const response = await loginRequest(
      credentials
    );

    if (
      !response?.success ||
      !response?.data?.token
    ) {
      throw new Error(
        response?.message ||
          "Login failed"
      );
    }

    const authData = response.data;

    const authenticatedUser = {
      userId: authData.userId,
      name: authData.name,
      email: authData.email,
      role: authData.role,
    };

    /*
     * Persist authentication.
     */
    setToken(authData.token);

    setStoredUser(
      authenticatedUser
    );

    /*
     * Update React authentication state.
     */
    setTokenState(
      authData.token
    );

    setUserState(
      authenticatedUser
    );

    return authData;
  }

  function logout() {
    /*
     * Clear persistent authentication.
     */
    clearAuthStorage();

    /*
     * Clear React authentication state.
     */
    setTokenState(null);
    setUserState(null);

    /*
     * Always send the user back to
     * the public landing page.
     */
    navigate("/", {
      replace: true,
    });
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [
      token,
      user,
      isAuthenticated,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}