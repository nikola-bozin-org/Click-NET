import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/login/Login";
import { AppContextProvider } from "./contexts/AppContext";
import { UsersContextProvider } from "./contexts/UsersContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useContext } from 'react';
import { AppContext } from './contexts/AppContext'; 

const DevelopmentWrapper = ({ component }) => {
  const { setIsAuthorized } = useContext(AppContext);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsAuthorized(true);
    }
  }, [setIsAuthorized]);

  return component;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppContextProvider>
        <UsersContextProvider>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  process.env.NODE_ENV !== 'development' ? (
                    <Login />
                  ) : (
                    <DevelopmentWrapper component={<App />} />
                  )
                }
              />
              <Route exact path="/dashboard" element={<App />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Router>
        </UsersContextProvider>
      </AppContextProvider>
    </React.StrictMode>
  </Provider>
);