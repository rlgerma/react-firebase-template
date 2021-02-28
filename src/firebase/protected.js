/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./context";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { authUser } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(routeProps) =>
          authUser ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to='/login' />
          )
        }
      />
    </>
  );
};

export default ProtectedRoute;
