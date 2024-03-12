const {newPayment, checkStatus} =  require('../../controllers/phonepe/paymentController');
const express = require('express');
const router = express();

router.post('/api/v1/paytm', newPayment);
router.post('/api/v1/status/:txnId', checkStatus);

module.exports = router;