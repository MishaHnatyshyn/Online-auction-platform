import React from 'react';
import axios from 'axios';
import CommentContainer from './CommentContainer';

export default class CommentBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      comments: [],
      commentsAvailable: true
    }
    this.page = 1
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    axios.post('/api/comment/fetch',{
      page: this.page,
      lot: this.props._id
    }).then((res) => {
      this.page++;
      this.setState((prevState) => ({ comments: prevState.comments.concat(res.data), commentsAvailable: res.data.length > 0 }))
    })
  }

  postComment = () => {
    axios.post('/api/comment/add', {
      text: this.state.commentText,
      lot: this.props._id
    }).then((res) => {
      const comments = this.state.comments;
      this.setState({
        commentText: '',
        comments: [{...res.data, user: {username: this.props.user}}].concat(comments)
      })
    })
      .catch((err) => {})
  }

  handleTextChange = (e) => {
    this.setState({ commentText: e.target.value })
  }

  render() {
    const { user } = this.props;
    const { commentText, comments, commentsAvailable } = this.state;
    return(
      <div className="lot-comments">
        <h2>Comments: </h2>
        <div className="lot-comments-input">
          {!user ? <div className="prevent-comment">
            Only authorized users can post comments
          </div> : null}
          <textarea placeholder="Type text of comment ..." value={commentText} onChange={this.handleTextChange} maxLength={1000}/>
          <button className="button-common" onClick={this.postComment}>Post</button>
        </div>
        <div className="lot-comments-list">
          {comments.map((comment, index) => <CommentContainer key={index} {...comment}/>)}
          {commentsAvailable && comments.length > 9 ? <div className="load-more-comments" onClick={this.fetchComments}>Load more...</div> : null}
        </div>
      </div>
    )
  }

}
