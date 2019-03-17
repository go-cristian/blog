import * as moment from "moment";
import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { AppState } from "../../data/AppState";
import { requestGist } from "../../data/detail/detailActions";
import { GistContent } from "../../data/models";
import {
  Arrow,
  Avatar,
  Container,
  Text,
  Title,
  UserContainer
} from "../styles";

const navIcon = "../public/images/prev.png";

interface RouteInfo {
  id: string;
}

interface Props extends RouteComponentProps<RouteInfo> {
  isLoading: boolean;
  previousId?: string;
  nextId?: string;
  rawGist?: GistContent;
  requestGist: (id: string) => any;
}

class DetailScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.requestGist(this.props.location.pathname.split("/")[2]);
  }
  render() {
    if (this.props.isLoading) {
      return (
        <Container>
          <Text>Loading...</Text>
        </Container>
      );
    }
    if (this.props.rawGist === undefined) {
      return (
        <Container>
          <Text>No Info Available</Text>
        </Container>
      );
    }
    return (
      <Container>
        <p>
          <Text small>
            {moment(this.props.rawGist.date).format("MMMM DD / YYYY")} •
          </Text>
          <Text small colored>
            {moment(this.props.rawGist.date)
              .startOf("hour")
              .fromNow()}
          </Text>
        </p>
        <Title>{this.props.rawGist.title}</Title>
        <ReactMarkdown source={this.props.rawGist.content} />
        <UserContainer>
          <Avatar src={this.props.rawGist.owner.avatarUrl} />
          <Text big>{this.props.rawGist.owner.name}</Text>
          <br />
          <Text colored>Posts</Text>
        </UserContainer>
        <p>
          <Link to={`/gist/${this.props.previousId}`}>
            <Arrow src={String(navIcon)} />
          </Link>
          <Link to={`/gist/${this.props.nextId}`}>
            <Arrow inverted src={String(navIcon)} />
          </Link>
        </p>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.detail.isLoading,
  rawGist: state.detail.gist,
  previousId: state.detail.previousId,
  nextId: state.detail.nextId
});

const mapDispatchToProps = { requestGist };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailScreen)
);
