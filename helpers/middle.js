const jwt = require('jsonwebtoken');

const {
    JWT_TOKEN
} = process.env;

module.exports = {
    masukDulu: (req, res, next) => {
        try {
            const token = req.headers['authorization'];
            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: 'you\'re not authorized!',
                    data: null
                });
            }

            const decoded = JWT_TOKEN;
            req.user = decoded;

            next();
        } catch (err) {
            if (err.message == 'jwt malformed') {
                return res.status(401).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }

            next(err);
        }
    }
};
