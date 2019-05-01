module.exports = {
  bug: (req, res) => {
    try {
      console.log(req.body);
      res.end();
    } catch (e) {
      res.status(500).end();
    }
  },
  contact: (req, res) => {
    try {
      console.log(req.body);
      res.end();
    } catch (e) {
      res.status(500).end();
    }
  },
  partnership: (req, res) => {
    try {
      console.log(req.body);
      res.end();
    } catch (e) {
      res.status(500).end();
    }
  },
};
