const jwt = require('jsonwebtoken');
// const express = require("express");

// import jwt from 'jsonwebtoken';

const  generalAccessToken = async (payload) => {
    console.log('payload', payload);
    const access_token = jwt.sign({payload}, 'access_token', {expiresIn: '1h'});
    // console.log('payload', payload);


    return access_token



};

 const  generalRefreshToken = async (payload) => {
    console.log('payload', payload);
    const access_token = jwt.sign({payload}, 'refresh_token', {expiresIn: '365d'});


    return access_token;



};

module.exports = {generalAccessToken, generalRefreshToken};


// const generalAccessToken = async (payload) => {
//     console.log('Generating token with payload:', payload);
//     try {
//         const access_token = jwt.sign(payload, 'access_token', { expiresIn: '1h' });
//         console.log('Generated access_token:', access_token);
//         return access_token;
//     } catch (error) {
//         console.error('Error generating access token:', error);
//         throw error;
//     }
// };

// module.exports = {generalAccessToken};
// export default generalAccessToken;