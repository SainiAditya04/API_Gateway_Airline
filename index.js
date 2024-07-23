const express = require('express');
const app = express();
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

require('dotenv').config();
const PORT = process.env.PORT || 3005;

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 request per window (15 minutes)
});

app.use(morgan('combined'));
app.use(limiter);

app.use('/bookingservice', async (req, res, next) => {
    try {
        console.log(req.headers['x-access-token']);
        const response = await axios.get('http://localhost:3001/api/v1/isAuthenticated', {
            headers: {
                'x-access-token': req.headers['x-access-token']
            }
        });
        console.log(response.data);

        if(response.data.success){
            next();
        }
        else{
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

});

app.use(
    '/bookingservice',
    createProxyMiddleware({
        target: 'http://localhost:3002/bookingservice',
        changeOrigin: true,
    }),
);

app.get('/home', (req, res) => {
    return res.json({
        message: "OK"
    });
})

app.listen(PORT, () => {
    console.log(`The Server started at PORT ${PORT}`);
});