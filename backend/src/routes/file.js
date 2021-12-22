const express = require('express');

const config = require('../config');
const path = require('path');
const passport = require('passport');
const { fileRequest } = require('../services/file');

const router = express.Router();

router.get('/download', (req, res) => {
  const privateUrl = req.query.privateUrl;

  if (!privateUrl) {
    return res.sendStatus(404);
  }

  res.download(path.join(config.uploadDir, privateUrl));
});

router.post('/upload/users/avatar', passport.authenticate('jwt', {session: false}), (req, res) => {
  fileRequest('users/avatar', {
    entity: null,
    maxFileSize: 10 * 1024 * 1024,
    folderIncludesAuthenticationUid: false,
  })(req, res);
});

router.post('/upload/reports/images', passport.authenticate('jwt', {session: false}), (req, res) => {
  fileRequest('reports/images', {
    entity: null,
    maxFileSize: 10 * 1024 * 1024,
    folderIncludesAuthenticationUid: false,
  })(req, res);
});

router.post('/upload/advertisments/ad_image', passport.authenticate('jwt', {session: false}), (req, res) => {
  fileRequest('advertisments/ad_image', {
    entity: null,
    maxFileSize: 10 * 1024 * 1024,
    folderIncludesAuthenticationUid: false,
  })(req, res);
});

module.exports = router;
