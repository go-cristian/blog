import * as React from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from "react-router-dom";
import styled from "styled-components";

import background from "./public/images/background.png";
import PrivateRoute from "./ui/PrivateRoute";
import DetailView from "./ui/screens/DetailScreen";
import MeView from "./ui/screens/MeScreen";
import WritePostView from "./ui/screens/PostScreen";
import SearchScreen from "./ui/screens/SearchScreen";
import Toolbar from "./ui/Toolbar";

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
                <SearchScreen timestamp={new Date().toString()} {...props} />
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
            <PrivateRoute exact path="/write" component={WritePostView} />
          </Switch>
        </Container>
      </Background>
    );
  }
}

export default withRouter(App);
