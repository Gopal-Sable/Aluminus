const jwt = require('jsonwebtoken');
const JWT_SECRETE = "this is very secrete code save in invi.. variable"

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to req obj

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Plesae authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRETE);
        console.log(data,data.iat,data.user);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Plesae authenticate using a valid token" })
    }

}
module.exports = fetchuser