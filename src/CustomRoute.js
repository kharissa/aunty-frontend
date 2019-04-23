import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./containers/Navigation.js";

const CustomRoute = ({ noNav = false, component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest} //exact, path
        component={props => (
          <>
            {!noNav && <Navigation />}
            <Component {...props} />
          </>
        )}
      />
    </>
  );
};

export default CustomRoute;
