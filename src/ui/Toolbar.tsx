import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AppState } from "../data/AppState";
import { doLogin, doLogout } from "../data/auth/authActions";
import { getEnv } from "../data/environment";
import { Session } from "../data/models";
import logo from "../public/images/logo.png";

import {
  Avatar,
  Fixed,
  LinkContainer,
  Logo,
  Name,
  ToolbarButton,
  ToolbarContainer
} from "./styles";
import PopupWindow from "./widgets/PopupWindow";

interface Props {
  session?: Session;
  doLogin: (code: string) => any;
  doLogout: () => any;
  isLoading?: boolean;
}

interface Code {
  code: string;
}

const GITHUB_LOGIN_URL = "https://github.com/login/oauth/authorize";

class Toolbar extends React.Component<Props> {
  doLogin = () => {
    const env = getEnv();
    PopupWindow.open(
      "github-oauth-authorize",
      `${GITHUB_LOGIN_URL}?client_id=${env.id}&redirect_uri=${
        window.location.href
      }code&scope=gist`,
      { height: 500, width: 500 }
    ).then((code: Code) => this.props.doLogin(code.code));
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

const mapStateToProps = (state: AppState) => ({
  session: state.auth.session,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = { doLogin, doLogout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
