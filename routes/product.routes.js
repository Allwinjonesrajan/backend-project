const router = require('express').Router();
const product = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', product.getAll);
router.post('/', verifyToken, isAdmin, product.create);
router.put('/:id', verifyToken, isAdmin, product.update);
router.delete('/:id', verifyToken, isAdmin, product.remove);

module.exports = router;
