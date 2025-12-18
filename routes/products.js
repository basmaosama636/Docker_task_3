const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Middleware للتأكد من تسجيل الدخول
function isLoggedIn(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.get('/', isLoggedIn, productController.index);
router.get('/new', isLoggedIn, productController.showNewForm);
router.post('/', isLoggedIn, productController.create);
router.post('/:id/delete', isLoggedIn, productController.delete);
router.get('/:id', isLoggedIn, productController.show);
router.delete('/:id', productController.delete);

module.exports = router;
