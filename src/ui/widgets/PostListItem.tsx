import * as moment from "moment";
import * as React from "react";

import { Gist } from "../../data/models";
import { GistLeft, GistRight, GistView, Text } from "../styles";

interface Props {
  posts: Gist[];
}

const PostListItem = (props: Props) => {
  return (
    <div>
      {props.posts.map((gist: Gist) => (
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
      ))}
    </div>
  );
};

export default PostListItem;
