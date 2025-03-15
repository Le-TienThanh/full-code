// const jwt = require('jsonwebtoken');
// const express = require("express");

import jwt from 'jsonwebtoken';

export const  generalAccessToken = async (payload) => {
    console.log('payload', payload);
    const access_token = jwt.sign({payload}, 'access_token', {expiresIn: '1h'});


    return access_token;



};

// export const  generalRefreshToken = async (payload) => {
//     console.log('payload', payload);
//     const access_token = jwt.sign({payload}, 'refresh_token', {expiresIn: '365d'});


//     return access_token;



// };

// module.exports = {generalAccessToken, generalRefreshToken};


// module.exports = {generalAccessToken};