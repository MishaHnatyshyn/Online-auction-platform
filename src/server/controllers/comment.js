const db = require('../db')

module.exports = {
  add: async (req, res) => {
    try {
      const user = req.user.id
      const newComment = await db.comment.add({ ...req.body, user });
      res.json(newComment);
    } catch (e) {
      console.log(e)
      res.status(500).end();
    }
  },
  fetch: async (req, res) => {
    try {
      const { page, lot } = req.body;
      console.log('page, lot', page, lot)
      const comments = await db.comment.getTenComments(lot, page);
      console.log('comments', comments)
      res.json(comments);
    } catch (e) {
      console.log(e)
      res.status(500).end();
    }
  },
};
