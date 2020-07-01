import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => {
  const token = localStorage.getItem('userToken');
  console.log(token);
  return (
    <Route
      {...rest}
      render={props => {
        return token !== null ? (
          React.createElement(component, props)
        ) : (
            <Redirect
              to={{
                pathname: "/login",

              }}
            />
          )
      }
      }
    />
  );
}

export default PrivateRoute;