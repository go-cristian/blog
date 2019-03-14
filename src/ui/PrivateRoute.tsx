import * as PropTypes from "prop-types";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { State } from "../State";

interface Props {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: Props & { [key: string]: any }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.auth.session !== undefined
});

export default connect(mapStateToProps)(PrivateRoute);
