import React, { Component, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import "./Chat.css";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { scroller, Events } from "react-scroll";

class Chat extends Component {
  state = {
    username: this.props.first_name + " " + this.props.last_name,
    newComment: "",
    comments: [],
    booking_id: this.props.id,
  };

  constructor(props) {
    super(props);
    const AlwaysScrollToBottom = () => {
      const elementRef = useRef();
      useEffect(() => elementRef.current.scrollIntoView());
      return <div ref={elementRef} />;
    };
  }

  AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  updateInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  postComment = (event) => {
    event.preventDefault();
    const { username, newComment, booking_id } = this.state;
    if (username.trim() === "" || newComment.trim() === "") return;

    const data = {
      name: username,
      text: newComment,
    };

    axios
      .post(`http://localhost:8080/booking/comment/${booking_id}`, data)
      .then(() => {
        this.setState({
          newComment: "",
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    const { booking_id } = this.state;
    const pusher = new Pusher(process.env.REACT_APP_key, {
      cluster: process.env.REACT_APP_cluster,
      encrypted: true,
    });

    axios
      .get(`http://localhost:8080/booking/comment/${booking_id}`)
      //.get(`http://localhost:8080/booking/comment/`)
      .then(({ data }) => {
        this.setState({
          comments: [...data],
        });
      })
      .catch((error) => console.log(error));

    const channel = pusher.subscribe(`comments${booking_id}`);
    channel.bind(`new-comment`, (data) => {
      this.setState((prevState) => {
        const { comments } = prevState;
        comments.push(data.comment);

        return {
          comments,
        };
      });
    });
  }

  render() {
    const { username, newComment, comments } = this.state;

    const key = "text";
    const arrayUniqueByKey = [
      ...new Map(comments.map((item) => [item[key], item])).values(),
    ];
    const userComments = arrayUniqueByKey.map((e) => (
      //const userComments = comments.map((e) => (
      <article className="comment" key={e._id}>
        <h1 className="comment-user">{e.name}</h1>
        <p className="comment-text">{e.text}</p>
      </article>
    ));

    return (
      <div className="Chat">
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <article className="post">
              <h1>Listing Details</h1>
              <p>This is your conversation regarding the listing: </p>
            </article>
          </Grid>
          <Grid item xs={12} md={10}>
            <Paper style={{ minHeight: 400, maxHeight: 400, overflow: "auto" }}>
              <section className="comments-section">
                {userComments}
                <article name="final-comment"></article>
              </section>
              {/* <this.AlwaysScrollToBottom /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <section className="comments-form">
              <form onSubmit={this.postComment}>
                <label htmlFor="new-comment">Comment:</label>
                <textarea
                  className="comment"
                  name="newComment"
                  id="new-comment"
                  value={newComment}
                  onChange={this.updateInput}
                />
                <button type="submit">send</button>
              </form>
            </section>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Chat;
