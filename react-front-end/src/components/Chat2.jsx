import React, { Component } from "react";
import Pusher from "pusher-js";
import axios from "axios";
//import './App.css';

class Chat2 extends Component {
  state = {
    username: this.props.first_name + " " + this.props.last_name,
    newComment: "",
    comments: [],
    id: this.props.id,
  };

  updateInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  postComment = (event) => {
    event.preventDefault();
    const { username, newComment, id } = this.state;
    if (username.trim() === "" || newComment.trim() === "") return;

    const data = {
      name: username,
      text: newComment,
      votes: 0,
    };

    axios
      .post(`http://localhost:8080/booking/comment/${id}`, data)
      .then(() => {
        this.setState({
          username: "",
          newComment: "",
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    const { id } = this.state;
    const pusher = new Pusher(process.env.REACT_APP_key, {
      cluster: process.env.REACT_APP_cluster,
      encrypted: true,
    });

    axios
      .get(`http://localhost:8080/booking/comment/${id}`)
      //.get(`http://localhost:8080/booking/comment/`)
      .then(({ data }) => {
        this.setState({
          comments: [...data],
        });
      })
      .catch((error) => console.log(error));

    const channel = pusher.subscribe(`comments${id}`);
    channel.bind(`new-comment${id}`, (data) => {
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

    const userComments = comments.map((e) => (
      <article className="comment" key={e._id}>
        <h1 className="comment-user">{e.name}</h1>
        <p className="comment-text">{e.text}</p>
      </article>
    ));

    return (
      <div className="App">
        <article className="post">
          <h1>Listing Details</h1>
          <p>This is your conversation regarding the listing: </p>
        </article>
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
        <section className="comments-section">{userComments}</section>
      </div>
    );
  }
}

export default Chat2;
