import React from 'react';

export default function ({ _id, user, text }) {
  return(
    <div className="comment-container" key={_id}>
      <div className="comment-author">{user.username}</div>
      <div className="comment-text">{text}</div>
    </div>
  )
}
