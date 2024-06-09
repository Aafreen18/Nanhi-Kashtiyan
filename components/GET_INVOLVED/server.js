const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
const port = 3000;

const emailjs = require('emailjs-com');
app.use(express.json());
app.use(cors()); // Use CORS to allow requests from your client-side

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.post('/create-order', async (req, res) => {
    const { debitAmount, currency, fullName, paymentDate } = req.body;

    try {
        var instance = new Razorpay({
            key_id: 'rzp_test_LYgLgs5QgO5IZj',
            key_secret: '53EyQvRIpXVAhdnuq20KFjB2'
        });

        const time = new Date();
        const receipt = "receipt_" + fullName + "_" + paymentDate + "_" + time.getSeconds();
        console.log(receipt);
        const options = {
            amount: debitAmount * 100, // Amount should be in paise
            currency: currency,
            receipt: receipt, // Generate a unique receipt ID for each order
        };

        const order = await instance.orders.create(options);

        res.status(201).json({
            success: true,
            order: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);

});



