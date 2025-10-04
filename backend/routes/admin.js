const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/products', isAdmin, upload.array('images'), adminController.addProduct);
router.put('/orders/:orderId/status', isAdmin, adminController.updateOrderStatus);

module.exports = router;