import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { State } from "State";

import { Gist, Result } from "../data/models";
import { doSearch } from "../search/searchActions";

import {
  Avatar,
  Button,
  Container,
  GistLeft,
  GistRight,
  GistView,
  SearchBox,
  Text,
  Title,
  UserContainer
} from "./styles";

interface Props {
  result?: Result;
  isLoading: boolean;
  error?: string;
  doSearch: (searchTerm: string) => any;
}

interface ThisState {
  searchTerm: string;
}

class SearchView extends React.Component<Props, ThisState> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    if (this.state.searchTerm.length > 0) {
      this.props.doSearch(this.state.searchTerm);
    } else {
      alert("please write something");
    }
  };

  componentWillMount() {
    this.setState({ searchTerm: "" });
  }

  render() {
    let resultsView;
    let userView;
    if (this.props.isLoading) {
      resultsView = <Text>Searching</Text>;
    } else if (this.props.error) {
      resultsView = <Text>{this.props.error}</Text>;
    } else if (this.props.result && this.props.result.posts.length > 0) {
      userView = (
        <UserContainer>
          <Avatar src={this.props.result.user.avatarUrl} />
          <Text big>{this.props.result.user.name}</Text>
          <br />
          <Text colored>Posts</Text>
        </UserContainer>
      );
      resultsView = this.props.result.posts.map((gist: Gist) => (
        <GistView to={`/gist/${gist.id}`} key={gist.id}>
          <GistLeft>
            <Text small>{moment(gist.date).format("MMMM DD / YYYY")} •</Text>
            <Text small colored>
              {moment(gist.date)
                .startOf("hour")
                .fromNow()}
            </Text>
            <p>
              <Text big>{gist.title}</Text>
            </p>
          </GistLeft>
          <GistRight>
            <Text big colored>
              Read
            </Text>
          </GistRight>
        </GistView>
      ));
    }

    return (
      <Container>
        <Title>Blog msco.</Title>
        <Text>
          Explore the unknown. Uncover what matters. Prototype, test, repeat.
          Combine intuition with evidence. Design with intent and build it
          right.
        </Text>
        <SearchBox
          type="text"
          placeholder="Explore"
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSearch}>Search</Button>
        {userView}
        {resultsView}
      </Container>
    );
  }
}

const mapStateToProps = (state: State) => ({
  result: state.search.result,
  isLoading: state.search.isLoading,
  error: state.search.error
});

const mapDispatchToProps = { doSearch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
