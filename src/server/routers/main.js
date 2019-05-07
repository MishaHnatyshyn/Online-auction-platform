const express = require('express');
const Controllers = require('../controllers');
const passport = require('../auth');

const router = express.Router();

const isLoggedIn = (req, res, next) => (!req.isAuthenticated() ? res.json({ status: -1 }) : next());

router.post('/api/register', passport.authenticate('local-signup'), Controllers.main.register);

router.post('/api/user/data', Controllers.main.userData)

router.post('/api/login', passport.authenticate('local-login'), Controllers.main.login);

router.post('/api/logout', Controllers.main.logout);

router.post('/api/comment/add', Controllers.comment.add);

router.post('/api/comment/fetch', Controllers.comment.fetch);

router.get('/api/main/data', Controllers.main.mainPageData);

router.post('/api/lots/last', Controllers.lot.getLastLots);

router.post('/api/lot/data', Controllers.lot.getLotData);

router.get('/api/lots/data', Controllers.lot.getLotsPageData);

router.post('/api/lots/filter', Controllers.lot.getFilteredLots);

router.post('/api/site/search', Controllers.main.search);

router.post('/api/lot/create', isLoggedIn, Controllers.lot.createLot);

router.post('/api/bid/make', isLoggedIn, Controllers.bid.makeBid);

router.post('/api/lot/create/photos', isLoggedIn, Controllers.lot.uploadPhotos, Controllers.lot.createLotPhotos);

router.post('/api/lot/delete', Controllers.lot.deleteLot);

router.post('/api/letter/bug', Controllers.feedback.bug)

router.post('/api/letter/contact', Controllers.feedback.contact)

router.post('/api/letter/partnership', Controllers.feedback.partnership)

router.get('*', Controllers.main.returnMainPage)

module.exports = router;
