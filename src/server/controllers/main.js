const fs = require('fs');
const path = require('path');
const db = require('../db');

const categories = [
  'Art',
  'Household appliances',
  'Clothing',
  'Electronics',
  'Drinks',
  'Jewelry',
  'Furniture',
  'Coins',
  'Stamps',
  'Other',
];

module.exports = {
  mainPageData: async (req, res) => {
    try {
      const lots = await db.lot.getLastLots();
      res.json(lots);
    } catch (e) {
      res.end();
    }
  },
  search: async (req, res) => {
    try {
      const { text } = req.body;
      const matchedCategories = categories
        .filter(category => category.toLowerCase().indexOf(text.toLowerCase()) + 1);
      const result = matchedCategories.slice(0, 8).map(category => ({
        name: category,
        description: 'Category',
        image: 'https://pngimage.net/wp-content/uploads/2018/05/category-png.png',
        link: `/lots/${category.replace(/\s/g, '-')}`
      }));
      const lotsCount = 8 - result.length;
      const lots = await db.lot.findForSearch(text, lotsCount);
      const formattedLots = lots.map(lot => ({
        name: lot.name,
        description: lot.description,
        image: `/${lot._id}/${lot.photos[0]}`,
        link: `/lot/${lot._id}`
      }));
      res.json(result.concat(formattedLots));
    } catch (e) {
      res.end();
    }
  },
  userData: (req, res) => {
    try {
      if (!req.user) return res.end();
      const { username, _id } = req.user;
      res.json({ username, _id });
    } catch (e) {
      res.end();
    }
  },
  login: async (req, res) => {
    try {
      const { username, _id } = req.user;
      res.json({ username, _id });
    } catch (e) {
      res.end();
    }
  },
  logout: async (req, res) => {
    try {
      req.logout();
      req.end();
    } catch (e) {
      res.end();
    }
  },

  register: async (req, res) => {
    try {
      const { username, _id } = req.user;
      res.json({ username, _id });
    } catch (e) {
      res.end();
    }
  },

  returnMainPage: async (req, res) => {
    try {
      const pathToIndex = path.join(__dirname, '/../../../dist/index.html')
      res.sendFile(pathToIndex);
    } catch (e) {
      res.end();
    }
  }
};
