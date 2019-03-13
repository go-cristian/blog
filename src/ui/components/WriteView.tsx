import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { State } from "State";
import { connect } from "react-redux";

import { doSave, doReset } from "../../write/writeActions";
import { Input, Container, Button, Title, Text, Area } from "./styles";

interface ThisState {
  title: string;
  content: string;
}

interface Props extends RouteComponentProps {
  isLoading: boolean;
  completed: boolean;
  doSave: (title: string, content: string) => any;
  doReset: () => any;
}

class WriteView extends React.Component<Props, ThisState> {
  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, title: event.target.value });
  };

  handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ ...this.state, content: event.target.value });
  };

  save = () => {
    if (this.state.title.length > 0 && this.state.content.length > 0) {
      this.props.doSave(this.state.title, this.state.content);
    } else {
      alert("please complete the form");
    }
  };

  componentDidMount() {
    this.setState({ title: "", content: "" });
  }

  componentDidUpdate() {
    if (this.props.completed) {
      this.props.doReset();
      this.props.history.push("/me");
    }
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <Container>
          <Title>New Post</Title>
          <Text>
            Explore the unknown. Uncover what matters. Prototype, test, repeat.
            Combine intuition with evidence. Design with intent and build it
            right.
          </Text>
          <Input
            type="text"
            onChange={this.handleChangeTitle}
            placeholder="Title"
          />
          <Area onChange={this.handleChangeContent} placeholder="Text" />
          <Button onClick={this.save}>Publish</Button>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state: State) => ({
  isLoading: state.write.isLoading,
  completed: state.write.completed
});

const mapDispatchToProps = { doSave, doReset };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WriteView)
);
