const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'static/img/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadPhoto = multer({ storage });

const Controllers = require('../controllers');

const router = express.Router();

router.get('/api/main/data', Controllers.main.mainPageData);

router.get('/api/lot/data', Controllers.lot.getLotData);

router.get('/api/lots/data', Controllers.lot.getLotsPageData);

router.post('/api/lot/create', Controllers.lot.createLot);

router.post('/api/lot/delete', Controllers.lot.deleteLot);

router.post('/api/upload/lot/photos', uploadPhoto.array('photos'));

router.post('/api/letter/bug', Controllers.feedback.bug)

router.post('/api/letter/contact', Controllers.feedback.contact)

router.post('/api/letter/partnership', Controllers.feedback.partnership)


module.exports = router;
