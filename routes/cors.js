const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://mj-course.herokuapp.com/','http://localhost:3001'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: true };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);