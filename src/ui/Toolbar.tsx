import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "State";

import { doLogin, doLogout } from "../auth/authActions";
import { Session } from "../data/models";
import logo from "../public/images/logo.png";

import PopupWindow from "./PopupWindow";
import {
  Avatar,
  Fixed,
  LinkContainer,
  Logo,
  Name,
  ToolbarButton,
  ToolbarContainer
} from "./styles";

interface Props {
  session?: Session;
  doLogin: (code: string) => any;
  doLogout: () => any;
  isLoading?: boolean;
}

class Toolbar extends React.Component<Props> {
  doLogin = () => {
    PopupWindow.open(
      "github-oauth-authorize",
      "https://github.com/login/oauth/authorize?client_id=fb60535dac0bced1e8f5&redirect_uri=http://localhost:3000/code&scope=gist",
      { height: 500, width: 500 }
    ).then((code: string) => this.props.doLogin(code));
  };

  render() {
    if (this.props.isLoading) {
      return <p>Loading</p>;
    }
    if (this.props.session) {
      return (
        <Fixed>
          <ToolbarContainer>
            <Link to="/">
              <Logo src={String(logo)} />
            </Link>
            <LinkContainer to="/me">
              <Avatar src={this.props.session.user.avatarUrl} />
              <Name>{this.props.session.user.name}</Name>
            </LinkContainer>
            <ToolbarButton onClick={this.props.doLogout}>Logout</ToolbarButton>
          </ToolbarContainer>
        </Fixed>
      );
    }
    return (
      <Fixed>
        <ToolbarContainer>
          <Link to="/">
            <Logo src={String(logo)} />
          </Link>
          <ToolbarButton toRight onClick={this.doLogin}>
            Sign In
          </ToolbarButton>
        </ToolbarContainer>
      </Fixed>
    );
  }
}

const mapStateToProps = (state: State) => ({
  session: state.auth.session,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = { doLogin, doLogout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
