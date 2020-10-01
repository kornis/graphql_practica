const jwt = require('jsonwebtoken');

module.exports.verifyUser = (req) => {
    try{
        const bearerToken = req.headers.authorization;
        req.email = null;
        if(bearerToken){
            const token = bearerToken.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.email = payload.email;
        }
    }catch(error){
        console.error(error);
        throw error;
    }
}