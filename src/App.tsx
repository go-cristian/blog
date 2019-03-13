import * as React from "react";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import Toolbar from "./ui/components/Toolbar";
import SearchView from "./ui/components/SearchView";
import MeView from "./ui/components/MeView";
import WriteView from "./ui/components/WriteView";
import styled from "styled-components";
import DetailView from "./ui/components/DetailView";

import background from "./public/images/background.png";
import PrivateRoute from "./ui/components/PrivateRoute";

const Background = styled.div`
  background: url(${background});
  min-height: 100%;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: auto;
  @media (max-width: 480px) {
    background-size: contain;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 980px) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

class App extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Background>
        <Container>
          <Toolbar />
          <Switch>
            <Route
              exact
              path="/"
              component={(props: any) => (
                <SearchView timestamp={new Date().toString()} {...props} />
              )}
            />
            <Route
              exact
              path="/gist/:id"
              component={(props: any) => (
                <DetailView timestamp={new Date().toString()} {...props} />
              )}
            />
            <PrivateRoute exact path="/me" component={MeView} />
            )} />
            <PrivateRoute exact path="/write" component={WriteView} />
          </Switch>
        </Container>
      </Background>
    );
  }
}

export default withRouter(App);
