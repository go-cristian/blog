import * as React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { doLogin, doLogout } from "../../auth/authActions";
import { Session } from "../../data/models";
import { State } from "State";

import logo from "../../public/images/logo.png";

const Fixed = styled.div`
  background: white;
  position: fixed;
  top: 0px;
  right: 0;
  left: 0;
  z-index: 9999;
  display: block;
  margin: 0;
  padding-top: 10px;
  width: 100%;
  height: 48px;
  user-select: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  position: relative;
  max-width: 980px;
  margin: 0 auto;
  @media (max-width: 980px) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

interface ButtonProps {
  toRight?: boolean;
}

const Button = styled.button`
  font-family: NeueHansKendrick-ExtraBold;
  font-size: 18px;
  color: #666666;
  letter-spacing: 0;
  text-align: right;
  border: 0;
  border-bottom: 4px solid #1d1fdd;
  background: transparent;

  ${(props: ButtonProps) =>
    props.toRight &&
    css`
      margin-left: auto;
    `}
`;

const Logo = styled.img`
  width: 108px;
  height: 24px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 42px;
  height: 42px;
`;

const Name = styled.p`
  font-family: Helvetica;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  margin-left: 0.5em;

  @media (max-width: 480px) {
    display: none;
  }
`;

const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 1em;
`;

interface Props {
  session?: Session;
  doLogin: () => any;
  doLogout: () => any;
  isLoading?: boolean;
}

class Toolbar extends React.Component<Props> {
  render() {
    if (this.props.isLoading) {
      return <p>Loading</p>;
    } else {
      if (this.props.session) {
        return (
          <Fixed>
            <Container>
              <Link to="/">
                <Logo src={String(logo)} />
              </Link>
              <LinkContainer to="/me">
                <Avatar src={this.props.session.user.avatarUrl} />
                <Name>{this.props.session.user.name}</Name>
              </LinkContainer>
              <Button onClick={this.props.doLogout}>Logout</Button>
            </Container>
          </Fixed>
        );
      } else {
        return (
          <Fixed>
            <Container>
              <Link to="/">
                <Logo src={String(logo)} />
              </Link>
              <Button toRight onClick={this.props.doLogin}>
                Sign In
              </Button>
            </Container>
          </Fixed>
        );
      }
    }
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
