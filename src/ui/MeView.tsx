import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { Result } from "../data/models";
import { doSearch } from "../data/search/searchActions";
import { State } from "../data/State";

import { Avatar, Button, Container, Text, UserContainer } from "./styles";
import PostListItem from "./widgets/PostListItem";

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
            <PostListItem posts={this.props.result.posts} />
          </Container>
        );
      } else {
        results = <div>No Results</div>;
      }
    } else {
      results = <div>Loading...</div>;
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
