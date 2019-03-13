import * as React from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import { RouteComponentProps, withRouter } from "react-router";

import { Gist, Result } from "../../data/models";
import { doSearch } from "../../search/searchActions";
import { State } from "State";

import {
  UserContainer,
  Avatar,
  Text,
  Container,
  GistView,
  GistLeft,
  GistRight,
  Button
} from "./styles";

interface Props extends RouteComponentProps {
  username: string;
  result?: Result;
  doSearch: (searchTerm: string) => any;
}

class MeView extends React.Component<Props> {
  createNew = () => {
    this.props.history.push("write");
  };

  componentWillMount() {
    this.props.doSearch(this.props.username);
  }

  render() {
    let results;
    if (this.props.result) {
      if (this.props.result.posts.length > 0) {
        results = (
          <Container>
            <UserContainer>
              <Avatar src={this.props.result.user.avatarUrl} />
              <Text big>{this.props.result.user.name}</Text>
              <br />
              <Text colored>Posts</Text>
            </UserContainer>

            <Button onClick={this.createNew}>Create New Post</Button>
            {this.props.result.posts.map((gist: Gist) => (
              <GistView to={`/gist/${gist.id}`} key={gist.id}>
                <GistLeft>
                  <p>
                    <Text small>
                      {moment(gist.date).format("MMMM DD / YYYY")} •
                    </Text>
                    <Text small colored>
                      {moment(gist.date)
                        .startOf("hour")
                        .fromNow()}
                    </Text>
                    <br />
                    <Text big>{gist.title}</Text>
                  </p>
                </GistLeft>
                <GistRight>
                  <Text big colored>
                    Read
                  </Text>
                </GistRight>
              </GistView>
            ))}
          </Container>
        );
      } else {
        results = <div>No Results</div>;
      }
    } else {
      results = <div>Cargando...</div>;
    }

    return <div>{results}</div>;
  }
}

const mapStateToProps = (state: State) => ({
  username: state.auth.session!!.user.name,
  result: state.search.result
});

const mapDispatchToProps = { doSearch };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MeView)
);
