import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  LOGOUT: "LOGOUT",
  LOAD_USER_START: "LOAD_USER_START",
  LOAD_USER_SUCCESS: "LOAD_USER_SUCCESS",
  LOAD_USER_FAILURE: "LOAD_USER_FAILURE",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
    case AUTH_ACTIONS.LOAD_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOAD_USER_SUCCESS:
    case AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
    case AUTH_ACTIONS.LOAD_USER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on app start
  useEffect(() => {
    if (state.token) {
      loadUser();
    } else {
      dispatch({ type: AUTH_ACTIONS.LOAD_USER_FAILURE, payload: null });
    }
  }, []);

  // Set auth token in API headers
  useEffect(() => {
    if (state.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [state.token]);

  // Actions
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Login successful! Welcome back!");
        return { success: true };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage,
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });

      const response = await api.post("/auth/register", userData);

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Registration successful! Welcome to EcoScape Hub!");
        return { success: true };
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage,
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const loadUser = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOAD_USER_START });

      const response = await api.get("/auth/profile");

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.LOAD_USER_SUCCESS,
          payload: response.data.data,
        });
      } else {
        throw new Error(response.data.message || "Failed to load user");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to load user";
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER_FAILURE,
        payload: errorMessage,
      });
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await api.put("/auth/profile", userData);

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS,
          payload: response.data.data,
        });
        return { success: true };
      } else {
        throw new Error(response.data.message || "Profile update failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Profile update failed";
      return { success: false, error: errorMessage };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        return { success: true };
      } else {
        throw new Error(response.data.message || "Password change failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Password change failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    toast.success("Logged out successfully!");
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    loadUser,
    updateProfile,
    changePassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
