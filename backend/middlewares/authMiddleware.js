//
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    return res.status(401).send({
                        success: false,
                        message: "Auth Failed",
                    });
                } else {
                    req.body.userId = decode.userId;
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "Auth Failed",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message: "Auth Failed",
        });
    }
};