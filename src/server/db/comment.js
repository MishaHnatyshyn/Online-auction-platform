const Comment = require('../models/comment');

module.exports = {
  add: data => new Promise((resolve, reject) => {
    const newComment = new Comment(data);
    newComment.save((err) => {
      if (err) return reject(err);
      resolve(newComment);
    });
  }),
  getTenComments: (lot, page) => new Promise((resolve, reject) => {
    Comment.paginate({ lot }, {
      page, limit: 10, populate: 'user', sort: { _id: -1 }
    }).then((comments) => {
      resolve(comments.docs);
    }).catch(err => reject(err));
  }),
};
