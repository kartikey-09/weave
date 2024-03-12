const crypto =  require('crypto');
const axios = require('axios');
const {salt_key, merchant_id} = require('./secret')
const paymentModel = require('../../models/phonepe/paymentModel')

const newPayment = async (req, res) => {
    try {
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:8080/api/v1/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);

        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const yourAsyncFunction = async () => {
            try {
                const response = await axios.request(options);
                console.log(response.data);
                const details={
                    name: req.body.name,
                    number: req.body.number,
                    transactionId: merchantTransactionId,
                    muId: req.body.MUID,
                    amount: req.body.amount
                }
                await paymentModel.create(details);
                return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
            } catch (error) {
                console.error(error);
            }
        };
        yourAsyncFunction();

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

const checkStatus = async(req, res) => {
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
    }
    };

    // CHECK PAYMENT STATUS
   

    try {
        const response = await axios.request(options);
    
        // Check if the payment was successful
        if (response.data.success === true) {
            // Update the status to 'successful' in the MongoDB collection
            const updatedPayment = await paymentModel.findOneAndUpdate(
                { transactionId: merchantTransactionId, status: 'pending' }, // Find the document with the given transactionId and pending status
                { $set: { status: 'successful' } }, // Update the status to 'successful'
                { new: true } // Return the modified document
            );
    
            // Check if the payment document was found and updated successfully
            if (updatedPayment) {
                const url = `http://localhost:3000/success`;
                return res.redirect(url);
            } else {
                // Handle the case where the document was not found or not updated
                console.error('Payment document not found or not updated');
            }
        } else {
            const updatePayment = await paymentModel.findOneAndUpdate(
                { transactionId: merchantTransactionId, status: 'pending' }, // Find the document with the given transactionId and pending status
                { $set: { status: 'failed' } }, // Update the status to 'successful'
                { new: true } // Return the modified document
            );
            if (updatePayment) {
                const url = `http://localhost:3000/failure`;
                return res.redirect(url);
            }
        }
    } catch (error) {
        console.error(error);
    }
   
};

module.exports = {
    newPayment,
    checkStatus
}
