const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');

module.exports.verifyUser = async (req) => {
    try{
        const bearerToken = req.headers.authorization;
        req.email = null;
        req.loggedInUserId = null;
        if(bearerToken){
            const token = bearerToken.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.email = payload.email;
            const user = await User.findOne({ email: payload.email });
            req.loggedInUserId = user.id;
        }
    }catch(error){
        console.error(error);
        throw error;
    }
}