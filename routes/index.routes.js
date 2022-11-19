const express = require('express');
const router = express.Router();

const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')


router.get("/", (req, res, next) => {
  res.render("index");
});


router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("user/profile", { user: req.session.currentUser })
})


router.get('/admin', isLoggedIn, checkRoles('ADMIN', 'CREATOR'), (req, res, next) => {
  res.render('admin-panel')
})


module.exports = router;
