const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const  generalAccessToken = async (payload) => {
    console.log('payload', payload);
    const access_token = jwt.sign({payload}, process.env.ACCESS_TOKEN, {expiresIn: '1h'});
    // console.log('payload', payload);


    return access_token



};

 const  generalRefreshToken = async (payload) => {
    console.log('payload', payload);
    const refresh_token = jwt.sign({payload}, process.env.REFRESH_TOKEN, {expiresIn: '365d'});


    return refresh_token;



};

module.exports = {generalAccessToken, generalRefreshToken};


